// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const header = document.querySelector("header")
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")
  const navLinksItems = document.querySelectorAll(".nav-links li a")
  const sections = document.querySelectorAll("section")
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")
  const skillBars = document.querySelectorAll(".skill-progress")
  const contactForm = document.getElementById("contactForm")
  const formStatus = document.getElementById("formStatus")
  const animatedElements = document.querySelectorAll(".hidden")

  // Scroll event for header background
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    // Update active nav link based on scroll position
    updateActiveNavLink()

    // Animate elements when they come into view
    animateOnScroll()
  })

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navLinks.classList.toggle("active")
  })

  // Close mobile menu when a nav link is clicked
  navLinksItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })

  // Project filtering
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Get filter value
      const filter = this.getAttribute("data-filter")

      // Filter projects
      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  })

  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Validate form data
      if (!name || !email || !subject || !message) {
        showFormStatus("Please fill in all fields", "error")
        return
      }

      // Simulate form submission (replace with actual form submission)
      showFormStatus("Sending message...", "info")

      // Simulate API call
      setTimeout(() => {
        // Reset form
        contactForm.reset()

        // Show success message
        showFormStatus("Your message has been sent successfully!", "success")
      }, 1500)
    })
  }

  // Initialize animations
  initializeAnimations()

  // Functions
  function updateActiveNavLink() {
    // Get current scroll position
    const scrollPosition = window.scrollY

    // Loop through sections to find the one in view
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all nav links
        navLinksItems.forEach((item) => item.classList.remove("active"))

        // Add active class to corresponding nav link
        const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`)
        if (activeLink) {
          activeLink.classList.add("active")
        }
      }
    })
  }

  function showFormStatus(message, type) {
    formStatus.textContent = message
    formStatus.className = "form-status"
    formStatus.classList.add(type)
  }

  function initializeAnimations() {
    // Animate skill bars
    skillBars.forEach((bar) => {
      const width = bar.style.width
      bar.style.width = "0"
      setTimeout(() => {
        bar.style.width = width
      }, 500)
    })

    // Initial check for elements in viewport
    animateOnScroll()
  }

  function animateOnScroll() {
    animatedElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 50) {
        element.classList.add("show")
      }
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        })
      }
    })
  })

  // Add animation classes to elements
  document.querySelector(".hero-content").classList.add("fade-in")
  document.querySelectorAll(".about-content > div").forEach((el) => el.classList.add("slide-up"))

  // Add hidden class to elements for scroll animation
  document.querySelectorAll(".skill-item, .tech-item, .contact-info, .contact-form").forEach((el) => {
    el.classList.add("hidden")
  })

  // Make project cards visible immediately with a slight delay for a nice effect
  document.querySelectorAll(".project-card").forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("show")
    }, 300 * index)
  })
})
