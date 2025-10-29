
        // State management
        let isSignUpMode = false;
        let loading = false;

        // Toast notification function
        function showToast(message, type = 'success') {
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

        // DOM Elements
        const loginContainer = document.getElementById('loginContainer');
        const signInForm = document.getElementById('signInForm');
        const signUpForm = document.getElementById('signUpForm');
        const signInBtn = document.getElementById('signinBtn');
        const signUpBtn = document.getElementById('signupBtn');
        const signUpBtnToggle = document.getElementById('signUpBtnToggle');
        const signInBtnToggle = document.getElementById('signInBtnToggle');

        // Toggle to sign up mode
        function showSignUp() {
            isSignUpMode = true;
            loginContainer.classList.add('sign-up-mode');
        }

        // Toggle to sign in mode
        function showSignIn() {
            isSignUpMode = false;
            loginContainer.classList.remove('sign-up-mode');
        }

        // Show loading state
        function showLoading(button, text) {
            loading = true;
            button.value = text;
            button.disabled = true;
            button.classList.add('loading');
        }

        // Hide loading state
        function hideLoading(button, text) {
            loading = false;
            button.value = text;
            button.disabled = false;
            button.classList.remove('loading');
        }

        // Handle Sign In
        signInForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            if (loading) return;

            const username = document.getElementById('signinUsername').value.trim();
            const password = document.getElementById('signinPassword').value;

            // Basic validation
            if (!username) {
                showToast('Please enter your username', 'error');
                return;
            }

            if (!password) {
                showToast('Please enter your password', 'error');
                return;
            }

            showLoading(signInBtn, "Loading...");

            try {
                // Call backend API
                const response = await AuthAPI.signin({ username, password });

                if (response.success) {
                    // Store auth data in localStorage
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('username', response.data.user.username);
                    localStorage.setItem('userEmail', response.data.user.email);
                    localStorage.setItem('userId', response.data.user.id);

                    showToast(response.message, 'success');
                    hideLoading(signInBtn, "Login");

                    // Check if there's a redirect URL stored
                    const redirectUrl = localStorage.getItem('redirectAfterLogin');
                    
                    // Redirect after short delay
                    setTimeout(() => {
                        if (redirectUrl) {
                            // Clear the redirect URL
                            localStorage.removeItem('redirectAfterLogin');
                            // Redirect to intended page (job form)
                            window.location.href = redirectUrl;
                        } else {
                            // Default redirect to home page
                            window.location.href = 'index.html';
                        }
                    }, 1000);
                }
            } catch (error) {
                showToast(error.message || 'Login failed. Please try again.', 'error');
                hideLoading(signInBtn, "Login");
            }
        });

        // Handle Sign Up
        signUpForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            if (loading) return;

            const username = document.getElementById('signupUsername').value.trim();
            const email = document.getElementById('signupEmail').value.trim();
            const password = document.getElementById('signupPassword').value;

            // Basic validation
            if (!username) {
                showToast('Please enter a username', 'error');
                return;
            }

            if (!email) {
                showToast('Please enter an email', 'error');
                return;
            }

            if (!password) {
                showToast('Please enter a password', 'error');
                return;
            }

            // Validate password length
            if (password.length < 8) {
                showToast('Password must be at least 8 characters long', 'error');
                return;
            }

            showLoading(signUpBtn, "Loading...");

            try {
                // Call backend API
                const response = await AuthAPI.signup({ username, email, password });

                if (response.success) {
                    // Store auth data in localStorage
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('username', response.data.user.username);
                    localStorage.setItem('userEmail', response.data.user.email);
                    localStorage.setItem('userId', response.data.user.id);

                    showToast(response.message, 'success');
                    hideLoading(signUpBtn, "Sign up");

                    // Check if there's a redirect URL stored
                    const redirectUrl = localStorage.getItem('redirectAfterLogin');
                    
                    // Redirect after short delay
                    setTimeout(() => {
                        if (redirectUrl) {
                            // Clear the redirect URL
                            localStorage.removeItem('redirectAfterLogin');
                            // Redirect to intended page (job form)
                            window.location.href = redirectUrl;
                        } else {
                            // Default redirect to home page
                            window.location.href = 'index.html';
                        }
                    }, 1000);
                }
            } catch (error) {
                showToast(error.message || 'Registration failed. Please try again.', 'error');
                hideLoading(signUpBtn, "Sign up");
            }
        });

        // Event listeners for toggle buttons
        signUpBtnToggle.addEventListener('click', showSignUp);
        signInBtnToggle.addEventListener('click', showSignIn);

        // Initialize - show sign in form by default
        showSignIn();
    