document.addEventListener('contextmenu', event => event.preventDefault()); /* disabled right click */

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
    if (skillsSection) {
        observer.observe(skillsSection);
    }

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

    /* ---------------- INTERACTIVE IMAGES PARALLAX SCROLL ---------------- */
    const skillsTerminalSection = document.querySelector('.skills-terminal-section');
    const leftImageContainer = document.querySelector('#left-interactive-image');
    const rightImageContainer = document.querySelector('#right-interactive-image');

    if (skillsTerminalSection && (leftImageContainer || rightImageContainer)) {
        const baseTransformLeft = 'translateX(-75%) translateY(-50%) rotateY(15deg) rotateX(-5deg)';
        const baseTransformRight = 'translateX(75%) translateY(-50%) rotateY(-15deg) rotateX(5deg)';
        const initialOffsetY = 200;

        const updateImagePosition = () => {
            const sectionRect = skillsTerminalSection.getBoundingClientRect();
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

    /* ---------------- 3D INTERACTIVE TILT EFFECT ANIMATION ---------------- */
    const parentSection = document.querySelector('.image-showcase-section');
    const imageContainer = document.querySelector('.image-showcase-section .image-container');
    if (parentSection && imageContainer) {
        const tiltIntensity = 15;
        let animationFrameId = null;
        parentSection.addEventListener('mousemove', (e) => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            animationFrameId = requestAnimationFrame(() => {
                const rect = imageContainer.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const rotateY = (x / (rect.width / 2)) * tiltIntensity;
                const rotateX = -(y / (rect.height / 2)) * tiltIntensity;
                imageContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        });
        parentSection.addEventListener('mouseleave', () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            imageContainer.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }

    /* ---------------- PROFILE CARD 3D TILT EFFECT ---------------- */
    const card = document.querySelector('.card');
    if (card) {
        const cardText = document.querySelector('.card-text-wrapper');
        const cardImage = document.querySelector('.main-portrait'); // Targeting main portrait now
        const intensity = 20;
        const parallaxIntensity = 8;
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateY = (x / (rect.width / 2)) * intensity;
            const rotateX = -(y / (rect.height / 2)) * intensity;
            const parallaxX = -(x / (rect.width / 2)) * parallaxIntensity;
            const parallaxY = -(y / (rect.height / 2)) * parallaxIntensity;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            if (cardText) cardText.style.transform = `translateX(${parallaxX}px) translateY(${parallaxY}px)`;
            if (cardImage) cardImage.style.transform = `translateX(${parallaxX * 0.7}px) translateY(${parallaxY * 0.7}px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            if (cardText) cardText.style.transform = 'translateX(0) translateY(0)';
            if (cardImage) cardImage.style.transform = 'translateX(0) translateY(0)';
        });
    }
});

const cardWrapper = document.querySelector('.card-transform-wrapper');

if (cardWrapper) {
    const card = cardWrapper.querySelector('.card');
    const cardText = card.querySelector('.card-text-wrapper');
    const cardImage = card.querySelector('.main-portrait');
    const intensity = 20;
    const parallaxIntensity = 8;

    cardWrapper.addEventListener('mousemove', (e) => {
        const rect = cardWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotateY = (x / (rect.width / 2)) * intensity;
        const rotateX = -(y / (rect.height / 2)) * intensity;
        const parallaxX = -(x / (rect.width / 2)) * parallaxIntensity;
        const parallaxY = -(y / (rect.height / 2)) * parallaxIntensity;

        if (card) card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        if (cardText) cardText.style.transform = `translateX(${parallaxX}px) translateY(${parallaxY}px)`;
        if (cardImage) cardImage.style.transform = `translateX(${parallaxX * 0.7}px) translateY(${parallaxY * 0.7}px)`;
    });

    cardWrapper.addEventListener('mouseleave', () => {
        if (card) card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        if (cardText) cardText.style.transform = 'translateX(0) translateY(0)';
        if (cardImage) cardImage.style.transform = 'translateX(0) translateY(0)';
    });
}




/* ---------------- TERMINAL SCALING ON SCROLL ---------------- */
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

/* ---------------- "GET TO WORK" SECTION FADE-IN ANIMATION ---------------- */
const getToWorkSection = document.querySelector('.get-to-work-section');
if (getToWorkSection) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.45
    });
    sectionObserver.observe(getToWorkSection);
}








document.addEventListener('DOMContentLoaded', function () {
    

    /* ---------------- DRAGGABLE IMAGE STACK (RE-STACKING LOGIC) ---------------- */
    const imageStack = document.querySelector('.RushHour-image');
    
    if (imageStack) {
        let isDragging = false;
        let activeCard = null;
        let startX, startY, posX, posY;

        function dragStart(e) {
            const topCard = imageStack.querySelector('.image-card:last-child');
            if (e.target.closest('.image-card') !== topCard) return;

            activeCard = topCard;
            isDragging = true;
            activeCard.classList.add('is-dragging');
            activeCard.style.transition = 'none'; 

            startX = e.pageX || e.touches[0].pageX;
            startY = e.pageY || e.touches[0].pageY;
        }

        function dragMove(e) {
            if (!isDragging || !activeCard) return;
            e.preventDefault();

            const currentX = e.pageX || e.touches[0].pageX;
            const currentY = e.pageY || e.touches[0].pageY;
            
            posX = currentX - startX;
            posY = currentY - startY;

    
            activeCard.style.transform = `translate(${posX}px, ${posY}px) rotate(${posX * 0.05}deg)`;
        }

        function dragEnd(e) {
            if (!isDragging || !activeCard) return;
            isDragging = false;
            activeCard.classList.remove('is-dragging');
            
           
            activeCard.style.transition = 'transform 0.4s ease-out';
            
            const dragThreshold = activeCard.offsetWidth * 0.5; 

            if (Math.abs(posX) > dragThreshold) {
                
                imageStack.prepend(activeCard);
            }

            
            activeCard.style.transform = '';
            
            activeCard = null; 
        }

       
        imageStack.addEventListener('mousedown', dragStart);
        imageStack.addEventListener('touchstart', dragStart, { passive: true });
        
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('touchmove', dragMove, { passive: false });

        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchend', dragEnd);
    }
});







/* ---------------- THEME TOGGLE ---------------- */
    const themeToggleButton = document.getElementById('theme-toggle');
    const lightThemeLink = document.createElement('link');
    lightThemeLink.rel = 'stylesheet';
    lightThemeLink.id = 'light-theme-style';
    lightThemeLink.href = 'light-styles.css'; 

    
    const setTheme = (theme) => {
        if (theme === 'light') {
            document.head.appendChild(lightThemeLink);
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            if (document.getElementById('light-theme-style')) {
                document.head.removeChild(lightThemeLink);
            }
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    
    themeToggleButton.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    });

    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        
        setTheme('dark');
    }




/* ---------------- MUSIC PLAYER ---------------- */
    document.addEventListener('DOMContentLoaded', (event) => {

    const playlist = [
        {
            title: "Comethru",
            artist: "Jeremy Zucker",
            audioSrc: "audio/track1.mp3",
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/6638e53c-d780-4c0d-ab33-37a33a86ec78/comethrualnumcover.jpg"
        },
        {
            title: "Ordinary",
            artist: "Alex Warren",
            audioSrc: "audio/track2.mp3",
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/cc49ae98-7fe0-4577-aa52-182f42de1c76/ab67616d00001e0242fe69c0e7e5c92f01ece8ce.jpeg"
        },
        {
            title: "I Warned Myself",
            artist: "Charlie Puth",
            audioSrc: "audio/track3.mp3",
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/bea1ea1f-fd03-4c22-b5cf-13c647b584b4/1200x630bf60.jpg"
        },
        {
            title: "I Like Me Better",
            artist: "Lauv",
            audioSrc: "audio/track4.mp3",
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/ee615889-0d08-497b-a387-35a7af980c51/ILikeMeBetterEnglish201720191202143751500x500.jpg"
        },
        {
            title: "Monster",
            artist: "Justin Bieber & Shawn Mendes",
            audioSrc: "audio/track5.mp3",
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/d0f97bfc-35c7-4956-aa42-ffe42aabe1dd/Shawn_Mendes_and_Justin_Bieber__Monster.png"
        },
        {
            title: "Espresso",
            artist: "Sabrina Carpenter",
            audioSrc: "audio/track6.mp3",
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/ecde8135-1763-407b-9d0b-33f00bb3b63a/EspressoEnglish202420240412064803500x500.jpg"
        },
        {
            title: "Beautiful Things",
            artist: "Benson Boone",
            audioSrc: "audio/track7.mp3",
            albumArtSrc: "https://hdbc7y0gj1.ucarecd.net/eebc269f-3937-496e-95d2-6d21c4299792/beautifulthingalbumcover.jpeg"
        },
        {
            title: "Living Hell",
            artist: "Bella Poarch",
            audioSrc: "audio/track8.mp3",
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/ef31e45c-3fb0-4278-acc1-1f7333e5659c/DollsEPEnglish202220220809070445500x500.jpg"
        },
        {
            title: "Worth It",
            artist: "Fifth Harmony ft. Kid Ink",
            audioSrc: "audio/track9.mp3",
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/48a1b16a-0f36-43e1-8123-6fe9dfb1a4f9/WorthItEnglish2015500x500.jpg"
        },
        {
            title: "7 rings",
            artist: "Ariana Grande",
            audioSrc: "audio/track10.mp3",
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/36c43b18-5107-428c-90b5-787e135b9a78/thankunextEnglish201920231215000717500x500.jpg"
        },
        {
            title: "Hey Mama",
            artist: "David Guetta",
            audioSrc: "audio/track11.mp3",
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/91c03e11-ecb6-4497-828f-4eb1361918e4/0e5ce9fa46148e0464e3376d2d060f11.jpg"
        }
    ];

    let currentTrackIndex = 0;
    let isShuffling = false;

    const audioPlayer = document.getElementById('audio-player');
    const playPauseButton = document.getElementById('play-pause-button');
    const playPauseIcon = document.getElementById('play-pause-icon');
    const progressBar = document.getElementById('progress-bar');
    const shuffleButton = document.getElementById('shuffle-button');
    const loopButton = document.getElementById('loop-button');
    const nextButton = document.getElementById('next-button');
    const previousButton = document.getElementById('previous-button');
    const playerContainer = document.querySelector('.music-player-container');
    const toggleButton = document.getElementById('player-toggle-button');

    
    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    };

    const loadTrack = (index) => {
        const track = playlist[index];

        document.getElementById('track-title').textContent = track.title;
        document.getElementById('track-artist').textContent = track.artist;
        document.querySelector('.album-art').src = track.albumArtSrc;

        audioPlayer.src = track.audioSrc;
        audioPlayer.load();

        playPauseIcon.src = 'img/play.svg';
    };

    const playNextTrack = () => {
        if (isShuffling) {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * playlist.length);
            } while (newIndex === currentTrackIndex);
            currentTrackIndex = newIndex;
        } else {
            currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        }
        loadTrack(currentTrackIndex);
        audioPlayer.play();
        playPauseIcon.src = 'img/pause.svg';
    };

    const playPreviousTrack = () => {
        if (isShuffling) {
            playNextTrack();
        } else {
            if (audioPlayer.currentTime > 3) {
                audioPlayer.currentTime = 0;
            } else {
                currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
                loadTrack(currentTrackIndex);
            }
        }
        audioPlayer.play();
        playPauseIcon.src = 'img/pause.svg';
    };

    loadTrack(currentTrackIndex);


    if (toggleButton && playerContainer) {
        toggleButton.addEventListener('click', () => {
            const isOpen = playerContainer.classList.toggle('is-open');
            toggleButton.setAttribute('aria-expanded', isOpen);
        });
    }

 
    if (audioPlayer && playPauseButton) {
        playPauseButton.addEventListener('click', () => {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playPauseIcon.src = 'img/pause.svg';
            } else {
                audioPlayer.pause();
                playPauseIcon.src = 'img/play.svg';
            }
        });
    }

 
    if (nextButton) {
        nextButton.addEventListener('click', playNextTrack);
    }

    if (previousButton) {
        previousButton.addEventListener('click', playPreviousTrack);
    }

 
    if (shuffleButton) {
        shuffleButton.addEventListener('click', () => {
            isShuffling = !isShuffling;
            shuffleButton.classList.toggle('active', isShuffling);
        });
    }

  
    if (loopButton) {
        loopButton.addEventListener('click', () => {
            audioPlayer.loop = !audioPlayer.loop;
            loopButton.classList.toggle('active', audioPlayer.loop);
        });
    }

    
    audioPlayer.onloadedmetadata = () => {
        if (!isNaN(audioPlayer.duration)) {
            progressBar.max = audioPlayer.duration;
        }
    };

    
    audioPlayer.ontimeupdate = () => {
        if (!isNaN(audioPlayer.duration)) {
            progressBar.value = audioPlayer.currentTime;
        }
    };

    
    progressBar.addEventListener('input', () => {
        audioPlayer.currentTime = progressBar.value;
    });


    audioPlayer.addEventListener('ended', () => {
        if (!audioPlayer.loop) {
            playNextTrack();
        }
    });
});