// Job Data - Now fetched from backend API
let jobs = [];

// Mobile Menu Toggle
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const navBackdrop = document.getElementById('navBackdrop');
  const menuBtn = document.querySelector('.nav__menu__btn i');

  navLinks.classList.toggle('open');
  navBackdrop.classList.toggle('open');

  if (navLinks.classList.contains('open')) {
    // Opening menu - add staggered animation
    const menuItems = navLinks.querySelectorAll('li');
    menuItems.forEach((item, index) => {
      item.style.transform = 'translateX(-100%)';
      item.style.opacity = '0';
      setTimeout(() => {
        item.style.transform = 'translateX(0)';
        item.style.opacity = '1';
        item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      }, index * 100 + 200);
    });

    menuBtn.className = 'ri-close-line';
    menuBtn.style.transform = 'rotate(180deg)';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  } else {
    // Closing menu - reverse staggered animation
    const menuItems = navLinks.querySelectorAll('li');
    menuItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.transform = 'translateX(-100%)';
        item.style.opacity = '0';
      }, index * 50);
    });

    setTimeout(() => {
      menuBtn.className = 'ri-menu-line';
      menuBtn.style.transform = 'rotate(0deg)';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }, 300);
  }
}

// Close menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav__links a');
  navLinks.forEach((link, index) => {
    link.addEventListener('click', function(e) {
      const navLinksContainer = document.getElementById('navLinks');
      const navBackdrop = document.getElementById('navBackdrop');
      const menuBtn = document.querySelector('.nav__menu__btn i');

      if (navLinksContainer && navLinksContainer.classList.contains('open')) {
        // Mobile menu is open - close it first, then navigate
        e.preventDefault();

        // Add staggered animation to menu items
        const menuItems = navLinksContainer.querySelectorAll('li');
        menuItems.forEach((item, itemIndex) => {
          setTimeout(() => {
            item.style.transform = 'translateX(-100%)';
            item.style.opacity = '0';
          }, itemIndex * 50);
        });

        // Close menu after animation completes, then navigate
        setTimeout(() => {
          navLinksContainer.classList.remove('open');
          navBackdrop.classList.remove('open');
          menuBtn.className = 'ri-menu-line';
          menuBtn.style.transform = 'rotate(0deg)';
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.width = '';

          // Navigate after menu closes
          const href = link.getAttribute('href');
          if (href.startsWith('#')) {
            // Smooth scroll to section
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          } else {
            // Navigate to new page
            window.location.href = href;
          }
        }, 300);
      } else {
        // Mobile menu is closed - handle navigation normally
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          // Smooth scroll to section on same page
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
        // For external pages, let browser handle navigation normally
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    const navLinksContainer = document.getElementById('navLinks');
    const navBackdrop = document.getElementById('navBackdrop');
    const menuBtn = document.querySelector('.nav__menu__btn');
    const menuIcon = document.querySelector('.nav__menu__btn i');

    if (navLinksContainer && navLinksContainer.classList.contains('open')) {
      // If clicking on backdrop or outside the sidebar area, close menu
      if (navBackdrop.contains(e.target) || (!navLinksContainer.contains(e.target) && !menuBtn.contains(e.target))) {
        // Add staggered animation for closing
        const menuItems = navLinksContainer.querySelectorAll('li');
        menuItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.transform = 'translateX(-100%)';
            item.style.opacity = '0';
          }, index * 50);
        });

        // Close menu after animation completes
        setTimeout(() => {
          navLinksContainer.classList.remove('open');
          navBackdrop.classList.remove('open');
          menuIcon.className = 'ri-menu-line';
          menuIcon.style.transform = 'rotate(0deg)';
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.width = '';
        }, 300);
      }
    }
  });

  // Load jobs from backend API
  loadJobs();

  // Initialize counter animation on about page
  const aboutStats = document.querySelector('.about__stats');
  if (aboutStats) {
    // Add animation class to cards with staggered delay
    const statCards = document.querySelectorAll('.stat__card');
    statCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.transitionDelay = `${index * 0.2}s`;
        card.classList.add('animate');
      }, 100);
    });

    // Initialize counter animation
    setTimeout(() => {
      animateCounter();
    }, 500);
  }

  // Initialize Swiper for testimonials
  const swiperElement = document.querySelector('.testimonials-swiper');
  if (swiperElement) {
    try {
      const testimonialsSwiper = new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 600,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets',
        }
      });
      
      // Force start autoplay after initialization
      setTimeout(() => {
        if (testimonialsSwiper.autoplay) {
          testimonialsSwiper.autoplay.start();
        }
      }, 200);
    } catch (error) {
      // Swiper initialization failed silently
    }
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  });
});

