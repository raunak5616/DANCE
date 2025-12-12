// script.js

const heroText = document.querySelector('.hero-content p');
const phrases = ["Learn, Perform & Elevate Your Passion", "Join Our Dance Family Today", "Step Into Rhythm & Fun"];
let index = 0;
let charIndex = 0;

function typeText() {
    if (charIndex < phrases[index].length) {
        heroText.textContent += phrases[index][charIndex];
        charIndex++;
        setTimeout(typeText, 100);
    } else {
        setTimeout(eraseText, 2000);
    }
}

function eraseText() {
    if (charIndex > 0) {
        heroText.textContent = phrases[index].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, 50);
    } else {
        index = (index + 1) % phrases.length;
        setTimeout(typeText, 500);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    typeText();
});
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = '#ffffffcc'; // slightly transparent
        navbar.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = '#ffffff';
        navbar.style.boxShadow = 'none';
    }
});
