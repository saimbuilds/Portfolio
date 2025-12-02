// Theme handling
(function () {
  var body = document.body;
  var toggle = document.getElementById("theme-toggle");
  var savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
  } else {
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var isDark = body.classList.contains("dark-mode");
      if (isDark) {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        localStorage.setItem("theme", "light");
      } else {
        body.classList.add("dark-mode");
        body.classList.remove("light-mode");
        localStorage.setItem("theme", "dark");
      }
    });
  }
})();

// Contact form validation (assignment logic)
(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var nameInput = document.getElementById("name");
  var emailInput = document.getElementById("email");
  var messageInput = document.getElementById("message");

  function markError(fieldWrapper, hasError) {
    if (!fieldWrapper) return;
    if (hasError) {
      fieldWrapper.classList.add("field-error");
    } else {
      fieldWrapper.classList.remove("field-error");
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var isValid = true;

    var nameField = nameInput && nameInput.closest(".field");
    var emailField = emailInput && emailInput.closest(".field");
    var messageField = messageInput && messageInput.closest(".field");

    if (!nameInput || nameInput.value.trim() === "") {
      isValid = false;
      markError(nameField, true);
    } else {
      markError(nameField, false);
    }

    if (!emailInput || emailInput.value.indexOf("@") === -1) {
      isValid = false;
      markError(emailField, true);
    } else {
      markError(emailField, false);
    }

    if (!messageInput || messageInput.value.trim().length <= 10) {
      isValid = false;
      markError(messageField, true);
    } else {
      markError(messageField, false);
    }

    if (isValid) {
      alert("Thanks! Your response has been recorded.");
      form.reset();
      markError(nameField, false);
      markError(emailField, false);
      markError(messageField, false);
    }
  });
})();

// Mouse follower circle
(function () {
  var dot = document.querySelector(".cursor-dot");
  if (!dot) return;

  var currentX = window.innerWidth / 2;
  var currentY = window.innerHeight / 2;
  var targetX = currentX;
  var targetY = currentY;
  var rafId = null;

  function render() {
    currentX += (targetX - currentX) * 0.2;
    currentY += (targetY - currentY) * 0.2;
    dot.style.left = currentX + "px";
    dot.style.top = currentY + "px";
    rafId = requestAnimationFrame(render);
  }

  window.addEventListener("mousemove", function (event) {
    targetX = event.clientX;
    targetY = event.clientY;
    if (!rafId) {
      render();
    }
  });
})();

// Profile photo hover follower for LinkedIn (replaces cursor, constrained to image)
(function () {
  var body = document.body;
  if (!body || body.getAttribute("data-page") !== "profile") return;

  var wrapper = document.getElementById("profile-photo-area");
  var photoImg = document.querySelector(".profile-photo");
  var follower = document.getElementById("profile-photo-follow");
  var cursorDot = document.querySelector(".cursor-dot");
  if (!wrapper || !photoImg || !follower) return;

  var rect;
  var currentX = 0;
  var currentY = 0;
  var targetX = 0;
  var targetY = 0;
  var rafId = null;

  function render() {
    currentX += (targetX - currentX) * 0.25;
    currentY += (targetY - currentY) * 0.25;
    follower.style.left = currentX + "px";
    follower.style.top = currentY + "px";
    rafId = requestAnimationFrame(render);
  }

  photoImg.addEventListener("mouseenter", function (event) {
    wrapper.classList.add("hovering-photo");
    if (cursorDot) cursorDot.style.opacity = "0";
    
    rect = wrapper.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    
    currentX = x;
    currentY = y;
    targetX = x;
    targetY = y;
    
    follower.style.left = x + "px";
    follower.style.top = y + "px";
    
    if (!rafId) {
      render();
    }
  });

  photoImg.addEventListener("mouseleave", function () {
    wrapper.classList.remove("hovering-photo");
    if (cursorDot) cursorDot.style.opacity = "1";
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  });

  photoImg.addEventListener("mousemove", function (event) {
    if (!rect) rect = wrapper.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    
    // Constrain to wrapper boundaries
    var iconSize = 48;
    var maxX = rect.width - iconSize / 2;
    var maxY = rect.height - iconSize / 2;
    var minX = iconSize / 2;
    var minY = iconSize / 2;
    
    targetX = Math.max(minX, Math.min(maxX, x));
    targetY = Math.max(minY, Math.min(maxY, y));
    
    if (!rafId) {
      render();
    }
  });
})();

// Hamburger menu toggle
(function () {
  var hamburger = document.getElementById("hamburger");
  var nav = document.querySelector(".nav");
  if (!hamburger || !nav) return;

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
  });

  // Close menu when clicking a nav link
  var navLinks = nav.querySelectorAll(".nav-link");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      nav.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !hamburger.contains(event.target) &&
      !nav.contains(event.target) &&
      nav.classList.contains("active")
    ) {
      hamburger.classList.remove("active");
      nav.classList.remove("active");
    }
  });
})();


