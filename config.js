// Points the static frontend at the backend API.
// Auto-detects local dev so this file no longer needs manual flipping
// before each commit.
(function () {
  var h = window.location.hostname;
  var isLocal = h === "localhost" || h === "127.0.0.1" || h === "";
  window.BRAINTREE_API_BASE = isLocal
    ? "http://localhost:3000"
    : "https://braintreehr-backend.vercel.app";
})();