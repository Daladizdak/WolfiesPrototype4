document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
    
    // Countdown timer for Open Day
    const countdownDate = new Date('March 15, 2025 09:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update the DOM
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // If countdown is finished
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }
    
    // Initial call to prevent delay
    updateCountdown();
    // Update every second
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });
    
    // Testimonial slider functionality
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    // Initialize testimonial display
    showTestimonial(currentTestimonial);
    
    // Previous testimonial button
    prevButton.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    // Next testimonial button
    nextButton.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    // Auto-rotate testimonials every 7 seconds
    setInterval(function() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 7000);
    
    // FAQ Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const icon = item.querySelector('.accordion-icon i');
        
        header.addEventListener('click', function() {
            // Toggle active class on clicked item
            item.classList.toggle('active');
            
            // Adjust content height
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.classList.replace('fa-plus', 'fa-minus');
            } else {
                content.style.maxHeight = '0';
                icon.classList.replace('fa-minus', 'fa-plus');
            }
            
            // Close other open items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = '0';
                    otherItem.querySelector('.accordion-icon i').classList.replace('fa-minus', 'fa-plus');
                }
            });
        });
    });
    
    // Special requirements toggle
    const specialRequirementsCheckbox = document.getElementById('specialRequirements');
    const specialRequirementsDetails = document.querySelector('.special-requirements-details');
    
    specialRequirementsCheckbox.addEventListener('change', function() {
        if (this.checked) {
            specialRequirementsDetails.classList.remove('hidden');
        } else {
            specialRequirementsDetails.classList.add('hidden');
        }
    });
    
    // Form submission handling
    const openDayForm = document.getElementById('openDayForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const closeModalButton = document.getElementById('closeModal');
    
    openDayForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const studyLevel = document.getElementById('studyLevel').value;
        const subjectInterest = document.getElementById('subjectInterest').value;
        const termsAgree = document.getElementById('termsAgree').checked;
        
        if (!fullName || !email || !studyLevel || !subjectInterest || !termsAgree) {
            alert('Please fill in all required fields marked with *');
            return;
        }
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // In a real application, you would send form data to server here
        // For this example, we'll just show the success modal
        successModal.style.display = 'block';
        
        // Reset form
        openDayForm.reset();
        specialRequirementsDetails.classList.add('hidden');
    });
    
    // Close modal when X is clicked
    closeModalBtn.addEventListener('click', function() {
        successModal.style.display = 'none';
    });
    
    // Close modal when close button is clicked
    closeModalButton.addEventListener('click', function() {
        successModal.style.display = 'none';
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });
    
    // Add scroll animation for elements
    const scrollElements = document.querySelectorAll('.section');
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
        );
    }
    
    function handleScrollAnimation() {
        scrollElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('animate');
            }
        });
    }
    
    // Initial check on page load
    window.addEventListener('load', handleScrollAnimation);
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Back to top button functionality (add this element in HTML or create via JS)
    const body = document.querySelector('body');
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.classList.add('back-to-top');
    backToTopBtn.style.display = 'none';
    body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});