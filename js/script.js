(function () {
  "use strict";

  /* Theme toggle (persisted in localStorage) */
  var root = document.documentElement;
  var toggleBtn = document.getElementById("themeToggle");
  var savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    root.setAttribute("data-bs-theme", savedTheme);
  }

  function updateToggleLabel() {
    if (!toggleBtn) return;
    var isDark = root.getAttribute("data-bs-theme") === "dark";
    toggleBtn.textContent = isDark ? "☀️ Light" : "🌙 Dark";
    toggleBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var current = root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-bs-theme", current);
      localStorage.setItem("theme", current);
      updateToggleLabel();
    });
    updateToggleLabel();
  }

  /* Portfolio filter */
  var filterButtons = document.querySelectorAll("[data-filter]");
  var projectCards = document.querySelectorAll("[data-category]");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      var filter = button.getAttribute("data-filter");

      projectCards.forEach(function (card) {
        var match = filter === "all" || card.getAttribute("data-category") === filter;
        card.classList.toggle("d-none", !match);
      });
    });
  });

  /* Contact form validation (Bootstrap pattern) */
  var forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity()) {
          form.classList.add("d-none");
          var successAlert = document.getElementById("formSuccess");
          if (successAlert) {
            successAlert.classList.remove("d-none");
          }
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
