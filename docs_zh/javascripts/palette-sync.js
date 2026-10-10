/* Keep the light/dark palette choice in sync between the EN (/) and
   ZH (/zh/) sites. The theme stores the choice in localStorage scoped
   by site base ("/.__palette" vs "/zh/.__palette"), so without this,
   switching language silently reverts to the system default — which
   looks like the language button also toggling day/night mode. */
(function () {
  var SCOPES = ["/", "/zh/"];
  var scope = location.pathname.indexOf("/zh/") === 0 ? "/zh/" : "/";
  function key(s) { return s + ".__palette"; }

  /* On load: if this scope has no stored palette but the other does, adopt it. */
  try {
    if (!localStorage.getItem(key(scope))) {
      for (var i = 0; i < SCOPES.length; i++) {
        if (SCOPES[i] === scope) continue;
        var raw = localStorage.getItem(key(SCOPES[i]));
        if (!raw) continue;
        localStorage.setItem(key(scope), raw);
        var palette = JSON.parse(raw);
        if (palette && palette.color) {
          /* resolve "System" to a concrete scheme, like the theme does */
          if (palette.color.media === "(prefers-color-scheme)") {
            var light = matchMedia("(prefers-color-scheme: light)").matches;
            var input = document.querySelector(light
              ? "[data-md-color-media='(prefers-color-scheme: light)']"
              : "[data-md-color-media='(prefers-color-scheme: dark)']");
            if (input) {
              palette.color.media = input.getAttribute("data-md-color-media");
              palette.color.scheme = input.getAttribute("data-md-color-scheme");
              palette.color.primary = input.getAttribute("data-md-color-primary");
              palette.color.accent = input.getAttribute("data-md-color-accent");
            }
          }
          for (var k in palette.color)
            document.body.setAttribute("data-md-color-" + k, palette.color[k]);
        }
        if (palette && typeof palette.index === "number") {
          var inputs = document.getElementsByName("__palette");
          if (inputs[palette.index]) inputs[palette.index].checked = true;
        }
        break;
      }
    }
  } catch (e) { /* localStorage unavailable */ }

  /* On change: mirror this scope's stored palette to all scopes. */
  document.addEventListener("change", function (ev) {
    if (!ev.target || ev.target.name !== "__palette") return;
    setTimeout(function () {
      try {
        var raw = localStorage.getItem(key(scope));
        if (raw) for (var i = 0; i < SCOPES.length; i++)
          localStorage.setItem(key(SCOPES[i]), raw);
      } catch (e) {}
    }, 25);
  });
})();
