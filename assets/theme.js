/* OLTE App — motyw jasny/ciemny (poz. 11 DESIGN.md §8).
   Ładowany w <head>, więc atrybut data-theme jest ustawiony przed pierwszym
   malowaniem — bez przebłysku jasnego tła. Ekrany otwarte w iframe czytają
   ten sam localStorage, a przełącznik w launcherze rozsyła zmianę przez
   postMessage, żeby wszystkie kadry przełączyły się równocześnie. */
(function () {
  var KEY = 'olte-theme';
  var root = document.documentElement;

  function apply(theme) {
    root.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
  }

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  apply(stored() || 'light');

  function broadcast(theme) {
    var frames = document.querySelectorAll('iframe');
    for (var i = 0; i < frames.length; i++) {
      try { frames[i].contentWindow.postMessage({ olteTheme: theme }, '*'); } catch (e) { /* pusty kadr */ }
    }
  }

  window.OLTETheme = {
    get: function () { return root.getAttribute('data-theme'); },
    set: function (theme) {
      apply(theme);
      try { localStorage.setItem(KEY, theme); } catch (e) { /* tryb prywatny */ }
      broadcast(theme);
      document.dispatchEvent(new CustomEvent('olte:theme', { detail: theme }));
    },
    toggle: function () {
      var next = this.get() === 'dark' ? 'light' : 'dark';
      this.set(next);
      return next;
    },
    /* Podłącza przycisk: aktualizuje aria-pressed i etykietę. */
    bind: function (el) {
      if (!el) return;
      var sync = function () {
        var dark = window.OLTETheme.get() === 'dark';
        el.setAttribute('aria-pressed', String(dark));
        var label = el.querySelector('[data-theme-label]');
        if (label) label.textContent = dark ? 'Tryb ciemny' : 'Tryb jasny';
        var icon = el.querySelector('use');
        if (icon) icon.setAttribute('href', dark ? '#i-moon' : '#i-sun-dim');
      };
      el.addEventListener('click', function () { window.OLTETheme.toggle(); sync(); });
      document.addEventListener('olte:theme', sync);
      sync();
    }
  };

  window.addEventListener('message', function (e) {
    if (e.data && typeof e.data.olteTheme === 'string') apply(e.data.olteTheme);
  });
})();
