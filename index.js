/* TYPING EFFECT */
const roles = [
  "Tech Enthusiast.",
  "Developer.",
  "Problem Solver."
];

const typingText = document.getElementById("typing-text");

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 100;
const deletingSpeed = 60;
const holdTime = 2000;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      setTimeout(() => isDeleting = true, holdTime);
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

typeEffect();

/* SCROLL REVEAL */
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 120) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