// Toast notification function using Toastify
function showToast(message, type = 'info') {
  Toastify({
    text: message,
    duration: 3000,
    gravity: 'top',
    position: 'right',
    style: {
      background: type === 'success' ? 'linear-gradient(to right, #00b09b, #96c93d)' : 
                 type === 'error' ? 'linear-gradient(to right, #ff5f6d, #ffc371)' : 
                 'linear-gradient(to right, #667eea, #764ba2)'
    },
    stopOnFocus: true
  }).showToast();
}


// Auth functions
function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('token');
}

async function logout() {
  try {
    // Call backend logout API
    if (localStorage.getItem('token')) {
      await AuthAPI.logout();
    }
  } catch (error) {
    // Logout error handled silently
  } finally {
    // Clear all auth data from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    
    showToast('Logged out successfully!', 'success');
    
    // Reload page to update UI
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
}

// Counter Animation Function
function animateCounter() {
  const statNumbers = document.querySelectorAll('.stat__number');

  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const suffix = stat.getAttribute('data-suffix') || '';
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        if (current > target) current = target;

        // Format large numbers with K for thousands
        let displayValue = Math.floor(current);
        if (displayValue >= 1000) {
          displayValue = Math.floor(displayValue / 1000) + 'K';
        }

        stat.textContent = displayValue + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        // Add final suffix formatting
        if (target >= 10000) {
          stat.textContent = '10K+';
        } else if (target >= 5000) {
          stat.textContent = '5K+';
        } else if (target >= 50000) {
          stat.textContent = '50K+';
        } else {
          stat.textContent = target + suffix;
        }
      }
    };

    // Start animation when element comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !stat.classList.contains('animated')) {
          stat.classList.add('animated');
          updateCounter();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(stat.closest('.stat__card'));
  });
}

/**
 * Load jobs from backend API
 */
async function loadJobs() {
  const jobGrid = document.getElementById('jobGrid');
  if (!jobGrid) {
    return;
  }

  try {
    // Show loading state
    jobGrid.innerHTML = '<div class="loading">Loading jobs...</div>';

    // Check if JobAPI is available
    if (typeof JobAPI === 'undefined') {
      throw new Error('JobAPI is not loaded. Make sure api.js is included before app.js');
    }

    // Fetch jobs from backend API
    const response = await JobAPI.getAllJobs();
    
    if (response.success && response.data) {
      jobs = response.data;
      
      // Determine how many jobs to display
      const currentPage = window.location.pathname;
      const isHomePage = currentPage.endsWith('index.html') || currentPage.endsWith('/');
      const displayedJobs = isHomePage ? jobs.slice(0, 6) : jobs;
      
      // Clear loading state
      jobGrid.innerHTML = '';
      
      // Display jobs
      if (displayedJobs.length === 0) {
        jobGrid.innerHTML = '<p class="no-jobs">No jobs available at the moment.</p>';
        return;
      }
      
      displayedJobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job__card';
        jobCard.style.cursor = 'pointer';
        jobCard.innerHTML = `
          <div class="job__card__header">
            <div></div>
          </div>
          <h4>${job.title}</h4>
          <p><b>Location : </b>${job.location}</p>
          <p><b>Salary : </b>${job.salary}</p>
          <p><b>Qualification : </b>${job.qualification}</p>
          <p><b>Experience : </b>${job.experience}</p>
          <p><b>Key Skills : </b>${job.keySkills}</p>
        `;
        
        // Add click handler with authentication check
        jobCard.addEventListener('click', function() {
          handleJobCardClick(job);
        });
        
        jobGrid.appendChild(jobCard);
      });
    }
  } catch (error) {
    // Show detailed error message
    const errorMsg = error.message.includes('fetch') 
      ? '❌ Backend server is not running! Start it with: cd backend && npm run dev'
      : `❌ Error: ${error.message}`;
    
    jobGrid.innerHTML = `
      <div class="error-message" style="padding: 20px; background: #fee2e2; border: 2px solid #ef4444; border-radius: 8px; margin: 20px;">
        <h3 style="color: #dc2626;">Failed to load jobs</h3>
        <p><strong>Error:</strong> ${error.message}</p>
        <p><strong>Solution:</strong></p>
        <ol style="text-align: left; margin-left: 20px;">
          <li>Open terminal in VS Code</li>
          <li>Run: <code style="background: #f3f4f6; padding: 2px 8px; border-radius: 4px;">cd backend</code></li>
          <li>Run: <code style="background: #f3f4f6; padding: 2px 8px; border-radius: 4px;">node server.js</code></li>
          <li>Refresh this page</li>
        </ol>
        <p style="margin-top: 15px;">
          <a href="http://localhost:5000/api/health" target="_blank" style="color: #2563eb; text-decoration: underline;">
            Click here to test if backend is running
          </a>
        </p>
      </div>
    `;
    showToast(errorMsg, 'error');
  }
}

