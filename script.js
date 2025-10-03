document.addEventListener('DOMContentLoaded', function () {
    /* ---------------- ICON CYCLE ---------------- */
    const icons = document.querySelectorAll('.icon-cycle .icon');
    const bgColors = ['#d6ff2a', '#4285f4', '#ffb6ea'];
    let current = 0;

    function showIcon(idx) {
        icons.forEach((icon, i) => {
            icon.classList.toggle('active', i === idx);
            const bg = icon.querySelector('.icon-bg');
            if (bg) bg.style.background = bgColors[i];
        });
    }

    setInterval(() => {
        current = (current + 1) % icons.length;
        showIcon(current);
    }, 1800);

    showIcon(current);

    /* ---------------- SKILLS TERMINAL ---------------- */
    const lines = document.querySelectorAll('.terminal-body > *');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lines.forEach((line, index) => {
                    setTimeout(() => {
                        line.classList.add('visible');
                        if (index === lines.length - 1) {
                            line.classList.add('cursor');
                        }
                    }, index * 400);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const skillsSection = document.querySelector('.terminal-body');
    observer.observe(skillsSection);
});

document.addEventListener('scroll', () => {
    const terminal = document.querySelector('.terminal-window');
    if (!terminal) return;

    const rect = terminal.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    
    const visibleRatio = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0), 1);

    
    const scale = 0.6 + visibleRatio * 1.0;
    terminal.style.transform = `scale(${scale})`;
    terminal.style.transition = "transform 0.25s ease-out";
});







document.addEventListener('DOMContentLoaded', function () {

    /* ---------------- BACKGROUND DOTS ANIMATION ---------------- */
    const dotsContainer = document.querySelector('.background-dots-container');
    if (dotsContainer) {
        const numberOfDots = 150;
        const parallaxStrength = 30;
        const dots = [];

        for (let i = 0; i < numberOfDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot-particle');

            const size = Math.random() * 5 + 2;
            dot.style.width = `${size}px`;
            dot.style.height = `${size}px`;
            dot.style.left = `${Math.random() * 100}vw`;
            dot.style.top = `${Math.random() * 100}vh`;
            dot.style.opacity = Math.random() * 0.5 + 0.2;

            dotsContainer.appendChild(dot);


            dots.push({
                elem: dot,

                xWaveSpeed: (Math.random() - 0.5) * 0.5,
                yWaveSpeed: (Math.random() - 0.5) * 0.7,
                xWaveAmplitude: Math.random() * 15 + 10,
                yWaveAmplitude: Math.random() * 20 + 15,

                depthFactor: Math.random() * 0.8 + 0.2,
            });
        }

        let mouseX = 0;
        let mouseY = 0;


        function animateDots(time) {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const offsetX = (mouseX - centerX) / centerX;
            const offsetY = (mouseY - centerY) / centerY;

            dots.forEach(dotInfo => {

                const selfMoveX = Math.sin(time * 0.0001 * dotInfo.xWaveSpeed) * dotInfo.xWaveAmplitude;
                const selfMoveY = Math.cos(time * 0.0001 * dotInfo.yWaveSpeed) * dotInfo.yWaveAmplitude;


                const parallaxMoveX = -offsetX * parallaxStrength * dotInfo.depthFactor;
                const parallaxMoveY = -offsetY * parallaxStrength * dotInfo.depthFactor;


                const finalX = selfMoveX + parallaxMoveX;
                const finalY = selfMoveY + parallaxMoveY;

                dotInfo.elem.style.transform = `translate(${finalX}px, ${finalY}px)`;
            });

            requestAnimationFrame(animateDots);
        }

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        
        requestAnimationFrame(animateDots);
    }
});







// document.addEventListener('DOMContentLoaded', () => {
//     const skillsSection = document.querySelector('.skills-terminal-section');
//     const interactiveImageContainer = document.querySelector('.interactive-image-container');

//     if (skillsSection && interactiveImageContainer) {
//         const baseTransform = 'translate(-60%, -50%) rotateY(-15deg) rotateX(5deg)'; 
//         const initialOffsetY = 200; 

//         const updateImagePosition = () => {
//             const sectionRect = skillsSection.getBoundingClientRect();
//             const viewportHeight = window.innerHeight;

            
//             const animationStartPoint = sectionRect.bottom - (viewportHeight * 0.2);
            
