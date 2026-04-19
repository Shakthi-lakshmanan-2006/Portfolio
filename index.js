/* =============== TYPING EFFECT =============== */
const roles = [
  "Scalable Systems.",
  "Web Applications.",
  "Cloud Architecture.",
  "Real-World Solutions."
];

const typingText = document.getElementById("typing-text");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Typing speeds
const typingSpeed = 100;
const deletingSpeed = 50;
const holdTime = 2000;

function typeEffect() {
  if (!typingText) return;
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      setTimeout(() => isDeleting = true, holdTime);
      return;
    }
  } else {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  
  setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
  typeEffect();
});

/* =============== HEADER SCROLL EFFECT =============== */
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/* =============== CUSTOM CURSOR =============== */
const cursor = document.getElementById("cursor");
const cursorBlur = document.getElementById("cursor-blur");

document.addEventListener("mousemove", (e) => {
  if (!cursor || !cursorBlur) return;
  
  // Custom cursor position
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  
  // Blur follows a bit slower
  cursorBlur.animate({
    left: `${e.clientX}px`,
    top: `${e.clientY}px`
  }, { duration: 500, fill: "forwards" });
});

// Hover effect on links
const links = document.querySelectorAll("a, button, .project-card, .cert-card, .social-icons a");
links.forEach(link => {
  link.addEventListener("mouseenter", () => {
    cursor.style.width = "40px";
    cursor.style.height = "40px";
    cursor.style.backgroundColor = "rgba(0, 229, 255, 0.1)";
  });
  link.addEventListener("mouseleave", () => {
    cursor.style.width = "20px";
    cursor.style.height = "20px";
    cursor.style.backgroundColor = "transparent";
  });
});

/* =============== SCROLL REVEAL (INTERSECTION OBSERVER) =============== */
const revealElements = document.querySelectorAll('.reveal-bottom, .reveal-left, .reveal-right');

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("active");
    observer.unobserve(entry.target); // Observers only once
  });
}, revealOptions);

revealElements.forEach(el => {
  revealOnScroll.observe(el);
});

/* =============== INTERACTIVE CANVAS BACKGROUND (PARTICLES) =============== */
const canvas = document.getElementById("bg-canvas");
const ctx = canvas ? canvas.getContext("2d") : null;

if (canvas && ctx) {
  let particlesArray = [];
  let w, h;

  function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Mouse position
  let mouse = { x: null, y: null, radius: 150 };
  
  window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
  });

  class Particle {
    constructor(x, y, dx, dy, size) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.size = size;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = (Math.random() * 30) + 1;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 229, 255, 0.5)';
      ctx.fill();
    }
    
    update() {
      // Connect to mouse interactions but only lightly
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouse.radius) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (mouse.radius - distance) / mouse.radius;
        const directionX = forceDirectionX * force * this.density;
        const directionY = forceDirectionY * force * this.density;
        
        this.x -= directionX;
        this.y -= directionY;
      } else {
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX;
          this.x -= dx / 20;
        }
        if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy / 20;
        }
      }

      // Normal movement
      this.baseX += this.dx;
      this.baseY += this.dy;

      // Wrap around edges
      if (this.baseX > w) this.baseX = 0;
      if (this.baseX < 0) this.baseX = w;
      if (this.baseY > h) this.baseY = 0;
      if (this.baseY < 0) this.baseY = h;

      this.x = this.baseX;
      this.y = this.baseY;

      this.draw();
    }
  }

  function init() {
    particlesArray = [];
    let numberOfParticles = (w * h) / 10000;
    // Cap particle limit for performance
    if (numberOfParticles > 150) numberOfParticles = 150;
    
    for (let i = 0; i < numberOfParticles; i++) {
      let size = (Math.random() * 2) + 0.5;
      let x = Math.random() * innerWidth;
      let y = Math.random() * innerHeight;
      let dx = (Math.random() * 0.4) - 0.2;
      let dy = (Math.random() * 0.4) - 0.2;
      particlesArray.push(new Particle(x, y, dx, dy, size));
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
    connect();
  }

  function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
          + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
        
        if (distance < (w/10) * (h/10)) {
          opacityValue = 1 - (distance / 20000);
          ctx.strokeStyle = `rgba(157, 78, 221, ${opacityValue * 0.2})`; // Secondary color lines
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].x);
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  init();
  animate();
}

/* =============== MOBILE MENU TOGGLE =============== */
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn && nav) {
  mobileMenuBtn.addEventListener('click', () => {
    // A simple toggle logic for mobile if expanded upon later
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '100%';
    nav.style.left = '0';
    nav.style.width = '100%';
    nav.style.background = 'var(--glass-bg)';
    nav.style.padding = '20px';
  });
}
