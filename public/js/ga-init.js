(function() {
  const script = document.getElementById("ga-init");
  if (script) {
    const gaId = script.getAttribute("data-id");
    if (gaId) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", gaId);
    }
  }
})();
