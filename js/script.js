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

  /* Contact form validation + submission (Bootstrap validation pattern,
     submitted via fetch to a Formspree endpoint set in the form's
     action attribute) */
  var forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach(function (form) {
    var successAlert = document.getElementById("formSuccess");
    var errorAlert = document.getElementById("formError");
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add("was-validated");

        if (successAlert) successAlert.classList.add("d-none");
        if (errorAlert) errorAlert.classList.add("d-none");

        if (!form.checkValidity()) {
          return;
        }

        var originalBtnText = submitBtn ? submitBtn.textContent : "";
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Sending...";
        }

        fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        })
          .then(function (response) {
            if (response.ok) {
              form.reset();
              form.classList.remove("was-validated");
              if (successAlert) successAlert.classList.remove("d-none");
            } else if (errorAlert) {
              errorAlert.classList.remove("d-none");
            }
          })
          .catch(function () {
            if (errorAlert) errorAlert.classList.remove("d-none");
          })
          .finally(function () {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = originalBtnText;
            }
          });
      },
      false
    );
  });
})();
