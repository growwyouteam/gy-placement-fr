/**
 * API Configuration and Helper Functions
 * Connects frontend to backend API
 */

// API Base URL - Update this based on your backend server
const API_BASE_URL = 'https://gy-placement-back.vercel.app/api';

/**
 * Generic API request handler
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise} Response data
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || `API request failed: ${response.status} ${response.statusText}`);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Job API Functions
 */
const JobAPI = {
  /**
   * Get all jobs with optional filters
   * @param {object} filters - { category, location, type }
   * @returns {Promise} Jobs data
   */
  getAllJobs: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `/jobs?${queryParams}` : '/jobs';
    return await apiRequest(endpoint);
  },

  /**
   * Get single job by ID
   * @param {string} id - Job ID
   * @returns {Promise} Job data
   */
  getJobById: async (id) => {
    return await apiRequest(`/jobs/${id}`);
  },

  /**
   * Search jobs by keyword
   * @param {string} keyword - Search keyword
   * @returns {Promise} Jobs data
   */
  searchJobs: async (keyword) => {
    return await apiRequest(`/jobs/search/${encodeURIComponent(keyword)}`);
  },

  /**
   * Create new job (admin only)
   * @param {object} jobData - Job data
   * @returns {Promise} Created job
   */
  createJob: async (jobData) => {
    return await apiRequest('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  },
};

/**
 * Application API Functions
 */
const ApplicationAPI = {
  /**
   * Submit job application
   * @param {object} applicationData - Application data
   * @returns {Promise} Application response
   */
  submitApplication: async (applicationData) => {
    return await apiRequest('/applications', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  },

  /**
   * Get all applications (admin only)
   * @param {object} filters - { jobTitle, email }
   * @returns {Promise} Applications data
   */
  getAllApplications: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `/applications?${queryParams}` : '/applications';
    return await apiRequest(endpoint);
  },

  /**
   * Get application by ID
   * @param {string} id - Application ID
   * @returns {Promise} Application data
   */
  getApplicationById: async (id) => {
    return await apiRequest(`/applications/${id}`);
  },
};

/**
 * Contact API Functions
 */
const ContactAPI = {
  /**
   * Submit contact form
   * @param {object} contactData - Contact form data
   * @returns {Promise} Contact response
   */
  submitContact: async (contactData) => {
    return await apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },

  /**
   * Get all contact messages (admin only)
   * @returns {Promise} Contact messages
   */
  getAllContacts: async () => {
    return await apiRequest('/contact');
  },
};

/**
 * Health Check
 */
const HealthAPI = {
  /**
   * Check API health status
   * @returns {Promise} Health status
   */
  checkHealth: async () => {
    return await apiRequest('/health');
  },
};

/**
 * Authentication API Functions
 */
const AuthAPI = {
  /**
   * Sign up new user
   * @param {object} userData - { username, email, password, fullName, phone }
   * @returns {Promise} Auth response with token
   */
  signup: async (userData) => {
    return await apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  /**
   * Sign in user
   * @param {object} credentials - { username, password }
   * @returns {Promise} Auth response with token
   */
  signin: async (credentials) => {
    return await apiRequest('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  /**
   * Get current user profile
   * @returns {Promise} User profile
   */
  getMe: async () => {
    const token = localStorage.getItem('token');
    return await apiRequest('/auth/me', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },

  /**
   * Logout user
   * @returns {Promise} Logout response
   */
  logout: async () => {
    const token = localStorage.getItem('token');
    return await apiRequest('/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }
};

// Export APIs for use in other files
window.AuthAPI = AuthAPI;
window.JobAPI = JobAPI;
window.ApplicationAPI = ApplicationAPI;
window.ContactAPI = ContactAPI;
window.HealthAPI = HealthAPI;
window.API_BASE_URL = API_BASE_URL;
