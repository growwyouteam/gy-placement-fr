/**
 * Job Application Form Handler with MongoDB Integration
 */

// Toast notification function
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

// Confetti animation function
function celebrateWithConfetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Fire confetti from two different origins
    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    }));
    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    }));
  }, 250);
}

// Multi-step form navigation
let currentStep = 1;
const totalSteps = 5;

function updateProgressIndicator() {
  const steps = document.querySelectorAll('.progress-step');
  steps.forEach((step, index) => {
    if (index + 1 <= currentStep) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });
}

function showSection(sectionNumber) {
  // Hide all sections
  document.querySelectorAll('.form-section').forEach(section => {
    section.classList.remove('active');
  });

  // Show current section
  const currentSection = document.getElementById(`section${sectionNumber}`);
  if (currentSection) {
    currentSection.classList.add('active');
  }

  // Update navigation buttons
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const formNavigation = document.getElementById('formNavigation');
  const formActions = document.getElementById('formActions');

  if (sectionNumber === 1) {
    prevBtn.style.display = 'none';
  } else {
    prevBtn.style.display = 'flex';
  }

  if (sectionNumber === totalSteps) {
    formNavigation.style.display = 'none';
    formActions.style.display = 'flex';
  } else {
    formNavigation.style.display = 'flex';
    formActions.style.display = 'none';
  }

  updateProgressIndicator();
}

function validateSection(sectionNumber) {
  const section = document.getElementById(`section${sectionNumber}`);
  const requiredFields = section.querySelectorAll('[required]');
  
  for (let field of requiredFields) {
    if (!field.value.trim()) {
      showToast(`Please fill in: ${field.previousElementSibling?.textContent || 'required field'}`, 'error');
      field.focus();
      return false;
    }

    // Email validation
    if (field.type === 'email') {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(field.value)) {
        showToast('Please enter a valid email address', 'error');
        field.focus();
        return false;
      }
    }

    // Phone validation
    if (field.name === 'phone') {
      // Remove spaces, dashes, and plus signs for validation
      const cleanPhone = field.value.replace(/[\s\-\+]/g, '');
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(cleanPhone)) {
        showToast('Please enter a valid 10-digit Indian phone number', 'error');
        field.focus();
        return false;
      }
    }
  }

  return true;
}

function nextSection() {
  if (validateSection(currentStep)) {
    if (currentStep < totalSteps) {
      currentStep++;
      showSection(currentStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

function prevSection() {
  if (currentStep > 1) {
    currentStep--;
    showSection(currentStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Handle form submission
async function handleFormSubmit(e) {
  e.preventDefault();

  if (!validateSection(currentStep)) {
    return;
  }

  const form = document.getElementById('applicationForm');
  const submitBtn = document.getElementById('submitBtn');
  const originalText = submitBtn.innerHTML;

  // Disable submit button
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> Submitting...';

  try {
    // Collect all form data
    const formData = new FormData(form);
    const applicationData = {
      // Personal Information (Section 1)
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('currentAddress'), // Using currentAddress from form
      
      // Position Information (Section 2)
      jobTitle: formData.get('positionAppliedFor'), // Using positionAppliedFor from form
      department: formData.get('jobType'), // Using jobType as department
      expectedSalary: formData.get('expectedSalary'),
      
      // Education (Section 3)
      qualification: formData.get('degreeType'),
      institution: formData.get('schoolUniversity'),
      yearOfPassing: formData.get('graduationYear'),
      
      // Work Experience (Section 4)
      previousCompany: formData.get('mostRecentEmployer'),
      experience: formData.get('keyResponsibilities'),
      
      // Skills & Documents (Section 5)
      skills: formData.get('keySkills'),
      languagesSpoken: formData.get('languagesSpoken'),
      finalDate: formData.get('finalDate')
    };

    // Log the data being sent for debugging
    console.log('📤 Submitting application data:', applicationData);
    console.log('📋 Required fields check:', {
      fullName: applicationData.fullName || '❌ MISSING',
      email: applicationData.email || '❌ MISSING',
      phone: applicationData.phone || '❌ MISSING',
      jobTitle: applicationData.jobTitle || '❌ MISSING'
    });

    // Call API to submit application
    const response = await ApplicationAPI.submitApplication(applicationData);

    if (response.success) {
      // Show success toast
      showToast('🎉 Congratulations! Application submitted successfully!', 'success');
      
      // Trigger confetti animation
      celebrateWithConfetti();
      
      // Reset form
      form.reset();
      currentStep = 1;
      showSection(1);
      
      // Redirect to home page after 3 seconds
      setTimeout(() => {
        showToast('Redirecting to home page...', 'info');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      }, 3000);
    } else {
      throw new Error(response.message || 'Failed to submit application');
    }
  } catch (error) {
    console.error('Application submission error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // Show detailed error message
    const errorMessage = error.message || 'Failed to submit application. Please try again.';
    showToast(errorMessage, 'error');
    
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
}

// Initialize form on page load
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('applicationForm');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  if (form) {
    // Set up navigation
    if (nextBtn) nextBtn.addEventListener('click', nextSection);
    if (prevBtn) prevBtn.addEventListener('click', prevSection);
    
    // Set up form submission
    form.addEventListener('submit', handleFormSubmit);
    
    // Initialize first section
    showSection(1);
    
    // Load selected job data if available
    const selectedJob = localStorage.getItem('selectedJob');
    if (selectedJob) {
      try {
        const job = JSON.parse(selectedJob);
        const jobTitleField = form.querySelector('[name="positionAppliedFor"]');
        if (jobTitleField) {
          jobTitleField.value = job.title;
        }
      } catch (error) {
        console.error('Error loading selected job:', error);
      }
    }
  }
});