/**
 * Search jobs by keyword
 */
async function searchJobs(keyword) {
  if (!keyword || keyword.trim() === '') {
    loadJobs(); // Load all jobs if search is empty
    return;
  }

  const jobGrid = document.getElementById('jobGrid');
  if (!jobGrid) return;

  try {
    jobGrid.innerHTML = '<div class="loading">Searching...</div>';
    
    const response = await JobAPI.searchJobs(keyword);
    
    if (response.success && response.data) {
      jobGrid.innerHTML = '';
      
      if (response.data.length === 0) {
        jobGrid.innerHTML = `<p class="no-jobs">No jobs found for "${keyword}"</p>`;
        return;
      }
      
      response.data.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job__card';
        jobCard.style.cursor = 'pointer';
        jobCard.innerHTML = `
          <div class="job__card__header">
            <div></div>
          </div>
          <h4>${job.title}</h4>
          <p><b>Location : </b>${job.location}</p>
          <p><b>Salary : </b>${job.salary}</p>
          <p><b>Qualification : </b>${job.qualification}</p>
          <p><b>Experience : </b>${job.experience}</p>
          <p><b>Key Skills : </b>${job.keySkills}</p>
        `;
        
        // Add click handler with authentication check
        jobCard.addEventListener('click', function() {
          handleJobCardClick(job);
        });
        
        jobGrid.appendChild(jobCard);
      });
    }
  } catch (error) {
    jobGrid.innerHTML = '<p class="error-message">Search failed. Please try again.</p>';
    showToast('Search failed', 'error');
  }
}

/**
 * Handle job card click with authentication check
 */
function handleJobCardClick(job) {
  // Store selected job data in localStorage
  localStorage.setItem('selectedJob', JSON.stringify(job));
  
  // Check if user is logged in
  if (isLoggedIn()) {
    // User is logged in, redirect to job application form
    window.location.href = 'job-application-form.html';
  } else {
    // User is not logged in, show message and redirect to login
    showToast('Please login to apply for this job', 'info');
    
    // Store the intended destination
    localStorage.setItem('redirectAfterLogin', 'job-application-form.html');
    
    // Redirect to login page after short delay
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
  }
}

/**
 * Update authentication UI - Profile dropdown
 */
function updateAuthUI() {
  const profileTrigger = document.getElementById('profileTrigger');
  const profileDropdown = document.getElementById('profileDropdown');
  const profileName = document.getElementById('profileName');
  const profileInfo = document.getElementById('profileInfo');
  const dropdownUsername = document.getElementById('dropdownUsername');
  const dropdownEmail = document.getElementById('dropdownEmail');
  const loginLink = document.getElementById('loginLink');
  const logoutLink = document.getElementById('logoutLink');

  if (!profileTrigger) return;

  // Check if user is logged in
  if (isLoggedIn()) {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('userEmail');
    
    // Update profile UI for logged-in user
    profileName.textContent = username || 'User';
    dropdownUsername.textContent = username || 'User';
    dropdownEmail.textContent = email || '';
    
    // Show/hide appropriate elements
    profileInfo.style.display = 'block';
    loginLink.style.display = 'none';
    logoutLink.style.display = 'block';
  } else {
    // Update profile UI for guest
    profileName.textContent = 'Account';
    profileInfo.style.display = 'none';
    loginLink.style.display = 'block';
    logoutLink.style.display = 'none';
  }

  // Toggle dropdown on click
  profileTrigger.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    profileDropdown.classList.toggle('show');
  });

  // Handle logout click
  if (logoutLink) {
    logoutLink.addEventListener('click', function(e) {
      e.preventDefault();
      logout();
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!profileTrigger.contains(e.target) && !profileDropdown.contains(e.target)) {
      profileDropdown.classList.remove('show');
    }
  });
}

// Call on page load
updateAuthUI();

// Smooth Marquee Animation
document.addEventListener('DOMContentLoaded', function() {
  const marqueeContent = document.querySelector('.marquee__content');
  if (marqueeContent) {
    // Disable CSS animation and use JavaScript for smoother control
    marqueeContent.style.animation = 'none';

    let position = 0;
    const speed = 0.3; // pixels per frame (slower for smoother movement)

    function animateMarquee() {
      position -= speed;
      // Calculate the width of one complete set (5 images + gaps)
      const singleSetWidth = (marqueeContent.scrollWidth / 3);

      // Reset position when one complete cycle is done
      if (Math.abs(position) >= singleSetWidth) {
        position = 0;
      }

      marqueeContent.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animateMarquee);
    }

    // Small delay to ensure DOM is fully loaded
    setTimeout(() => {
      animateMarquee();
    }, 100);
  }
});
