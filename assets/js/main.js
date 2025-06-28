// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
                        const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Simple testimonial slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
        });
    }
    
    // Initialize first testimonial
    showTestimonial(0);
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Form validation for contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const message = this.querySelector('textarea[name="message"]').value.trim();
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Form submission would go here
            alert('Form submitted successfully!');
            this.reset();
        });
    }

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('loading');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .service-card, .portfolio-item, .blog-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state
    document.querySelectorAll('.feature-card, .service-card, .portfolio-item, .blog-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Newsletter Subscription
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[name="email"]');
        const messageDiv = document.getElementById('newsletter-message');
        
        // Simple validation
        if (!emailInput.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            messageDiv.textContent = 'Please enter a valid email address';
            messageDiv.className = 'newsletter-message error';
            return;
        }
        
        // Simulate API call - in reality you would use Mailchimp, ConvertKit, etc.
        setTimeout(() => {
            messageDiv.textContent = 'Thank you for subscribing!';
            messageDiv.className = 'newsletter-message success';
            emailInput.value = '';
            
            // Reset message after 5 seconds
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }, 1000);
    });
}
});
// E-Commerce Product Display
const products = [
    {
        id: 1,
        title: "Premium Wireless Headphones",
        price: 199.99,
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
        rating: 4.5,
        images: ["/assets/images/product1.jpg", "/assets/images/product1-alt.jpg"],
        inStock: true
    },
    {
        id: 2,
        title: "Smart Fitness Tracker",
        price: 89.99,
        description: "Track your workouts, heart rate, and sleep patterns with this advanced fitness tracker.",
        rating: 4.2,
        images: ["/assets/images/product2.jpg"],
        inStock: true
    },
    {
        id: 3,
        title: "Portable Bluetooth Speaker",
        price: 129.99,
        description: "Waterproof speaker with 20-hour playtime and deep bass technology.",
        rating: 4.7,
        images: ["/assets/images/product3.jpg"],
        inStock: false
    }
];

function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;
    
    productGrid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.title}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-rating">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))} (${product.rating})</div>
                <button class="add-to-cart" ${!product.inStock ? 'disabled' : ''}>
                    ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('add-to-cart')) {
                const productId = parseInt(this.getAttribute('data-id'));
                showProductModal(productId);
            }
        });
    });
    
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = parseInt(this.closest('.product-card').getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const modalImages = modal.querySelector('.modal-images');
    const modalInfo = modal.querySelector('.modal-info');
    
    // Set images
    modalImages.innerHTML = product.images.map(img => `
        <img src="${img}" alt="${product.title}">
    `).join('');
    
    // Set product info
    modalInfo.innerHTML = `
        <h2 class="modal-title">${product.title}</h2>
        <div class="modal-price">$${product.price.toFixed(2)}</div>
        <div class="product-rating">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))} (${product.rating})</div>
        <p class="modal-description">${product.description}</p>
        <div class="modal-actions">
            <div class="quantity-selector">
                <button class="decrease-qty">-</button>
                <input type="number" value="1" min="1" class="qty-input">
                <button class="increase-qty">+</button>
            </div>
            <button class="btn btn-primary add-to-cart-modal" ${!product.inStock ? 'disabled' : ''}>
                ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
        </div>
    `;
    
    // Quantity selector functionality
    const qtyInput = modal.querySelector('.qty-input');
    modal.querySelector('.decrease-qty').addEventListener('click', () => {
        if (parseInt(qtyInput.value) > 1) {
            qtyInput.value = parseInt(qtyInput.value) - 1;
        }
    });
    
    modal.querySelector('.increase-qty').addEventListener('click', () => {
        qtyInput.value = parseInt(qtyInput.value) + 1;
    });
    
    // Add to cart from modal
    modal.querySelector('.add-to-cart-modal').addEventListener('click', () => {
        const quantity = parseInt(qtyInput.value);
        addToCart(productId, quantity);
        modal.style.display = 'none';
    });
    
    // Show modal
    modal.style.display = 'block';
    
    // Close modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function addToCart(productId, quantity = 1) {
    // In a real implementation, you would manage a cart object
    const product = products.find(p => p.id === productId);
    alert(`Added ${quantity} ${product.title} to cart`);
    // Here you would typically:
    // 1. Add to cart in localStorage or state management
    // 2. Update cart count in UI
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', renderProducts);
// User Authentication System
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

function updateAuthUI() {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const authButtons = document.querySelector('.auth-buttons');
    const userProfile = document.querySelector('.user-profile');
    
    if (currentUser) {
        // User is logged in
        if (authButtons) authButtons.style.display = 'none';
        
        if (!userProfile) {
            const profileHTML = `
                <div class="user-profile">
                    <div class="user-avatar">${currentUser.name.charAt(0).toUpperCase()}</div>
                    <div class="user-dropdown">
                        <button class="user-dropdown-btn">
                            ${currentUser.name.split(' ')[0]} <i class="fas fa-caret-down"></i>
                        </button>
                        <div class="user-dropdown-menu">
                            <a href="/profile/">My Profile</a>
                            <a href="/orders/">My Orders</a>
                            <a href="#" id="logout-btn">Logout</a>
                        </div>
                    </div>
                </div>
            `;
            document.querySelector('header .container').insertAdjacentHTML('beforeend', profileHTML);
            
            document.getElementById('logout-btn').addEventListener('click', logout);
        }
    } else {
        // User is not logged in
        if (authButtons) authButtons.style.display = 'flex';
        if (userProfile) userProfile.remove();
    }
}

function showAuthModal(tab = 'login') {
    const modal = document.getElementById('auth-modal');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginTab = document.querySelector('.auth-tab[data-tab="login"]');
    const registerTab = document.querySelector('.auth-tab[data-tab="register"]');
    
    // Reset forms
    loginForm.reset();
    registerForm.reset();
    
    // Set active tab
    if (tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
    } else {
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
    }
    
    modal.style.display = 'block';
    
    // Close modal
    document.querySelector('.close-auth').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function login(email, password) {
    // In a real app, this would be an API call
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = {
            id: user.id,
            name: user.name,
            email: user.email
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateAuthUI();
        document.getElementById('auth-modal').style.display = 'none';
        alert('Login successful!');
        return true;
    } else {
        alert('Invalid email or password');
        return false;
    }
}

function register(name, email, password) {
    // In a real app, this would be an API call
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.some(u => u.email === email)) {
        alert('Email already registered');
        return false;
    }
    
    const newUser = {
        id: Date.now(),
        name,
        email,
        password // In real app, passwords should be hashed
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto-login after registration
    currentUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateAuthUI();
    document.getElementById('auth-modal').style.display = 'none';
    alert('Registration successful!');
    return true;
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    alert('Logged out successfully');
}

// Initialize auth system
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    
    // Auth button event listeners
    document.getElementById('login-btn')?.addEventListener('click', () => showAuthModal('login'));
    document.getElementById('register-btn')?.addEventListener('click', () => showAuthModal('register'));
    
    // Tab switching
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`${tabName}-form`).classList.add('active');
        });
    });
    
    // Login form submission
    document.getElementById('login-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        login(email, password);
    });
    
    // Register form submission
    document.getElementById('register-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        register(name, email, password);
    });
});
