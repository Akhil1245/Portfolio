// --- 1. SYSTEM LOADING ANIMATION ---
window.addEventListener('DOMContentLoaded', () => {
  const preloaderBar = document.getElementById('preloaderBar');
  const preloaderStatus = document.getElementById('preloaderStatus');
  const sysLoader = document.getElementById('sysLoader');

  let progress = 0;
  const statusMessages = [
    "Initializing neural pathways...",
    "Injecting interface modules...",
    "Securing communication logs...",
    "Compiling developer credentials...",
    "Establishing active diagnostic links..."
  ];

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      preloaderBar.style.width = '100%';
      preloaderStatus.textContent = "All systems operational.";
      setTimeout(() => {
        sysLoader.style.opacity = '0';
        sysLoader.style.visibility = 'hidden';
        // Initialize interactive animations once loader is gone
        initScrollAnimations();
        triggerCircularProgress();
      }, 600);
    } else {
      preloaderBar.style.width = `${progress}%`;
      const msgIndex = Math.min(Math.floor(progress / 20), statusMessages.length - 1);
      preloaderStatus.textContent = statusMessages[msgIndex];
    }
  }, 100);
});

// --- 2. CUSTOM CURSOR TRACKING & HOVER INTERACTIONS ---
const hqCursor = document.getElementById('hqCursor');
const hqCursorRing = document.getElementById('hqCursorRing');

document.addEventListener('mousemove', (e) => {
  const { clientX: x, clientY: y } = e;
  
  hqCursor.style.left = `${x}px`;
  hqCursor.style.top = `${y}px`;

  // Delayed following effect for cursor ring
  hqCursorRing.animate({
    left: `${x}px`,
    top: `${y}px`
  }, { duration: 100, fill: 'forwards' });
});

// Attach hover actions to interactive nodes
function refreshCursorInteractives() {
  const interactives = document.querySelectorAll('a, button, input, textarea, .skill-tab-btn, .skill-card-fancy, .project-card, .achievement-card, .cert-card');
  interactives.forEach(item => {
    item.addEventListener('mouseenter', () => hqCursorRing.classList.add('active'));
    item.addEventListener('mouseleave', () => hqCursorRing.classList.remove('active'));
  });
}
refreshCursorInteractives();

document.addEventListener('mousedown', () => hqCursorRing.classList.add('click'));
document.addEventListener('mouseup', () => hqCursorRing.classList.remove('click'));


// --- 3. DYNAMIC BACKGROUND PARTICLES CANVAS ---
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
let mouse = { x: null, y: null, radius: 100 };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 0.5;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = (Math.random() * 25) + 5;
    this.color = Math.random() > 0.5 ? '#00E5FF' : '#7C3AED';
    this.opacity = Math.random() * 0.4 + 0.1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fill();
    ctx.globalAlpha = 1.0;
  }

  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dxBase = this.x - this.baseX;
        this.x -= dxBase / 10;
      }
      if (this.y !== this.baseY) {
        let dyBase = this.y - this.baseY;
        this.y -= dyBase / 10;
      }
    }
  }
}

function initParticles() {
  particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 12), 120);
  for (let i = 0; i < particleCount; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    particles.push(new Particle(x, y));
  }
}
initParticles();
window.addEventListener('resize', initParticles);

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();


// --- 4. HERO SECTION TYPEWRITER EFFECT ---
const typewriterText = document.getElementById('typewriterText');
const roles = [
  "Software Engineer",
  "React Developer",
  "Python Developer",
  "Problem Solver",
  "Frontend Engineer",
  "Tech Leader"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typewriterText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentRole.length) {
    delay = 1800; // Keep full text visible for a bit
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400; // Pause before starting to type next word
  }

  setTimeout(typeEffect, delay);
}
setTimeout(typeEffect, 1200); // Initial delay after preloader completes


// --- 5. SCROLL PROGRESS & BACK TO TOP BUTTON ---
const scrollProgress = document.getElementById('scrollProgress');
const backToTopBtn = document.getElementById('backToTopBtn');

