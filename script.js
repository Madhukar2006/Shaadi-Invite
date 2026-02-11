// ================================
// LOADING SCREEN
// ================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const enterBtn = document.getElementById('enter-btn');
    const audio = document.getElementById('wedding-music');

    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 2000);
        }).catch(error => {
            enterBtn.classList.add('visible');
            document.querySelector('.loader-wrapper').style.display = 'none';
            document.querySelector('.loader-text').innerText = "TAP TO BEGIN";
        });
    }

    enterBtn.addEventListener('click', () => {
        audio.play();
        loadingScreen.classList.add('hidden');
        musicControl.innerHTML = '<i class="fas fa-pause"></i>';
        musicControl.classList.add('playing');
        isPlaying = true;
    });
});

// ================================
// MUSIC PLAYER
// ================================
const musicControl = document.getElementById('music-control');
const weddingMusic = document.getElementById('wedding-music');
let isPlaying = false;

musicControl.addEventListener('click', () => {
    if (isPlaying) {
        weddingMusic.pause();
        musicControl.innerHTML = '<i class="fas fa-play"></i>';
        musicControl.classList.remove('playing');
    } else {
        weddingMusic.play().catch(e => console.log('Audio play failed:', e));
        musicControl.innerHTML = '<i class="fas fa-pause"></i>';
        musicControl.classList.add('playing');
    }
    isPlaying = !isPlaying;
});

// ================================
// FLOATING NINJA LEAVES
// ================================
const leafEmojis = ['🍃', '🍂', '🌿', '🍁'];

function createLeaf() {
    const leavesContainer = document.getElementById('leaves-container');
    const leaf = document.createElement('div');
    leaf.classList.add('ninja-leaf');
    
    leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.animationDuration = (Math.random() * 5 + 10) + 's';
    leaf.style.animationDelay = Math.random() * 5 + 's';
    
    leavesContainer.appendChild(leaf);
    
    setTimeout(() => {
        leaf.remove();
    }, 15000);
}

// Create initial leaves
for (let i = 0; i < 15; i++) {
    setTimeout(createLeaf, i * 500);
}
setInterval(createLeaf, 2000);

// ================================
// COUNTDOWN TIMER
// ================================
const weddingDate = new Date('February 23, 2034 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        document.getElementById('countdown-timer').innerHTML = '<div class="countdown-value" style="font-size: 2rem;">Mission Complete! 🍥❤️</div>';
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ================================
// LANGUAGE TOGGLE
// ================================
const langButtons = document.querySelectorAll('.lang-btn');
let currentLang = 'en';

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        if (lang === currentLang) return;
        
        currentLang = lang;
        
        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        translatePage(lang);
    });
});

function translatePage(lang) {
    document.querySelectorAll('[data-en]').forEach(element => {
        if (element.hasAttribute(`data-${lang}`)) {
            const translation = element.getAttribute(`data-${lang}`);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else if (element.innerHTML.includes('<')) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = translation;
                element.childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        node.textContent = tempDiv.textContent;
                    }
                });
            } else {
                element.textContent = translation;
            }
        }
    });
}

// ================================
// RSVP FORM
// ================================
const rsvpForm = document.getElementById('rsvp-form');
const successMessage = document.getElementById('success-message');
const whatsappButton = document.getElementById('whatsapp-rsvp');

rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    rsvpForm.style.display = 'none';
    successMessage.classList.add('show');
    
    setTimeout(() => {
        rsvpForm.style.display = 'block';
        successMessage.classList.remove('show');
        rsvpForm.reset();
    }, 3000);
});

whatsappButton.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('guest-name').value || 'Shinobi';
    const count = document.getElementById('guest-count').value || '1';
    const message = document.getElementById('guest-message').value || 'Ready for the mission!';
    
    const whatsappMessage = `Hello! I'm ${name} and I'd like to confirm attendance for ${count} shinobi to Naruto & Hinata's wedding. ${message} Believe it!`;
    const whatsappUrl = `https://wa.me/na?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
});

// ================================
// SCROLL REVEAL ANIMATION
// ================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ================================
// SMOOTH SCROLL FOR LINKS
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
