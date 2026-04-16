const state = {
    xp: 2840,
    streak: 12,
    tasksCompleted: 0,
    completedIds: new Set([0, 2, 4]),
    currentTask: null,
    lbMode: 'class'
};

const TASKS_ALL = [
    { id: 0, title: 'Solve 5 Math Problems', cat: 'Academic', diff: 'easy', xp: 30, desc: 'Complete 5 algebra problems from your textbook Chapter 4. Focus on quadratic equations.' },
    { id: 1, title: 'Read 20 Pages', cat: 'Reading', diff: 'easy', xp: 25, desc: 'Read any educational book or novel for 20 pages. Summarize 3 key points you learned.' },
    { id: 2, title: '30-min Workout', cat: 'Fitness', diff: 'medium', xp: 50, desc: 'Complete a 30-minute workout. This can be running, yoga, or any physical activity.' },
    { id: 3, title: 'Code a Simple Program', cat: 'Coding', diff: 'medium', xp: 60, desc: 'Write a program in any language that prints a multiplication table from 1 to 10.' },
    { id: 4, title: 'Science Chapter Summary', cat: 'Academic', diff: 'easy', xp: 35, desc: 'Read and summarize Chapter 7 of your Science textbook in 5-6 bullet points.' },
    { id: 5, title: 'Give a 2-Minute Speech', cat: 'Speaking', diff: 'hard', xp: 80, desc: 'Record yourself giving a 2-minute speech on any current topic. Review your fluency.' },
    { id: 6, title: 'Solve Logic Puzzle', cat: 'Coding', diff: 'hard', xp: 90, desc: 'Solve the Tower of Hanoi problem for n=3 disks on paper, then implement it in code.' },
    { id: 7, title: 'English Essay Draft', cat: 'Academic', diff: 'medium', xp: 55, desc: 'Write a 300-word essay on "The impact of technology on education" with introduction, body, conclusion.' },
    { id: 8, title: 'Learn 10 New Words', cat: 'Reading', diff: 'easy', xp: 20, desc: 'Learn 10 new vocabulary words from any source. Write each word, its meaning, and use it in a sentence.' },
    { id: 9, title: 'Meditation Session', cat: 'Fitness', diff: 'easy', xp: 20, desc: 'Complete a 10-minute guided meditation or mindfulness session. Log how you felt before and after.' },
    { id: 10, title: 'Debug a Program', cat: 'Coding', diff: 'hard', xp: 85, desc: 'Find and fix 3 bugs in a given code snippet involving arrays and loops in Java or Python.' },
    { id: 11, title: 'History Timeline', cat: 'Academic', diff: 'medium', xp: 45, desc: 'Create a visual timeline of 10 key events from Indian Independence Movement (1857-1947).' },
];

const BADGES = [
    { icon: '🔥', name: 'Streak Master', earned: true },
    { icon: '⚡', name: 'Quick Learner', earned: true },
    { icon: '🎯', name: 'Sharp Shooter', earned: true },
    { icon: '💪', name: 'Fitness Freak', earned: true },
    { icon: '📚', name: 'Book Worm', earned: true },
    { icon: '🏆', name: 'Top 5', earned: true },
    { icon: '🤖', name: 'Monster', earned: false },
    { icon: '🌟', name: 'All Rounder', earned: false },
    { icon: '👑', name: 'Champion', earned: false },
];

