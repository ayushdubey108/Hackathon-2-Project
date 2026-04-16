from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
# Enable CORS so our frontend index.html can talk to this local API
CORS(app)

DB_PATH = 'database.db'

# Predefined standard tasks for the platform
DEFAULT_TASKS = [
    (0, 'Solve 5 Math Problems', 'Academic', 'easy', 30, 'Complete 5 algebra problems from your textbook Chapter 4. Focus on quadratic equations.'),
    (1, 'Read 20 Pages', 'Reading', 'easy', 25, 'Read any educational book or novel for 20 pages. Summarize 3 key points you learned.'),
    (2, '30-min Workout', 'Fitness', 'medium', 50, 'Complete a 30-minute workout. This can be running, yoga, or any physical activity.'),
    (3, 'Code a Simple Program', 'Coding', 'medium', 60, 'Write a program in any language that prints a multiplication table from 1 to 10.'),
    (4, 'Science Chapter Summary', 'Academic', 'easy', 35, 'Read and summarize Chapter 7 of your Science textbook in 5-6 bullet points.'),
    (5, 'Give a 2-Minute Speech', 'Speaking', 'hard', 80, 'Record yourself giving a 2-minute speech on any current topic. Review your fluency.'),
    (6, 'Solve Logic Puzzle', 'Coding', 'hard', 90, 'Solve the Tower of Hanoi problem for n=3 disks on paper, then implement it in code.'),
    (7, 'English Essay Draft', 'Academic', 'medium', 55, 'Write a 300-word essay on "The impact of technology on education" with introduction, body, conclusion.'),
    (8, 'Learn 10 New Words', 'Reading', 'easy', 20, 'Learn 10 new vocabulary words from any source. Write each word, its meaning, and use it in a sentence.'),
    (9, 'Meditation Session', 'Fitness', 'easy', 20, 'Complete a 10-minute guided meditation or mindfulness session. Log how you felt before and after.'),
    (10, 'Debug a Program', 'Coding', 'hard', 85, 'Find and fix 3 bugs in a given code snippet involving arrays and loops in Java or Python.'),
    (11, 'History Timeline', 'Academic', 'medium', 45, 'Create a visual timeline of 10 key events from Indian Independence Movement (1857-1947).')
]

def init_db():
    """Initializes the database, creates tables if they don't exist, and seeds defaults."""
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        
        # 1. Users table (storing our MVP user Ayush)
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                xp INTEGER DEFAULT 0,
                streak INTEGER DEFAULT 0,
                tasks_completed INTEGER DEFAULT 0
            )
        ''')
        
        # 2. Tasks Catalog table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY,
                title TEXT,
                category TEXT,
                difficulty TEXT,
                xp INTEGER,
                description TEXT
            )
        ''')
        
        # 3. Completed Tasks table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS completed_tasks (
                user_id INTEGER,
                task_id INTEGER,
                completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id, task_id),
                FOREIGN KEY (user_id) REFERENCES users (id),
                FOREIGN KEY (task_id) REFERENCES tasks (id)
            )
        ''')

        # Check if we need to seed data
        cursor.execute('SELECT COUNT(*) FROM users')
        if cursor.fetchone()[0] == 0:
            # Insert Ayush with a baseline XP mirroring the previous state
            cursor.execute("INSERT INTO users (id, name, xp, streak, tasks_completed) VALUES (1, 'Ayush Kumar Dubey', 2840, 12, 47)")
            
            # Seed the default tasks
            cursor.executemany("INSERT INTO tasks (id, title, category, difficulty, xp, description) VALUES (?, ?, ?, ?, ?, ?)", DEFAULT_TASKS)
            
            # Seed some already completed tasks so UI isn't completely empty
            cursor.execute("INSERT INTO completed_tasks (user_id, task_id) VALUES (1, 0)")
            cursor.execute("INSERT INTO completed_tasks (user_id, task_id) VALUES (1, 2)")
            cursor.execute("INSERT INTO completed_tasks (user_id, task_id) VALUES (1, 4)")
            
        conn.commit()


# --- REST API ENDPOINTS ---

@app.route('/api/profile', methods=['GET'])
def get_profile():
    user_id = 1 # Hardcoded to our solo MVP user Ayush
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        user = cursor.fetchone()
        
        if not user:
            return jsonify({"error": "User not found"}), 404
            
        return jsonify({
            "id": user["id"],
            "name": user["name"],
            "xp": user["xp"],
            "streak": user["streak"],
            "tasks_completed": user["tasks_completed"]
        })


@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    user_id = 1
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        # Get all tasks
        cursor.execute("SELECT * FROM tasks")
        all_tasks = [dict(row) for row in cursor.fetchall()]
        
        # Get purely the IDs of tasks completed by this user
        cursor.execute("SELECT task_id FROM completed_tasks WHERE user_id = ?", (user_id,))
        completed_ids = [row["task_id"] for row in cursor.fetchall()]
        
        return jsonify({
            "tasks": all_tasks,
            "completed_ids": completed_ids
        })


@app.route('/api/tasks/complete', methods=['POST'])
def complete_task():
    user_id = 1
    data = request.json
    task_id = data.get("task_id")
    
    if task_id is None:
        return jsonify({"error": "task_id is required"}), 400
        
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        
        # Check if already completed to prevent double XP
        cursor.execute("SELECT * FROM completed_tasks WHERE user_id = ? AND task_id = ?", (user_id, task_id))
        if cursor.fetchone() is not None:
            return jsonify({"error": "Task already completed"}), 400
            
        # Get the task XP value
        cursor.execute("SELECT xp FROM tasks WHERE id = ?", (task_id,))
        task = cursor.fetchone()
        if not task:
            return jsonify({"error": "Task does not exist"}), 404
            
        xp_earned = task[0]
        
        # Record completion
        cursor.execute("INSERT INTO completed_tasks (user_id, task_id) VALUES (?, ?)", (user_id, task_id))
        
        # Update user stats
        cursor.execute("UPDATE users SET xp = xp + ?, tasks_completed = tasks_completed + 1 WHERE id = ?", (xp_earned, user_id))
        conn.commit()
        
        # Return updated user state
        cursor.execute("SELECT xp, tasks_completed FROM users WHERE id = ?", (user_id,))
        updated_user = cursor.fetchone()
        
        return jsonify({
            "success": True,
            "message": "Task completed successfully",
            "xp_earned": xp_earned,
            "new_total_xp": updated_user[0],
            "new_tasks_completed": updated_user[1]
        })

if __name__ == '__main__':
    ini_path = os.path.join(os.path.dirname(__file__), DB_PATH)
    init_db()
    print("Database initialized successfully.")
    app.run(port=5000, debug=True)
