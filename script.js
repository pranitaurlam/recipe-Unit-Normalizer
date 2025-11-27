document.addEventListener("DOMContentLoaded", () => {
  // Navbar Scroll Effect
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select elements to animate
  const animatedElements = document.querySelectorAll(
    ".feature-card, .section-title"
  );
  animatedElements.forEach((el) => {
    // Set initial state for elements that weren't already handled by CSS animation classes
    if (!el.classList.contains("fade-in-up")) {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "all 0.6s ease-out";
    }
    observer.observe(el);
  });

  // Login Form Validation Visuals (Simple)
  const inputs = document.querySelectorAll(".form-input");
  inputs.forEach((input) => {
    input.addEventListener("blur", () => {
      if (input.value.length > 0) {
        if (input.checkValidity()) {
          input.style.borderColor = "var(--success)"; // Green-ish if we had that var, or just let it be
        } else {
          input.style.borderColor = "#f56565"; // Red
        }
      } else {
        input.style.borderColor = "#e2e8f0"; // Reset
      }
    });
  });

  // Login/Signup Toggle Logic
  const toggleLink = document.getElementById("toggle-auth");
  const formTitle = document.getElementById("form-title");
  const submitBtn = document.getElementById("submit-btn");
  const nameGroup = document.getElementById("name-group");
  const forgotLink = document.getElementById("forgot-link");

  let isSignup = false;

  if (toggleLink) {
    toggleLink.addEventListener("click", (e) => {
      e.preventDefault();
      isSignup = !isSignup;

      if (isSignup) {
        formTitle.textContent = "Create Account";
        submitBtn.textContent = "Sign Up";
        toggleLink.textContent = "Sign In";
        toggleLink.parentElement.innerHTML =
          'Already have an account? <a href="#" id="toggle-auth" style="color: var(--primary); font-weight: 600;">Sign in</a>';
        nameGroup.style.display = "block";
        if (forgotLink) forgotLink.style.display = "none";

        // Re-attach listener since we replaced innerHTML
        document
          .getElementById("toggle-auth")
          .addEventListener("click", (e) => {
            window.location.reload();
          });
      } else {
        formTitle.textContent = "Sign in to Antigravity";
        submitBtn.textContent = "Sign In";
        nameGroup.style.display = "none";
        if (forgotLink) forgotLink.style.display = "block";
      }
    });
  }
});
