// Efeito de rolagem no cabeçalho
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(18, 18, 18, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.background = 'rgba(18, 18, 18, 0.9)';
        header.style.boxShadow = 'none';
    }
});

// Rolagem suave para os links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de surgimento (fade-in) ao rolar a página
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplica classes de transição inicial nos elementos
const animateElements = document.querySelectorAll('.features-grid, .energy-content, .specs-content, .cta-content');

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(el);
});

// Classe CSS criada dinamicamente para a animação
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  .fade-in-visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(styleSheet);

// Lógica de abertura e fechamento do Modal de Reserva
const modal = document.getElementById('reservationModal');
const closeModal = document.querySelector('.close-modal');
const reserveButtons = document.querySelectorAll('a[href="#buy"]');

reserveButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('show');
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

// Gerencia o envio do formulário de reserva
const form = document.getElementById('reservationForm');
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o envio real (recarregar página)
    alert('Reserva solicitada com sucesso! Entraremos em contato.');
    modal.classList.remove('show');
    form.reset();
});