//             const animationEndPoint = sectionRect.top;

//             let progress = 0;

//             if (viewportHeight > 0) {
                
//                 progress = 1 - (animationStartPoint - viewportHeight) / (animationStartPoint - animationEndPoint);
//                 progress = Math.min(1, Math.max(0, progress)); 
//             }

            
//             const currentOffsetY = initialOffsetY * (1 - progress);

            
//             interactiveImageContainer.style.transform = `${baseTransform} translateY(${currentOffsetY}px)`;
//         };

        
//         window.addEventListener('scroll', updateImagePosition);

        
//         updateImagePosition();
//     }
// });




// upar ka mt chedo all clear














document.addEventListener('DOMContentLoaded', () => {
    const wavyText = document.querySelector('.wavy-text');
    if (!wavyText) return;

    const textContent = wavyText.textContent;
    
    // Split the text into an array of characters, creating a span for each
    const letters = textContent.split('').map(char => {
        if (char === ' ') {
            return `<span>&nbsp;</span>`;
        }
        return `<span>${char}</span>`;
    }).join('');
    
    // Replace the original text with the new spans
    wavyText.innerHTML = letters;
    
    // Apply a forward staggered animation delay to each span
    const spans = wavyText.querySelectorAll('span');
    spans.forEach((span, index) => {
        // The delay now starts from the beginning (index 0)
        span.style.animationDelay = `${index * 50}ms`;
    });

    // --- Intersection Observer to trigger animation on every scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is intersecting the viewport (visible)
            if (entry.isIntersecting) {
                // Add the .animate class to trigger the CSS animation
                entry.target.classList.add('animate');
            } else {
                // If it's not visible, remove the class to reset the animation
                entry.target.classList.remove('animate');
            }
        });
    }, {
        threshold: 0.5 // Triggers when 50% of the element is visible
    });

    // Start observing the .wavy-text element
    observer.observe(wavyText);
});









document.addEventListener('DOMContentLoaded', () => {
    const targetElement = document.querySelector('.wavy-text'); // Or whatever element you want
    const glassCursor = document.getElementById('glass-cursor');

    if (!targetElement || !glassCursor) return;

    // Update cursor position using CSS variables for better performance
    window.addEventListener('mousemove', (e) => {
        glassCursor.style.setProperty('--x', e.clientX + 'px');
        glassCursor.style.setProperty('--y', e.clientY + 'px');
    });

    // When mouse enters the target element
    targetElement.addEventListener('mouseenter', () => {
        glassCursor.classList.add('active');
    });

    // When mouse leaves the target element
    targetElement.addEventListener('mouseleave', () => {
        glassCursor.classList.remove('active');
    });
});








document.addEventListener('DOMContentLoaded', () => {
    /* ---------------- INTERACTIVE IMAGES PARALLAX SCROLL ---------------- */
    const skillsSection = document.querySelector('.skills-terminal-section');
    const leftImageContainer = document.querySelector('#left-interactive-image');
    const rightImageContainer = document.querySelector('#right-interactive-image');

    if (skillsSection && (leftImageContainer || rightImageContainer)) {
        // --- UPDATE THIS LINE TO MATCH THE CSS ---
        const baseTransformLeft = 'translateX(-75%) translateY(-50%) rotateY(15deg) rotateX(-5deg)';
        const baseTransformRight = 'translateX(75%) translateY(-50%) rotateY(-15deg) rotateX(5deg)'; 

        const initialOffsetY = 200;

        const updateImagePosition = () => {
            const sectionRect = skillsSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            const animationStartPoint = sectionRect.bottom - (viewportHeight * 0.2);
            const animationEndPoint = sectionRect.top;

            let progress = 0;

            if (viewportHeight > 0) {
                progress = 1 - (animationStartPoint - viewportHeight) / (animationStartPoint - animationEndPoint);
                progress = Math.min(1, Math.max(0, progress));
            }

            const currentOffsetY = initialOffsetY * (1 - progress);

            if (leftImageContainer) {
                leftImageContainer.style.transform = `${baseTransformLeft} translateY(${currentOffsetY}px)`;
            }
            if (rightImageContainer) {
                rightImageContainer.style.transform = `${baseTransformRight} translateY(${currentOffsetY}px)`;
            }
        };

        window.addEventListener('scroll', updateImagePosition);
        updateImagePosition();
    }
});