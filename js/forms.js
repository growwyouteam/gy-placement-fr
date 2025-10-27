/**
 * Form Handlers for Contact and Job Applications
 */

// Toast notification function
function showToast(message, type = 'info') {
  if (typeof Toastify !== 'undefined') {
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
  } else {
    // Fallback to alert if Toastify not available
    alert(message);
  }
}

/**
 * Handle Contact Form Submission
 */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById('name')?.value.trim(),
      email: document.getElementById('email')?.value.trim(),
      phone: document.getElementById('phone')?.value.trim(),
      subject: document.getElementById('subject')?.value.trim(),
      message: document.getElementById('message')?.value.trim(),
    };

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    // Disable submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const response = await ContactAPI.submitContact(formData);

      if (response.success) {
        showToast(response.message || 'Message sent successfully!', 'success');
        contactForm.reset();
      } else {
        throw new Error(response.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      showToast(error.message || 'Failed to send message. Please try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

/**
 * Handle Job Application Form Submission
 */
function initJobApplicationForm() {
  const applicationForm = document.getElementById('jobApplicationForm');
  if (!applicationForm) return;

  applicationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      fullName: document.getElementById('fullName')?.value.trim(),
      email: document.getElementById('email')?.value.trim(),
      phone: document.getElementById('phone')?.value.trim(),
      jobTitle: document.getElementById('jobTitle')?.value.trim(),
      experience: document.getElementById('experience')?.value.trim(),
      qualification: document.getElementById('qualification')?.value.trim(),
      coverLetter: document.getElementById('coverLetter')?.value.trim(),
    };

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone || !formData.jobTitle) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    // Validate phone number (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      showToast('Please enter a valid 10-digit phone number', 'error');
      return;
    }

    // Validate email
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    // Disable submit button
    const submitBtn = applicationForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    try {
      const response = await ApplicationAPI.submitApplication(formData);

      if (response.success) {
        showToast(response.message || 'Application submitted successfully!', 'success');
        applicationForm.reset();
        
        // Redirect to jobs page after 2 seconds
        setTimeout(() => {
          window.location.href = 'jobs.html';
        }, 2000);
      } else {
        throw new Error(response.error || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Application form error:', error);
      showToast(error.message || 'Failed to submit application. Please try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

/**
 * Populate job title dropdown from available jobs
 */
async function populateJobTitles() {
  const jobTitleSelect = document.getElementById('jobTitle');
  if (!jobTitleSelect) return;

  try {
    const response = await JobAPI.getAllJobs();
    
    if (response.success && response.data) {
      // Clear existing options except the first one
      jobTitleSelect.innerHTML = '<option value="">Select a job position</option>';
      
      // Add job titles as options
      response.data.forEach(job => {
        const option = document.createElement('option');
        option.value = job.title;
        option.textContent = `${job.title} - ${job.location}`;
        jobTitleSelect.appendChild(option);
      });
    }
  } catch (error) {
    console.error('Error loading job titles:', error);
  }
}

/**
 * Initialize all forms
 */
document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initJobApplicationForm();
  populateJobTitles();
});

// Export functions for external use
window.initContactForm = initContactForm;
window.initJobApplicationForm = initJobApplicationForm;
window.populateJobTitles = populateJobTitles;
