(() => {
  const tabs = [...document.querySelectorAll('[role="tab"][data-role]')];
  const panels = [...document.querySelectorAll('[role="tabpanel"]')];
  function activate(role, focus = false) {
    const current = tabs.find(tab => tab.dataset.role === role);
    if (!current) return;
    tabs.forEach(tab => {
      const selected = tab === current;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.id !== `panel-${role}`; });
    if (focus) current.focus();
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activate(tab.dataset.role));
    tab.addEventListener('keydown', e => {
      let next;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { e.preventDefault(); activate(tabs[next].dataset.role, true); }
    });
  });
  const printing = document.getElementById('print-button');
  if (printing) printing.addEventListener('click', () => window.print());
})();
