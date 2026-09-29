document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer para animações de fade-in ao rolar a página
    const revealElements = document.querySelectorAll('.reveal');

    // Configurações do observer
    const revealOptions = {
        threshold: 0.15, // A animação dispara quando 15% do elemento estiver visível
        rootMargin: "0px 0px -50px 0px" // Dispara ligeiramente antes do final da tela
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Adiciona a classe active que faz a animação de subir e aparecer
                entry.target.classList.add('active');
                // Para de observar o elemento após a animação acontecer uma vez
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Começa a observar todos os elementos que têm a classe 'reveal'
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Gatilho imediato para elementos que já estão no topo/visíveis no carregamento da tela
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('active');
        }
    });

    // Modal dos dashboards: carrega o iframe só quando o usuário clica em "Ver Dashboard"
    const modal = document.getElementById('dashboard-modal');
    const modalIframe = document.getElementById('modal-iframe');
    const modalVideo = document.getElementById('modal-video');
    const modalClose = document.getElementById('modal-close');
    const openButtons = document.querySelectorAll('.open-dashboard');

    function openDashboardModal(url, type) {
        if (type === 'video') {
            modalVideo.src = url;
            modalVideo.style.display = 'block';
            modalIframe.style.display = 'none';
            modalVideo.play();
        } else {
            modalIframe.src = url;
            modalIframe.style.display = 'block';
            modalVideo.style.display = 'none';
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDashboardModal() {
        modal.classList.remove('active');
        modalIframe.src = ''; // interrompe o carregamento/execução do relatório ao fechar
        modalVideo.pause();
        modalVideo.src = '';
        document.body.style.overflow = '';
    }

    openButtons.forEach(btn => {
        btn.addEventListener('click', () => openDashboardModal(btn.dataset.url, btn.dataset.type));
    });

    modalClose.addEventListener('click', closeDashboardModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeDashboardModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeDashboardModal();
        }
    });

});
