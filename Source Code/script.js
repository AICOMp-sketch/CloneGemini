document.addEventListener('DOMContentLoaded', () => {
            // Mobile Navigation Toggle
            const hamburger = document.querySelector('.hamburger-menu');
            const navLinks = document.querySelector('.nav-links');

            if (hamburger && navLinks) {
                hamburger.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                    hamburger.querySelector('i').classList.toggle('fa-bars');
                    hamburger.querySelector('i').classList.toggle('fa-times'); // Change icon
                });

                // Close nav when a link is clicked (for smooth scroll)
                navLinks.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        if (navLinks.classList.contains('active')) {
                            navLinks.classList.remove('active');
                            hamburger.querySelector('i').classList.remove('fa-times');
                            hamburger.querySelector('i').classList.add('fa-bars');
                        }
                    });
                });
            }


            // FAQ Accordion
            const accordionHeaders = document.querySelectorAll('.accordion-header');

            accordionHeaders.forEach(header => {
                header.addEventListener('click', () => {
                    const currentContent = header.nextElementSibling;
                    const isOpen = currentContent.classList.contains('open');

                    // Close all other open accordions
                    document.querySelectorAll('.accordion-content.open').forEach(content => {
                        if (content !== currentContent) {
                            content.classList.remove('open');
                            content.previousElementSibling.classList.remove('active');
                            content.style.maxHeight = null; // Reset max-height
                        }
                    });

                    // Toggle current accordion
                    if (!isOpen) {
                        currentContent.classList.add('open');
                        header.classList.add('active');
                        currentContent.style.maxHeight = currentContent.scrollHeight + 'px'; // Set max-height to scrollHeight
                    } else {
                        currentContent.classList.remove('open');
                        header.classList.remove('active');
                        currentContent.style.maxHeight = null; // Collapse by setting to null
                    }
                });
            });

            // Simple scroll animation for sections (optional, but enhances feel)
            const sections = document.querySelectorAll('main section');
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const sectionObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                        // observer.unobserve(entry.target); // Uncomment to animate only once
                    } else {
                        // Optional: Reset state when out of view, for re-animation on scroll back
                        entry.target.style.opacity = 0;
                        entry.target.style.transform = 'translateY(20px)';
                    }
                });
            }, observerOptions);

            sections.forEach(section => {
                section.style.opacity = 0;
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                sectionObserver.observe(section);
            });

            // Special animation for hero image (already handled by CSS animation in HTML for initial load)
            const heroImage = document.querySelector('.hero-image-placeholder');
            if (heroImage) {
                // You could add more complex JS animations here if needed,
                // but the CSS 'fadeInSlideUp' is simple and effective.
            }
        });