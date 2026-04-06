document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURAÇÕES GLOBAIS ---
    const weddingDate = new Date("Jul 11, 2026 17:00:00").getTime();
    
    // O CÓDIGO PIX REAL (BR CODE COM CHECKSUM CRC16)
    const pixCopiaECola = "00020101021126580014BR.GOV.BCB.PIX0118452077450001645204000053039865802BR5921ADRIELI FONTANA ARAUJO6007MARILIA62070503***63048892";
    const siteMusic = document.getElementById('siteMusic');
    const backToTopBtn = document.getElementById('backToTopBtn');

    // --- LÓGICA DO ÁUDIO ---
    function setupAutoplayMusic() {
        if (!siteMusic) return;
        siteMusic.volume = 0.6;
        const tryPlayMusic = () => {
            siteMusic.play().then(() => {
                ['click', 'touchstart', 'scroll'].forEach(ev => document.removeEventListener(ev, tryPlayMusic));
            }).catch(() => {
                ['click', 'touchstart', 'scroll'].forEach(ev => document.addEventListener(ev, tryPlayMusic, { once: true }));
            });
        };
        tryPlayMusic();
    }
    setupAutoplayMusic();

    // --- LÓGICA DO COUNTDOWN ---
    setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        if (distance < 0) return;

        document.getElementById('days').textContent = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById('hours').textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById('minutes').textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById('seconds').textContent = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }, 1000);

    // --- CARROSSEL HERO ---
    const heroCarouselItems = document.querySelectorAll('#hero-carousel .carousel-bg-item');
    let currentHeroSlide = 0;
    if (heroCarouselItems.length > 0) {
        heroCarouselItems[0].classList.add('active');
        if (heroCarouselItems.length > 1) setInterval(() => {
            heroCarouselItems[currentHeroSlide].classList.remove('active');
            currentHeroSlide = (currentHeroSlide + 1) % heroCarouselItems.length;
            heroCarouselItems[currentHeroSlide].classList.add('active');
        }, 5000);
    }

    // --- CARROSSEL FOTOS ---
    const mainCarouselSlide = document.querySelector('.main-carousel-slide');
    const mainCarouselItems = document.querySelectorAll('.carousel-item');
    let mainCurrentIndex = 0;
    const updateMainCarousel = () => mainCarouselSlide.style.transform = `translateX(-${mainCurrentIndex * 100}%)`;

    document.querySelector('.main-carousel-btn.prev')?.addEventListener('click', () => {
        mainCurrentIndex = (mainCurrentIndex > 0) ? mainCurrentIndex - 1 : mainCarouselItems.length - 1;
        updateMainCarousel();
    });
    document.querySelector('.main-carousel-btn.next')?.addEventListener('click', () => {
        mainCurrentIndex = (mainCurrentIndex < mainCarouselItems.length - 1) ? mainCurrentIndex + 1 : 0;
        updateMainCarousel();
    });

    // --- LÓGICA UNIFICADA DO PIX (MODAL + BOTÃO DIRETO) ---
    const pixModal = document.getElementById('pixModal');
    const qrCodeImg = document.getElementById('qrCodeImg');
    const pixKeyElement = document.getElementById('pixKey');

    // 1. Atualiza as infos visuais
    if (qrCodeImg) qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixCopiaECola)}`;
    if (pixKeyElement) pixKeyElement.textContent = "45.207.745/0001-64";

    // 2. Função Unificada de Copiar
    const handleCopyPix = (buttonElement) => {
        navigator.clipboard.writeText(pixCopiaECola).then(() => {
            const originalContent = buttonElement.innerHTML;
            buttonElement.innerHTML = '<i data-feather="check" class="w-4 h-4 inline mr-2"></i> Copiado!';
            if(buttonElement.id === 'btnCopiaPix') buttonElement.classList.replace('bg-[#32b8ac]', 'bg-green-600');
            feather.replace();
            setTimeout(() => {
                buttonElement.innerHTML = originalContent;
                if(buttonElement.id === 'btnCopiaPix') buttonElement.classList.replace('bg-green-600', 'bg-[#32b8ac]');
                feather.replace();
            }, 3000);
        });
    };

    // Listener para o botão do Modal e o botão direto do Card
    document.getElementById('copyPixBtn')?.addEventListener('click', (e) => handleCopyPix(e.currentTarget));
    document.getElementById('btnCopiaPix')?.addEventListener('click', (e) => handleCopyPix(e.currentTarget));

    // Controle do Modal
    document.querySelectorAll('.gift-btn').forEach(btn => btn.addEventListener('click', () => {
        pixModal?.classList.remove('hidden');
        setTimeout(() => pixModal?.querySelector('div').classList.remove('scale-95'), 10);
    }));
    const closeModal = () => {
        pixModal?.querySelector('div').classList.add('scale-95');
        setTimeout(() => pixModal?.classList.add('hidden'), 300);
    };
    document.getElementById('closePixModal')?.addEventListener('click', closeModal);
    pixModal?.addEventListener('click', (e) => { if (e.target === pixModal) closeModal(); });

    // --- VOLTAR AO TOPO ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) backToTopBtn?.classList.replace('opacity-0', 'opacity-100'), backToTopBtn?.classList.replace('invisible', 'visible');
        else backToTopBtn?.classList.replace('opacity-100', 'opacity-0'), backToTopBtn?.classList.replace('visible', 'invisible');
    });
    backToTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // --- PLUGINS ---
    feather.replace();
    if(document.getElementById('vanta-bg')) VANTA.GLOBE({
        el: "#vanta-bg", mouseControls: false, touchControls: false, gyroControls: false,
        minHeight: 200.00, minWidth: 200.00, scale: 1.00, scaleMobile: 1.00,
        color: 0x92A8D1, color2: 0xADC5ED, backgroundColor: 0xf8f1f0, size: 0.7
    });
});

// --- REVEAL ANIMATION ---
const reveal = () => {
    document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 150) el.classList.add("active");
    });
};
window.addEventListener("scroll", reveal);

// --- MUSIC PLAYER INFO ---
const siteMusic = document.getElementById('siteMusic');
const playerInfo = document.getElementById('music-player-info');
if (siteMusic) siteMusic.onplay = () => playerInfo?.classList.remove('opacity-0', 'invisible', 'translate-y-4');