const LB_DATA = {
    class: [
        { rank: 1, name: 'Ayush Kumar Dubey', xp: 3420, streak: 18, avatar: 'AD', color: '#7c3aed', me: true },
        { rank: 2, name: 'Divyanshu Mishra', xp: 3180, streak: 15, avatar: 'DM', color: '#0e7490' },
        { rank: 3, name: 'Kussagra gupta', xp: 3050, streak: 22, avatar: 'KG', color: '#be185d' },
        { rank: 4, name: 'Akshat gupta', xp: 2840, streak: 12, avatar: 'AG', color: '#b45309' },
        { rank: 5, name: 'Khushi', xp: 2710, streak: 9, avatar: 'K', color: '#065f46' },
        { rank: 6, name: 'Nandini Singh', xp: 2540, streak: 7, avatar: 'NS', color: '#4338ca' },
        { rank: 7, name: 'Sneha Patel', xp: 2390, streak: 5, avatar: 'SP', color: '#7c3aed' },
        { rank: 8, name: 'Rohan Das', xp: 2100, streak: 4, avatar: 'RD', color: '#0e7490' },
    ],
    school: [
        { rank: 1, name: 'Neha Mishra', xp: 4800, streak: 30, avatar: 'NM', color: '#7c3aed' },
        { rank: 2, name: 'Aryan Kumar', xp: 4200, streak: 25, avatar: 'AK', color: '#0e7490' },
        { rank: 3, name: 'Priya Verma', xp: 3420, streak: 18, avatar: 'PV', color: '#be185d' },
        { rank: 4, name: 'Deepak Rao', xp: 3200, streak: 14, avatar: 'DR', color: '#065f46' },
        { rank: 5, name: 'Arjun Sharma', xp: 2840, streak: 12, avatar: 'A', color: '#b45309', me: true },
        { rank: 6, name: 'Sunita Joshi', xp: 2700, streak: 10, avatar: 'SJ', color: '#4338ca' },
    ],
    state: [
        { rank: 1, name: 'Shreya Sharma', xp: 9200, streak: 60, avatar: 'SS', color: '#7c3aed' },
        { rank: 2, name: 'Karan Mehta', xp: 8800, streak: 55, avatar: 'KM', color: '#0e7490' },
        { rank: 3, name: 'Isha Patel', xp: 7600, streak: 48, avatar: 'IP', color: '#be185d' },
        { rank: 4, name: 'Vivek Gupta', xp: 6900, streak: 40, avatar: 'VG', color: '#065f46' },
        { rank: 5, name: 'Tanvi Roy', xp: 6200, streak: 35, avatar: 'TR', color: '#4338ca' },
        { rank: 12, name: 'Arjun Sharma', xp: 2840, streak: 12, avatar: 'A', color: '#b45309', me: true },
    ]
};

const RECENT = [
    { task: 'Solve 5 Math Problems', xp: 30, time: '2h ago' },
    { task: '30-min Workout', xp: 50, time: 'Yesterday' },
    { task: 'Science Chapter Summary', xp: 35, time: 'Yesterday' },
    { task: 'Read 20 Pages', xp: 25, time: '2 days ago' },
    { task: 'Learn 10 New Words', xp: 20, time: '3 days ago' },
];

const CAT_DATA = [
    { cat: 'Academic', done: 18, color: '#60a5fa' },
    { cat: 'Coding', done: 12, color: '#a78bfa' },
    { cat: 'Fitness', done: 9, color: '#4ade80' },
    { cat: 'Reading', done: 8, color: '#fbbf24' },
];

function showPage(id, el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('page-' + id).classList.add('active');
    if (el) el.classList.add('active');
}

function showLB(mode, el) {
    state.lbMode = mode;
    document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
    if (el) el.classList.add('active');
    renderLB();
}

function openModal(taskId) {
    const t = TASKS_ALL.find(x => x.id === taskId);
    if (!t) return;
    state.currentTask = t;
    document.getElementById('modal-title').textContent = t.title;
    document.getElementById('modal-desc').textContent = t.desc;
    document.getElementById('modal-xp').textContent = '+' + t.xp + ' XP';
    document.getElementById('task-modal').classList.add('open');
}

function closeModal() {
    document.getElementById('task-modal').classList.remove('open');
    state.currentTask = null;
}

function completeTask() {
    if (!state.currentTask) return;
    const t = state.currentTask;
    if (state.completedIds.has(t.id)) { closeModal(); return; }
    state.completedIds.add(t.id);
    state.xp += t.xp;
    state.tasksCompleted++;
    closeModal();
    showToast('🎉 +' + t.xp + ' XP earned! <strong>' + t.title + '</strong> complete!');
    updateXP();
    renderAll();
}

