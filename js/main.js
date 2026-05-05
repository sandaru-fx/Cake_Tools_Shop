document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Sticky Navbar & Scroll Effects ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- 3. Dark/Light Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check saved theme
    const savedTheme = localStorage.getItem('cakecraft-theme');
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('cakecraft-theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // --- 4. Scroll Reveal Animation ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a stats element, trigger counter animation
                if (entry.target.classList.contains('stat-item') && !entry.target.dataset.animated) {
                    animateCounter(entry.target.querySelector('h3'));
                    entry.target.dataset.animated = "true";
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(element => {
        observer.observe(element);
    });

    // --- 5. Animated Counters ---
    function animateCounter(element) {
        const targetStr = element.getAttribute('data-target');
        const isPlus = targetStr.includes('+');
        const targetValue = parseInt(targetStr.replace(/[^0-9]/g, ''));
        
        let start = 0;
        const duration = 2000; // 2 seconds
        const increment = targetValue / (duration / 16); // 60fps
        
        const updateCounter = () => {
            start += increment;
            if (start < targetValue) {
                element.innerText = Math.ceil(start) + (isPlus ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                element.innerText = targetStr;
            }
        };
        updateCounter();
    }

    // --- 6. Interactive "Add to Cart" Demo ---
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartBadge = document.querySelector('.cart-badge');
    let cartCount = 0;

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const originalText = this.innerHTML;
            
            // Animation state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
            this.style.backgroundColor = 'var(--primary)';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Added';
                this.style.backgroundColor = '#4CAF50';
                this.style.borderColor = '#4CAF50';
                
                // Update badge if exists
                if (cartBadge) {
                    cartCount++;
                    cartBadge.innerText = cartCount;
                    
                    // Add pop animation to badge
                    cartBadge.style.transform = 'scale(1.5)';
                    setTimeout(() => {
                        cartBadge.style.transform = 'scale(1)';
                    }, 300);
                }
                
                // Reset button after 2s
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.backgroundColor = '';
                    this.style.color = '';
                    this.style.borderColor = '';
                }, 2000);
                
            }, 800);
        });
    });

    // --- 7. Wishlist Toggle ---
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });
});
