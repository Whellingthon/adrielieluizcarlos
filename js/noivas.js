document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURAÇÕES GLOBAIS ---
    const weddingDate = new Date("Jul 11, 2026 17:00:00").getTime();
    const pixKeyValue = "livia.taylor@email.com"; // <-- MUDE AQUI SUA CHAVE PIX
    const siteMusic = document.getElementById('siteMusic');
    const backToTopBtn = document.getElementById('backToTopBtn');

    // --- LÓGICA DO ÁUDIO (AUTOPLAY AO INTERAGIR) ---
    function setupAutoplayMusic() {
        if (!siteMusic) return;

        siteMusic.volume = 0.6;

        const tryPlayMusic = () => {
            const playPromise = siteMusic.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Música começou a tocar, removemos os listeners de interação
                    document.removeEventListener('click', tryPlayMusic);
                    document.removeEventListener('touchstart', tryPlayMusic);
                    document.removeEventListener('scroll', tryPlayMusic);
                }).catch(() => {
                    // Navegador bloqueou, aguarda qualquer interação do usuário
                    document.addEventListener('click', tryPlayMusic, { once: true });
                    document.addEventListener('touchstart', tryPlayMusic, { once: true });
                    document.addEventListener('scroll', tryPlayMusic, { once: true });
                });
            }
        };

        tryPlayMusic();
    }

    setupAutoplayMusic();

    // --- LÓGICA DO COUNTDOWN ---
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            const countdownContainer = document.getElementById('countdown-container');
            if(countdownContainer) {
                countdownContainer.innerHTML = '<h3 class="text-2xl font-bold">É hoje o grande dia!</h3>';
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }, 1000);

    // --- LÓGICA DO CARROSSEL DE FUNDO DO HERO ---
    const heroCarouselItems = document.querySelectorAll('#hero-carousel .carousel-bg-item');
    let currentHeroSlide = 0;

    function nextHeroSlide() {
        if (heroCarouselItems.length === 0) return;
        heroCarouselItems[currentHeroSlide].classList.remove('active');
        currentHeroSlide = (currentHeroSlide + 1) % heroCarouselItems.length;
        heroCarouselItems[currentHeroSlide].classList.add('active');
    }

    if (heroCarouselItems.length > 1) {
        heroCarouselItems[0].classList.add('active');
        setInterval(nextHeroSlide, 5000);
    } else if (heroCarouselItems.length === 1) {
        heroCarouselItems[0].classList.add('active');
    }

    // --- LÓGICA DO CARROSSEL DE FOTOS PRINCIPAL ---
    const mainCarouselSlide = document.querySelector('.main-carousel-slide');
    const mainCarouselItems = document.querySelectorAll('.carousel-item');
    const mainPrevBtn = document.querySelector('.main-carousel-btn.prev');
    const mainNextBtn = document.querySelector('.main-carousel-btn.next');
    let mainCurrentIndex = 0;

    function updateMainCarousel() {
        if(mainCarouselSlide) {
            mainCarouselSlide.style.transform = `translateX(-${mainCurrentIndex * 100}%)`;
        }
    }

    if (mainPrevBtn && mainNextBtn && mainCarouselItems.length > 0) {
        mainPrevBtn.addEventListener('click', () => {
            mainCurrentIndex = (mainCurrentIndex > 0) ? mainCurrentIndex - 1 : mainCarouselItems.length - 1;
            updateMainCarousel();
        });

        mainNextBtn.addEventListener('click', () => {
            mainCurrentIndex = (mainCurrentIndex < mainCarouselItems.length - 1) ? mainCurrentIndex + 1 : 0;
            updateMainCarousel();
        });
    }
    
    // --- LÓGICA DO MODAL PIX ---
    const pixModal = document.getElementById('pixModal');
    const giftBtns = document.querySelectorAll('.gift-btn');
    const closePixModalBtn = document.getElementById('closePixModal');
    const copyPixBtn = document.getElementById('copyPixBtn');
    const pixKeyElement = document.getElementById('pixKey');
    const qrCodeImg = document.getElementById('qrCodeImg');
    
    function updatePixInfo() {
        if (pixKeyElement) pixKeyElement.textContent = pixKeyValue;
        if (qrCodeImg) qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixKeyValue)}`;
    }
    
    updatePixInfo();

    giftBtns.forEach(button => {
        button.addEventListener('click', () => {
            if(pixModal) {
                pixModal.classList.remove('hidden');
                setTimeout(() => pixModal.querySelector('div').classList.remove('scale-95'), 10);
            }
        });
    });

    function closeModal() {
        if(pixModal) {
            pixModal.querySelector('div').classList.add('scale-95');
            setTimeout(() => pixModal.classList.add('hidden'), 300);
        }
    }

    if (closePixModalBtn) closePixModalBtn.addEventListener('click', closeModal);
    if (pixModal) pixModal.addEventListener('click', (event) => { if (event.target === pixModal) closeModal(); });

    if (copyPixBtn) {
        copyPixBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(pixKeyValue).then(() => {
                const originalIcon = copyPixBtn.innerHTML;
                copyPixBtn.innerHTML = '<i data-feather="check" class="w-5 h-5 text-green-500"></i>';
                feather.replace();
                setTimeout(() => {
                    copyPixBtn.innerHTML = originalIcon;
                    feather.replace();
                }, 2000);
            });
        });
    }

    // --- LÓGICA DO BOTÃO VOLTAR AO TOPO ---
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            // Se rolar mais de 400px, mostra o botão
            if (window.scrollY > 400) {
                backToTopBtn.classList.remove('opacity-0', 'invisible');
                backToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                backToTopBtn.classList.add('opacity-0', 'invisible');
                backToTopBtn.classList.remove('opacity-100', 'visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- INICIALIZAÇÃO DOS PLUGINS ---
    feather.replace();
    
    VANTA.GLOBE({
        el: "#vanta-bg",
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x92A8D1, // Azul Serenity que você escolheu
        color2: 0xADC5ED,
        backgroundColor: 0xf8f1f0,
        size: 0.7
    });

});

// --- LÓGICA DE REVEAL (ANIMAÇÃO AO DESCER) ---
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150; // Distância para ativar a animação

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// --- MOSTRAR PLAYER QUANDO A MÚSICA COMEÇAR ---
const playerInfo = document.getElementById('music-player-info');
if (siteMusic && playerInfo) {
    siteMusic.onplay = () => {
        playerInfo.classList.remove('opacity-0', 'invisible', 'translate-y-4');
        playerInfo.classList.add('opacity-100', 'visible', 'translate-y-0');
    };
}
// No topo do seu arquivo JS (Substitua a variável existente)
const pixCopiaECola = "00020101021126580014BR.GOV.BCB.PIX0118452077450001645204000053039865802BR5921ADRIELI FONTANA ARAUJO6007MARILIA62070503***6304";

// Dentro do seu DOMContentLoaded ou no final do arquivo
const btnCopiaPix = document.getElementById('btnCopiaPix');

if (btnCopiaPix) {
    btnCopiaPix.addEventListener('click', () => {
        navigator.clipboard.writeText(pixCopiaECola).then(() => {
            // Feedback visual para o convidado
            const originalText = btnCopiaPix.innerHTML;
            btnCopiaPix.innerHTML = '<i data-feather="check" class="w-4 h-4 inline mr-2"></i> Código Copiado!';
            btnCopiaPix.classList.replace('bg-[#32b8ac]', 'bg-green-600');
            feather.replace();

            setTimeout(() => {
                btnCopiaPix.innerHTML = originalText;
                btnCopiaPix.classList.replace('bg-green-600', 'bg-[#32b8ac]');
                feather.replace();
            }, 3000);
        }).catch(err => {
            alert("Erro ao copiar. Por favor, utilize a chave CNPJ manualmente.");
        });
    });
}