window.addEventListener('scroll', () => {
  const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (windowScroll / height) * 100;
  scrollProgress.style.width = `${scrolled}%`;

  if (windowScroll > 500) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


// --- 6. NAV NAVIGATION LINK CORRESPONDING ACTIVE UPDATE ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.hud-nav-links a');

window.addEventListener('scroll', () => {
  let currentActive = "";
  sections.forEach(sec => {
    const secTop = sec.offsetTop;
    const secHeight = sec.clientHeight;
    if (window.pageYOffset >= (secTop - 300)) {
      currentActive = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentActive}`) {
      link.classList.add('active');
    }
  });
});


// --- 7. MOBILE NAVIGATION OVERLAY TOGGLE ---
const mobileNavToggle = document.getElementById('mobileNavToggle');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileNavToggle.addEventListener('click', () => {
  mobileNavToggle.classList.toggle('active');
  mobileMenuOverlay.classList.toggle('open');
  // Toggle style changes for hamburger lines
  const lines = mobileNavToggle.querySelectorAll('span');
  if (mobileNavToggle.classList.contains('active')) {
    lines[0].style.transform = 'translateY(8px) rotate(45deg)';
    lines[1].style.opacity = '0';
    lines[2].style.transform = 'translateY(-8px) rotate(-45deg)';
  } else {
    lines[0].style.transform = 'none';
    lines[1].style.opacity = '1';
    lines[2].style.transform = 'none';
  }
});

mobileLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    mobileNavToggle.classList.remove('active');
    mobileMenuOverlay.classList.remove('open');
    const lines = mobileNavToggle.querySelectorAll('span');
    lines[0].style.transform = 'none';
    lines[1].style.opacity = '1';
    lines[2].style.transform = 'none';
  });
});


// --- 8. SKILLS PANEL SWITCHER & PROGRESS RING ANIMATION ---
const tabBtns = document.querySelectorAll('.skill-tab-btn');
const panels = document.querySelectorAll('.skill-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const targetPanelId = `skill-${btn.getAttribute('data-target')}`;
    const targetPanel = document.getElementById(targetPanelId);
    if (targetPanel) {
      targetPanel.classList.add('active');
      triggerCircularProgress();
      refreshCursorInteractives();
    }
  });
});

function triggerCircularProgress() {
  const activeCircles = document.querySelectorAll('.skill-panel.active .progress-ring__circle');
  activeCircles.forEach(circle => {
    const percent = parseFloat(circle.getAttribute('data-percent'));
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    // Trigger frame delay for smooth stroke fill animation
    setTimeout(() => {
      const offset = circumference - (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    }, 100);
  });
}


// --- 9. INTERACTIVE SCROLL REVEAL & DIAGNOSTIC PATHWAY TIMELINE ---
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.scroll-reveal');
  const expProgress = document.getElementById('experienceProgressLine');
  const expSection = document.getElementById('experience');

  const revealOnScroll = () => {
    reveals.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const revealPoint = 150;

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });

    // Check progress of timeline inside experience view
    if (expSection && expProgress) {
      const rect = expSection.getBoundingClientRect();
      const expHeight = expSection.clientHeight;
      const visibleOffset = window.innerHeight - rect.top;
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Compute percent completion in experience bounds
        let progressVal = (visibleOffset / (expHeight + visibleOffset)) * 100;
        progressVal = Math.min(Math.max(progressVal, 0), 100);
        expProgress.style.height = `${progressVal}%`;
      }
    }

    // Trigger active timeline cards and counter animations as they scroll in
    document.querySelectorAll('.timeline-block').forEach(block => {
      const top = block.getBoundingClientRect().top;
      if (top < window.innerHeight - 150) {
        block.classList.add('active');
      }
    });

    // Stats counter trigger
    document.querySelectorAll('.achievements-grid').forEach(grid => {
      const top = grid.getBoundingClientRect().top;
      if (top < window.innerHeight - 100 && !grid.classList.contains('counted')) {
        grid.classList.add('counted');
        triggerCounterNumbers();
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger initially in case page loaded scrolled down
}

function triggerCounterNumbers() {
  const counters = document.querySelectorAll('.ach-stat-val');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    let current = 0;
    const increment = target / 60; // 60fps animate over 1s
    
    const updateCounter = () => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
      } else {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      }
    };
    updateCounter();
  });
}


// --- 10. PROJECT LIVE PREVIEWS & SANDBOX LOGIC ---
const demoGA = document.getElementById('launchDemoGA');
const demoNF = document.getElementById('launchDemoNF');

if (demoGA) {
  demoGA.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Injected Sandbox Environment -- Gram Arogya AI System Interface Mock:\n\n[+] Establishing database clusters... Done\n[+] Connecting Symptom predicting neural networks... Done\n[+] Serving rural community nodes... Active");
  });
}

if (demoNF) {
  demoNF.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Injected Sandbox Environment -- NeoFlix Movie Hub Interface Mock:\n\n[+] Initializing streaming buffer pipelines... Active\n[+] Compiling adaptive dark CSS UI modules... Connected\n[+] Device view width matching sandbox scale: 100% OK");
  });
}


// --- 11. SECURE CONTACT FORM ACTION & LOCAL STORAGE LOGGER ---
const secureContactForm = document.getElementById('secureContactForm');
const formSuccessOverlay = document.getElementById('formSuccessOverlay');
const dismissSuccessBtn = document.getElementById('dismissSuccessBtn');

if (secureContactForm) {
  secureContactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const senderName = document.getElementById('senderName').value;
    const senderEmail = document.getElementById('senderEmail').value;
    const senderMessage = document.getElementById('senderMessage').value;

    const loggedMessage = {
      name: senderName,
      email: senderEmail,
      message: senderMessage,
      timestamp: new Date().toISOString()
    };

    // Store log to browser Local Storage to act as contact list cache
    let currentQueue = JSON.parse(localStorage.getItem('ma_contact_uplinks') || '[]');
    currentQueue.push(loggedMessage);
    localStorage.setItem('ma_contact_uplinks', JSON.stringify(currentQueue));

    // Animate successful uplink message transmission
    formSuccessOverlay.classList.add('show');
  });
}

if (dismissSuccessBtn) {
  dismissSuccessBtn.addEventListener('click', () => {
    formSuccessOverlay.classList.remove('show');
    if (secureContactForm) {
      secureContactForm.reset();
      // Shrink input labels back down
      const labels = secureContactForm.querySelectorAll('.console-label-text');
      labels.forEach(label => label.removeAttribute('style'));
    }
  });
}