function updateXP() {
    document.getElementById('nav-xp').textContent = state.xp.toLocaleString() + ' XP';
    document.getElementById('total-xp').textContent = state.xp.toLocaleString();
    document.getElementById('tasks-done-count').textContent = 47 + state.tasksCompleted;
    const pct = Math.min(100, Math.round(((state.xp - 2400) / 800) * 100));
    document.getElementById('xp-bar').style.width = pct + '%';
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.innerHTML = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

function renderStreakDays() {
    const el = document.getElementById('streak-days');
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    el.innerHTML = days.map((d, i) => `<div class="s-day ${i < 5 ? 'done' : ''}${i === 4 ? ' today' : ''}">${d}</div>`).join('');
}

function renderTodayTasks() {
    const el = document.getElementById('today-tasks');
    const today = TASKS_ALL.slice(0, 5);
    el.innerHTML = today.map(t => {
        const done = state.completedIds.has(t.id);
        return `<div class="task-item${done ? ' done' : ''}" onclick="${done ? '' : ('openModal(' + t.id + ')')}">
      <div class="task-check">${done ? '✓' : ''}</div>
      <span class="task-name">${t.title}</span>
      <span class="task-diff diff-${t.diff === 'easy' ? 'easy' : t.diff === 'medium' ? 'med' : 'hard'}">${t.diff}</span>
      <span class="task-xp">+${t.xp}</span>
    </div>`;
    }).join('');
}

function renderBadges(elId, max) {
    const el = document.getElementById(elId);
    if (!el) return;
    const b = max ? BADGES.slice(0, max) : BADGES;
    el.innerHTML = b.map(x => `<div class="badge-item${x.earned ? ' earned' : ''}">
    <span class="badge-icon">${x.icon}</span>
    <span class="badge-name">${x.name}</span>
  </div>`).join('');
}

function renderMiniLB() {
    const el = document.getElementById('mini-lb');
    if (!el) return;
    const data = LB_DATA.class.slice(0, 5);
    el.innerHTML = data.map(p => `<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border)">
    <span style="font-family:var(--mono);font-size:12px;color:var(--muted);width:20px">${p.rank}</span>
    <div class="avatar" style="width:28px;height:28px;border-radius:6px;font-size:11px;background:${p.color}22;color:${p.color}">${p.avatar}</div>
    <span style="flex:1;font-size:13px${p.me ? ';color:var(--accent);font-weight:700' : ''}">${p.name}${p.me ? ' (you)' : ''}</span>
    <span style="font-family:var(--mono);font-size:12px;color:var(--muted)">${p.xp.toLocaleString()}</span>
  </div>`).join('');
}

function renderLB() {
    const data = LB_DATA[state.lbMode];
    const t = document.getElementById('lb-table');
    if (!t) return;
    const rankIcon = r => r === 1 ? '🥇' : r === 2 ? '🥈' : r === 3 ? '🥉' : r;
    t.innerHTML = `<thead><tr>
    <th>Rank</th><th>Student</th><th>XP</th><th>Streak</th><th>Progress</th>
  </tr></thead><tbody>`+
        data.map(p => `<tr class="${p.me ? 'me-row' : ''}">
    <td class="rank-num"><span class="rank-${p.rank <= 3 ? p.rank : ''}">${rankIcon(p.rank)}</span></td>
    <td><div class="player-cell">
      <div class="avatar" style="background:${p.color}22;color:${p.color}">${p.avatar}</div>
      <span>${p.name}${p.me ? ' <span style="font-size:11px;color:var(--accent);font-family:var(--mono)">(you)</span>' : ''}</span>
    </div></td>
    <td style="font-family:var(--mono);font-weight:600;color:var(--accent)">${p.xp.toLocaleString()}</td>
    <td style="font-family:var(--mono)">🔥 ${p.streak}</td>
    <td><div class="xp-bar-sm"><div class="xp-bar-sm-fill" style="width:${Math.min(100, Math.round(p.xp / 50))}%"></div></div></td>
  </tr>`).join('') + '</tbody>';
}

function renderAllTasks(filter) {
    const el = document.getElementById('all-tasks-grid');
    if (!el) return;
    const filtered = filter && filter !== 'All' ? TASKS_ALL.filter(t => t.cat === filter || t.diff === filter.toLowerCase()) : TASKS_ALL;
    el.innerHTML = filtered.map(t => {
        const done = state.completedIds.has(t.id);
        return `<div class="task-card ${t.diff}${done ? ' completed' : ''}">
      <div class="tc-top">
        <div class="tc-category">${t.cat}</div>
        <span class="task-diff diff-${t.diff === 'easy' ? 'easy' : t.diff === 'medium' ? 'med' : 'hard'}">${t.diff}</span>
      </div>
      <div class="tc-title">${t.title}</div>
      <div class="tc-desc">${t.desc}</div>
      <div class="tc-footer">
        <span class="tc-xp">+${t.xp} XP</span>
        ${done ? '<span class="done-badge">✓ Completed</span>' : '<button class="start-btn" onclick="openModal(' + t.id + ')">Start Task</button>'}
      </div>
    </div>`;
    }).join('');
}

function renderFilters() {
    const el = document.getElementById('task-filters');
    if (!el) return;
    const opts = ['All', 'Academic', 'Coding', 'Fitness', 'Reading', 'Speaking', 'Easy', 'Medium', 'Hard'];
    el.innerHTML = opts.map((o, i) => `<button class="filter-btn${i === 0 ? ' active' : ''}" onclick="filterTasks('${o}',this)">${o}</button>`).join('');
}

function filterTasks(f, el) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    renderAllTasks(f);
}

