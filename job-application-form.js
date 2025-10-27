// Job Application Form JavaScript

// State management
let currentStep = 1;
let loading = false;
const totalSteps = 5;

// DOM Elements
const formSections = document.querySelectorAll('.form-section');
const progressSteps = document.querySelectorAll('.progress-step');
const progressLines = document.querySelectorAll('.progress-line');
const formNavigation = document.getElementById('formNavigation');
const formActions = document.getElementById('formActions');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const applicationForm = document.getElementById('applicationForm');

// Initialize form
function initForm() {
    showStep(currentStep);
    updateNavigation();
}

// Show specific step
function showStep(step) {
    // Hide all sections
    formSections.forEach(section => section.classList.remove('active'));

    // Show current section
    const currentSection = document.getElementById(`section${step}`);
    if (currentSection) {
        currentSection.classList.add('active');
    }

    // Update progress indicator
    progressSteps.forEach((stepElement, index) => {
        if (index + 1 <= step) {
            stepElement.classList.add('active');
        } else {
            stepElement.classList.remove('active');
        }
    });

    // Update progress lines
    progressLines.forEach((line, index) => {
        if (index + 1 < step) {
            line.classList.add('active');
        } else {
            line.classList.remove('active');
        }
    });
}

// Update navigation buttons
function updateNavigation() {
    if (currentStep === 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'flex';
        formNavigation.style.display = 'flex';
        formActions.style.display = 'none';
    } else if (currentStep === totalSteps) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'none';
        formNavigation.style.display = 'none';
        formActions.style.display = 'flex';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
        formNavigation.style.display = 'flex';
        formActions.style.display = 'none';
    }
}

// Show loading state
function showLoading(button, text) {
    loading = true;
    button.innerHTML = `<i class="ri-loader-4-line loading"></i> ${text}`;
    button.disabled = true;
}

// Hide loading state
function hideLoading(button, originalText) {
    loading = false;
    button.innerHTML = originalText;
    button.disabled = false;
}

// Validate current step
function validateStep(step) {
    const currentSection = document.getElementById(`section${step}`);
    const requiredFields = currentSection.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });

    return isValid;
}

// Next step
function nextStep() {
    if (currentStep < totalSteps && validateStep(currentStep)) {
        currentStep++;
        showStep(currentStep);
        updateNavigation();
    } else if (!validateStep(currentStep)) {
        alert('Please fill in all required fields before proceeding.');
    }
}

// Previous step
function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        updateNavigation();
    }
}

// Handle form submission
function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    if (!validateStep(currentStep)) {
        alert('Please fill in all required fields before submitting.');
        return;
    }

    showLoading(submitBtn, 'Submitting Application...');

    // Collect form data
    const formData = new FormData(applicationForm);
    const formObject = {};
    for (let [key, value] of formData.entries()) {
        formObject[key] = value;
    }

    // Simulate API call
    setTimeout(() => {
        // Simulate success
        alert('Application submitted successfully!');

        // Show success message and redirect
        hideLoading(submitBtn, '<i class="ri-send-plane-2-fill"></i> Submit Application');
        alert('Thank you for your application. We will review it and contact you soon.');

        // Reset form
        applicationForm.reset();
        currentStep = 1;
        showStep(currentStep);
        updateNavigation();
    }, 2000);
}

// Event listeners
function setupEventListeners() {
    nextBtn.addEventListener('click', nextStep);
    prevBtn.addEventListener('click', prevStep);
    applicationForm.addEventListener('submit', handleSubmit);
}

// Initialize form when page loads
document.addEventListener('DOMContentLoaded', function() {
    initForm();
    setupEventListeners();
});
