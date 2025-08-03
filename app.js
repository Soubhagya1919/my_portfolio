// Professional Portfolio JavaScript for Soubhagya Mohapatra
// Java Backend Developer Portfolio - Fixed Version

document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav__link");
  const backToTop = document.getElementById("back-to-top");
  const contactForm = document.getElementById("contact-form");
  const sections = document.querySelectorAll("section[id]");
  const heroCtaButtons = document.querySelectorAll(".hero__cta");

  // Initialize the portfolio
  init();

  function init() {
    setupNavigation();
    setupScrollEffects();
    setupContactForm();
    setupTimelineAnimation();
    setupAnimations();
    updateActiveNavLink();
    console.log("Soubhagya Mohapatra Portfolio initialized successfully!");
  }

  function setupTimelineAnimation() {
    const timeline = document.querySelector(".timeline");
    const items = document.querySelectorAll(".timeline__item");
    if (!timeline || !items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const marker = entry.target.querySelector(".timeline__marker");
          const content = entry.target.querySelector(".timeline__content");

          if (entry.isIntersecting) {
            marker?.classList.add("animate");
            content?.classList.add("animate");
          } else {
            marker?.classList.remove("animate");
            content?.classList.remove("animate");
          }
        });

        // Determine the bottom offset of the last visible marker
        let lastVisibleY = 0;
        items.forEach((item) => {
          const marker = item.querySelector(".timeline__marker.animate");
          if (marker) {
            // marker.getBoundingClientRect().top relative to timeline container
            const rect = marker.getBoundingClientRect();
            const containerRect = timeline.getBoundingClientRect();
            lastVisibleY = Math.max(
              lastVisibleY,
              rect.top - containerRect.top + marker.offsetHeight
            );
          }
        });

        // Compute bottom offset: container height minus lastVisibleY
        const containerHeight = timeline.getBoundingClientRect().height;
        const bottomOffset = containerHeight - lastVisibleY;
        timeline.style.setProperty("--line-bottom", `${bottomOffset}px`);
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    items.forEach((item) => observer.observe(item));
  }

  // Navigation Setup - Fixed
  function setupNavigation() {
    // Mobile Navigation Toggle
    if (navToggle && navMenu) {
      navToggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
      });
    }

    // Navigation link click handlers - Fixed
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Close mobile menu
        closeMobileMenu();

        // Get target section and scroll to it
        const targetId = this.getAttribute("href");
        if (targetId && targetId.startsWith("#")) {
          scrollToSection(targetId);
        }
      });
    });

    // Hero CTA buttons - Fixed
    heroCtaButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const targetId = this.getAttribute("href");
        if (targetId && targetId.startsWith("#")) {
          scrollToSection(targetId);
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      if (
        !nav.contains(e.target) &&
        navMenu &&
        navMenu.classList.contains("active")
      ) {
        closeMobileMenu();
      }
    });
  }

  function toggleMobileMenu() {
    if (navMenu && navToggle) {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");

      // Prevent body scroll when menu is open
      if (navMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
  }

  function closeMobileMenu() {
    if (navMenu && navToggle) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // Fixed scrollToSection function
  function scrollToSection(targetId) {
    try {
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const navHeight = nav ? nav.offsetHeight : 70;
        const offsetTop = targetSection.offsetTop - navHeight - 10;

        window.scrollTo({
          top: Math.max(0, offsetTop),
          behavior: "smooth",
        });

        console.log(`Scrolling to section: ${targetId}`);
      } else {
        console.warn(`Section not found: ${targetId}`);
      }
    } catch (error) {
      console.error("Error scrolling to section:", error);
    }
  }

  // Scroll Effects Setup - Fixed
  function setupScrollEffects() {
    let ticking = false;

    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Back to top button - Fixed
    if (backToTop) {
      backToTop.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        console.log("Back to top clicked");
      });
    }
  }

  function handleScroll() {
    updateActiveNavLink();
    toggleBackToTop();
    updateNavBackground();
  }

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const correspondingNavLink = document.querySelector(
        `.nav__link[href="#${sectionId}"]`
      );

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        // Remove active class from all nav links
        navLinks.forEach((link) => link.classList.remove("active"));
        // Add active class to current section's nav link
        if (correspondingNavLink) {
          correspondingNavLink.classList.add("active");
        }
      }
    });
  }

  // Fixed back to top visibility
  function toggleBackToTop() {
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add("show");
        backToTop.style.opacity = "1";
        backToTop.style.visibility = "visible";
      } else {
        backToTop.classList.remove("show");
        backToTop.style.opacity = "0";
        backToTop.style.visibility = "hidden";
      }
    }
  }

  function updateNavBackground() {
    if (nav) {
      if (window.scrollY > 50) {
        nav.style.backdropFilter = "blur(15px)";
        nav.style.boxShadow = "var(--shadow-sm)";
      } else {
        nav.style.backdropFilter = "blur(10px)";
        nav.style.boxShadow = "none";
      }
    }
  }

  // Contact Form Setup - Fixed
  function setupContactForm() {
    if (contactForm) {
      // Fix form submission
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        e.stopPropagation();
        handleFormSubmission();
      });

      // Fix dropdown functionality
      const subjectSelect = document.getElementById("subject");
      if (subjectSelect) {
        // Ensure dropdown is properly styled and functional
        subjectSelect.style.cursor = "pointer";
        subjectSelect.addEventListener("click", function (e) {
          e.stopPropagation();
          this.focus();
        });

        subjectSelect.addEventListener("change", function () {
          clearFieldError(this);
          console.log("Subject changed to:", this.value);
        });
      }

      // Real-time validation
      const formFields = contactForm.querySelectorAll(".form-control");
      formFields.forEach((field) => {
        field.addEventListener("blur", function () {
          validateField(this);
        });

        field.addEventListener("input", function () {
          clearFieldError(this);
        });
      });
    }
  }

  // Fixed form submission handler
  function handleFormSubmission() {
    const form = document.getElementById("contact-form");
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    // Disable button & show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = `
    <span style="display:inline-flex;align-items:center;gap:8px;">
      <span class="loading-spinner"
            style="width:16px;height:16px;
                   border:2px solid transparent;
                   border-top:2px solid currentColor;
                   border-radius:50%;
                   animation:spin 1s linear infinite;"></span>
      Sending…
    </span>
  `;

    // 1️⃣ Auto-reply to the user
    emailjs
      .sendForm(
        "service_p8mb7fk", // Your service ID
        "template_crvnpvk", // Your user auto-reply template ID
        "#contact-form" // The form selector
      )
      .then(() => {
        console.log("Auto-reply sent to user.");
      })
      .catch((err) => {
        console.error("Auto-reply error:", err);
      });

    // 2️⃣ Notification to yourself
    emailjs
      .send(
        "service_p8mb7fk", // Your service ID
        "template_1hojypr", // Your owner notification template ID
        {
          from_name: form.name.value,
          from_email: form.email.value,
          subject: form.subject.value,
          message: form.message.value,
        }
      )
      .then(() => {
        console.log("Notification sent to owner.");
        showSuccessMessage(); // Only show success after owner notification succeeds
      })
      .catch((err) => {
        console.error("Owner notification error:", err);
        alert("Message sent, but notification failed.");
      })
      .finally(() => {
        // Reset button and form
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
        form.reset();
      });
  }

  // Fixed field validation
  function validateField(field) {
    if (!field) return false;

    const fieldName = field.name;
    const value = field.value.trim();
    const errorElement = document.getElementById(`${fieldName}-error`);

    let isValid = true;
    let errorMessage = "";

    switch (fieldName) {
      case "name":
        if (!value) {
          errorMessage = "Name is required";
          isValid = false;
        } else if (value.length < 2) {
          errorMessage = "Name must be at least 2 characters";
          isValid = false;
        } else if (!/^[a-zA-Z\s.-]+$/.test(value)) {
          errorMessage =
            "Name can only contain letters, spaces, dots, and hyphens";
          isValid = false;
        }
        break;

      case "email":
        if (!value) {
          errorMessage = "Email is required";
          isValid = false;
        } else if (!isValidEmail(value)) {
          errorMessage = "Please enter a valid email address";
          isValid = false;
        }
        break;

      case "subject":
        if (!value) {
          errorMessage = "Please select a subject";
          isValid = false;
        }
        break;

      case "message":
        if (!value) {
          errorMessage = "Message is required";
          isValid = false;
        } else if (value.length < 10) {
          errorMessage = "Message must be at least 10 characters";
          isValid = false;
        } else if (value.length > 1000) {
          errorMessage = "Message must be less than 1000 characters";
          isValid = false;
        }
        break;
    }

    if (!isValid && errorElement) {
      showFieldError(errorElement, errorMessage);
      field.style.borderColor = "var(--color-error)";
    } else {
      clearFieldError(field);
    }

    return isValid;
  }

  function showFieldError(errorElement, message) {
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add("show");
      errorElement.style.display = "block";
    }
  }

  function clearFieldError(field) {
    if (!field) return;

    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove("show");
      errorElement.style.display = "none";
    }
    field.style.borderColor = "";
  }

  function clearAllErrors() {
    const errorElements = document.querySelectorAll(".form-error");
    errorElements.forEach((error) => {
      error.textContent = "";
      error.classList.remove("show");
      error.style.display = "none";
    });

    const formFields = contactForm.querySelectorAll(".form-control");
    formFields.forEach((field) => {
      field.style.borderColor = "";
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Fixed form submission with proper success message
  function submitForm(formData) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    console.log("Submitting form...");

    // Show loading state
    submitButton.textContent = "Sending Message...";
    submitButton.disabled = true;
    contactForm.classList.add("loading");

    // Add loading animation
    submitButton.innerHTML = `
            <span style="display: inline-flex; align-items: center; gap: 8px;">
                <span class="loading-spinner" style="width: 16px; height: 16px; border: 2px solid transparent; border-top: 2px solid currentColor; border-radius: 50%; animation: spin 1s linear infinite;"></span>
                Sending Message...
            </span>
        `;

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted successfully");

      // Reset form
      contactForm.reset();

      // Show success message
      showSuccessMessage();

      // Reset button state
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
      contactForm.classList.remove("loading");

      // Track form submission
      trackFormSubmission(formData);
    }, 2500);
  }

  // Fixed success message display
  function showSuccessMessage() {
    // Remove any existing success message
    const existingSuccess = contactForm.querySelector(".form-success");
    if (existingSuccess) {
      existingSuccess.remove();
    }

    // Create success message element
    const successMessage = document.createElement("div");
    successMessage.className = "form-success";
    successMessage.style.cssText = `
            background: rgba(33, 128, 141, 0.15);
            color: var(--color-success);
            padding: var(--space-16);
            border-radius: var(--radius-base);
            margin-bottom: var(--space-16);
            border: 1px solid rgba(33, 128, 141, 0.25);
            text-align: center;
            font-weight: var(--font-weight-medium);
            animation: fadeInUp 0.5s ease-out;
            display: block;
        `;

    successMessage.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                <span style="font-size: 1.2em; color: var(--color-success);">✓</span>
                <span>Thank you! Your message has been sent successfully. I'll get back to you within 24 hours.</span>
            </div>
        `;

    // Insert success message at the top of the form
    contactForm.insertBefore(successMessage, contactForm.firstChild);

    // Scroll to success message
    successMessage.scrollIntoView({ behavior: "smooth", block: "center" });

    console.log("Success message displayed");

    // Remove success message after 8 seconds
    setTimeout(() => {
      if (successMessage.parentNode) {
        successMessage.style.opacity = "0";
        successMessage.style.transform = "translateY(-10px)";
        setTimeout(() => {
          if (successMessage.parentNode) {
            successMessage.remove();
          }
        }, 300);
      }
    }, 8000);
  }

  function trackFormSubmission(formData) {
    // Analytics tracking
    console.log("Form submitted:", {
      name: formData.name.value,
      email: formData.email.value,
      subject: formData.subject.value,
      timestamp: new Date().toISOString(),
    });
  }

  // Animation Setup
  function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
      ".skill__category, .timeline__item, .project__card, .cert__card, .highlight__item, .achievement__item"
    );
    animateElements.forEach((el) => {
      observer.observe(el);
    });

    // Add hover effects for interactive elements
    setupHoverEffects();

    // Add loading spinner animation
    addSpinnerAnimation();
  }

  function setupHoverEffects() {
    // Enhanced hover effects for skill tags
    const skillTags = document.querySelectorAll(".skill__tag");
    skillTags.forEach((tag) => {
      tag.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-3px) scale(1.05)";
        this.style.transition = "all 0.2s ease";
      });

      tag.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
      });
    });

    // Enhanced hover effects for social links
    const socialLinks = document.querySelectorAll(".social__link");
    socialLinks.forEach((link) => {
      link.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-2px)";
        this.style.transition = "all 0.2s ease";
      });

      link.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
      });
    });

    // Project card interactions
    const projectCards = document.querySelectorAll(".project__card");
    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-12px)";
        this.style.boxShadow = "0 20px 40px rgba(33, 128, 141, 0.15)";
        this.style.transition = "all 0.3s ease";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "";
      });
    });
  }

  function addSpinnerAnimation() {
    // Add CSS for loading spinner
    const style = document.createElement("style");
    style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .loading-spinner {
                animation: spin 1s linear infinite !important;
            }
        `;
    document.head.appendChild(style);
  }

  // GitHub Links Handler
  function setupGitHubLinks() {
    const githubLinks = document.querySelectorAll('a[href*="github.com"]');
    githubLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        console.log("GitHub link clicked:", this.href);
        // Links will open in new tab due to target="_blank"
      });
    });
  }

  // Keyboard Navigation
  function setupKeyboardNavigation() {
    document.addEventListener("keydown", function (e) {
      // ESC key to close mobile menu
      if (
        e.key === "Escape" &&
        navMenu &&
        navMenu.classList.contains("active")
      ) {
        closeMobileMenu();
      }

      // Enter key for buttons
      if (e.key === "Enter" && e.target.classList.contains("btn")) {
        e.target.click();
      }
    });
  }

  // Performance Monitoring
  function logPerformanceMetrics() {
    if ("performance" in window) {
      window.addEventListener("load", function () {
        setTimeout(() => {
          const perfData = performance.getEntriesByType("navigation")[0];
          if (perfData) {
            console.log("Portfolio Performance Metrics:", {
              domContentLoaded: Math.round(
                perfData.domContentLoadedEventEnd -
                  perfData.domContentLoadedEventStart
              ),
              loadComplete: Math.round(
                perfData.loadEventEnd - perfData.loadEventStart
              ),
              totalLoadTime: Math.round(
                perfData.loadEventEnd - perfData.fetchStart
              ),
            });
          }
        }, 0);
      });
    }
  }

  // Initialize additional features
  setupGitHubLinks();
  setupKeyboardNavigation();
  logPerformanceMetrics();

  // Smooth reveal animation for hero section
  const heroTitle = document.querySelector(".hero__title");
  const heroSubtitle = document.querySelector(".hero__subtitle");
  const heroDescription = document.querySelector(".hero__description");
  const heroActions = document.querySelector(".hero__actions");
  const heroAvatar = document.querySelector(".hero__avatar");

  if (heroTitle) {
    setTimeout(() => heroTitle.classList.add("fade-in-up"), 100);
    setTimeout(() => heroSubtitle.classList.add("fade-in-up"), 200);
    setTimeout(() => heroDescription.classList.add("fade-in-up"), 300);
    setTimeout(() => heroActions.classList.add("fade-in-up"), 400);
    setTimeout(() => heroAvatar.classList.add("fade-in-up"), 500);
  }

  // Initial call to show back-to-top if needed
  toggleBackToTop();

  // Easter egg: Developer console message
  console.log(`
    🚀 Welcome to Soubhagya Mohapatra's Portfolio!
    
    👨‍💻 Java Backend Developer
    🏢 Cognizant Technology Solutions
    📍 Bhubaneswar, Odisha
    
    💡 Interested in backend development, microservices, and cloud technologies?
    📧 Let's connect: soubhagyamohapatra.bbsr@gmail.com
    
    This portfolio is built with vanilla HTML, CSS, and JavaScript.
    No frameworks, just clean, efficient code! 💻
    `);
});

// Service Worker registration for offline capability (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    // Uncomment below to enable service worker
    // navigator.serviceWorker.register('/sw.js')
    //     .then(registration => console.log('SW registered'))
    //     .catch(error => console.log('SW registration failed'));
  });
}