function renderRecent() {
    const el = document.getElementById('recent-activity');
    if (!el) return;
    el.innerHTML = RECENT.map(r => `<div class="activity-row">
    <span>${r.task}</span>
    <div style="display:flex;align-items:center;gap:8px">
      <span style="font-family:var(--mono);font-size:12px;color:var(--accent)">+${r.xp}</span>
      <span class="activity-time">${r.time}</span>
    </div>
  </div>`).join('');
}

function renderCatBreakdown() {
    const el = document.getElementById('category-breakdown');
    if (!el) return;
    const max = Math.max(...CAT_DATA.map(c => c.done));
    el.innerHTML = CAT_DATA.map(c => `<div style="margin-bottom:12px">
    <div style="display:flex;justify-content:space-between;margin-bottom:4px">
      <span style="font-size:13px">${c.cat}</span>
      <span style="font-family:var(--mono);font-size:12px;color:var(--muted)">${c.done} tasks</span>
    </div>
    <div class="bar-bg"><div style="height:100%;width:${Math.round(c.done / max * 100)}%;background:${c.color};border-radius:4px;transition:width 0.8s ease"></div></div>
  </div>`).join('');
}

function renderAll() {
    renderStreakDays();
    renderTodayTasks();
    renderBadges('badges-grid', 9);
    renderBadges('profile-badges-grid');
    renderMiniLB();
    renderLB();
    renderFilters();
    renderAllTasks();
    renderRecent();
    renderCatBreakdown();
    updateXP();
    const pXp = document.getElementById('p-xp');
    if (pXp) pXp.textContent = state.xp.toLocaleString();
    const pTasks = document.getElementById('p-tasks');
    if (pTasks) pTasks.textContent = 47 + state.tasksCompleted;
}

const modalOverlay = document.getElementById('task-modal');
if (modalOverlay) {
    modalOverlay.addEventListener('click', function (e) { if (e.target === this) closeModal(); });
}

document.addEventListener("DOMContentLoaded", () => {
    renderAll();
    setTimeout(() => {
        const xpBar = document.getElementById('xp-bar');
        if (xpBar) xpBar.style.width = '55%';
    }, 100);
});
