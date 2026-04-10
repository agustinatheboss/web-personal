/* main.js - Comportamiento Global */
document.addEventListener('DOMContentLoaded', () => {
    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');
    let mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;

    // Seguimiento del mouse
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
    });

    // Animación suavizada del contorno (Lerp)
    const animateOutline = () => {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        outline.style.left = `${outlineX}px`;
        outline.style.top = `${outlineY}px`;
        requestAnimationFrame(animateOutline);
    };
    animateOutline();

    // Interacción con elementos clicables
    const targets = document.querySelectorAll('a, button, .clickable-card');
    targets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.style.width = '60px';
            outline.style.height = '60px';
            outline.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
        });
        el.addEventListener('mouseleave', () => {
            outline.style.width = '40px';
            outline.style.height = '40px';
            outline.style.backgroundColor = 'transparent';
        });
    });

    // Revelado al hacer Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});