// Variáveis globais
let currentChapter = 0;
const totalChapters = 10;

// Elementos do DOM
const chapters = document.querySelectorAll('.chapter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const chapterIndicator = document.getElementById('chapterIndicator');

// ========================================
// Inicialização
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    updateChapter();
    logWelcomeMessage();
});

function initializeApp() {
    // Aplicar animações iniciais
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);
}

// ========================================
// Atualizar Capítulo
// ========================================
function updateChapter() {
    // Remover classe active de todos os capítulos
    chapters.forEach((chapter, index) => {
        chapter.classList.remove('active');
        if (index === currentChapter) {
            // Pequeno delay para animação suave
            setTimeout(() => {
                chapter.classList.add('active');
            }, 50);
        }
    });
    
    // Atualizar barra de progresso
    const progress = ((currentChapter + 1) / totalChapters) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Atualizar indicador de capítulo
    updateChapterIndicator();
    
    // Atualizar botões
    updateNavigationButtons();
    
    // Scroll suave para o topo
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Salvar progresso
    saveProgress();
    
    // Anunciar para leitores de tela
    announceChapterChange();
}

function updateChapterIndicator() {
    const current = chapterIndicator.querySelector('.current');
    current.textContent = currentChapter + 1;
    
    // Animação de pulse no indicador
    chapterIndicator.style.transform = 'scale(1.1)';
    setTimeout(() => {
        chapterIndicator.style.transition = 'transform 0.3s ease';
        chapterIndicator.style.transform = 'scale(1)';
    }, 100);
}

function updateNavigationButtons() {
    prevBtn.disabled = currentChapter === 0;
    
    const nextBtnSpan = nextBtn.querySelector('span');
    if (currentChapter === totalChapters - 1) {
        nextBtnSpan.textContent = 'Finalizar';
    } else {
        nextBtnSpan.textContent = 'Próximo';
    }
}

// ========================================
// Navegação
// ========================================
function goToNextChapter() {
    if (currentChapter < totalChapters - 1) {
        currentChapter++;
        updateChapter();
        trackEvent('navigation', 'next', currentChapter);
    } else {
        showCompletionMessage();
    }
}

function goToPrevChapter() {
    if (currentChapter > 0) {
        currentChapter--;
        updateChapter();
        trackEvent('navigation', 'prev', currentChapter);
    }
}

function goToChapter(index) {
    if (index >= 0 && index < totalChapters) {
        currentChapter = index;
        updateChapter();
        trackEvent('navigation', 'jump', currentChapter);
    }
}

// ========================================
// Event Listeners
// ========================================
function setupEventListeners() {
    // Navegação por botões
    nextBtn.addEventListener('click', goToNextChapter);
    prevBtn.addEventListener('click', goToPrevChapter);
    
    // Navegação por teclado
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Navegação por touch
    setupTouchNavigation();
    
    // Logo clicável para voltar ao início
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            if (currentChapter !== 0) {
                if (confirm('Deseja voltar ao início da história?')) {
                    goToChapter(0);
                }
            }
        });
    }
    
    // Carregar progresso salvo
    loadProgress();
    
    // Adicionar interatividade aos elementos SVG
    addSVGInteractivity();
}

function handleKeyboardNavigation(e) {
    switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
            e.preventDefault();
            goToNextChapter();
            break;
        case 'ArrowLeft':
        case 'ArrowUp':
            e.preventDefault();
            goToPrevChapter();
            break;
        case 'Home':
            e.preventDefault();
            goToChapter(0);
            break;
        case 'End':
            e.preventDefault();
            goToChapter(totalChapters - 1);
            break;
    }
}

function setupTouchNavigation() {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const horizontalDiff = touchEndX - touchStartX;
        const verticalDiff = Math.abs(touchEndY - touchStartY);
        
        // Apenas processar se for swipe horizontal
        if (verticalDiff < 100) {
            if (horizontalDiff < -swipeThreshold) {
                goToNextChapter();
            } else if (horizontalDiff > swipeThreshold) {
                goToPrevChapter();
            }
        }
    }
}

// ========================================
// Interatividade SVG
// ========================================
function addSVGInteractivity() {
    // Adicionar hover effects aos elementos SVG
    const svgElements = document.querySelectorAll('.sun-body, .Faiska-character, .earth-small, circle[fill*="#"], ellipse[fill*="#"]');
    
    svgElements.forEach(element => {
        element.style.cursor = 'pointer';
        element.style.transition = 'transform 0.3s ease, filter 0.3s ease';
        
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.filter = 'brightness(1.1)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.filter = 'brightness(1)';
        });
        
        element.addEventListener('click', function(e) {
            createRippleEffect(e);
            playClickSound();
        });
    });
}

function createRippleEffect(event) {
    const ripple = document.createElement('div');
    const rect = event.target.getBoundingClientRect();
    
    ripple.style.position = 'fixed';
    ripple.style.left = event.clientX + 'px';
    ripple.style.top = event.clientY + 'px';
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 107, 107, 0.6)';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'rippleEffect 0.6s ease-out';
    ripple.style.zIndex = '9999';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Adicionar CSS da animação ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        0% {
            width: 10px;
            height: 10px;
            opacity: 1;
        }
        100% {
            width: 80px;
            height: 80px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

function playClickSound() {
    // Feedback visual ao invés de som
    document.body.style.transform = 'scale(0.998)';
    setTimeout(() => {
        document.body.style.transition = 'transform 0.1s ease';
        document.body.style.transform = 'scale(1)';
    }, 50);
}

// ========================================
// Salvar e Carregar Progresso
// ========================================
function saveProgress() {
    const progress = {
        currentChapter: currentChapter,
        timestamp: new Date().toISOString(),
        completedChapters: currentChapter + 1,
        totalTime: Date.now() - startTime
    };
    
    window.FaiskaProgress = progress;
}

function loadProgress() {
    if (window.FaiskaProgress && window.FaiskaProgress.currentChapter > 0) {
        const savedChapter = window.FaiskaProgress.currentChapter;
        
        setTimeout(() => {
            const continueReading = confirm(
                `Você parou no capítulo ${savedChapter + 1}.\n\nDeseja continuar de onde parou?`
            );
            
            if (continueReading) {
                goToChapter(savedChapter);
            }
        }, 800);
    }
}

// ========================================
// Mensagem de Conclusão
// ========================================
function showCompletionMessage() {
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    
    const message = `
🌟 Parabéns! 🌟

Você completou a jornada de Faiska, a faísca solar!

📚 Tempo de leitura: ${minutes}min ${seconds}s
✨ ${totalChapters} capítulos explorados

Agora você conhece:
• Como o clima espacial funciona
• As aventuras de Faiska pelo espaço
• Como protegemos nossa tecnologia
• E muito mais!
    `;
    
    if (confirm(message)) {
        restartStory();
    } else {
        showThankYouMessage();
    }
}

function restartStory() {
    startTime = Date.now();
    goToChapter(0);
    trackEvent('story', 'restart');
}

function showThankYouMessage() {
    alert('✨ Obrigado por ler a história de Faiska!\n\n🚀 Continue explorando o universo!');
    trackEvent('story', 'complete');
}

// ========================================
// Acessibilidade
// ========================================
function announceChapterChange() {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    
    const chapterTitle = chapters[currentChapter].querySelector('.chapter-title');
    announcement.textContent = `Capítulo ${currentChapter + 1} de ${totalChapters}: ${chapterTitle ? chapterTitle.textContent : ''}`;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => announcement.remove(), 2000);
}

// Adicionar labels ARIA aos capítulos
chapters.forEach((chapter, index) => {
    chapter.setAttribute('role', 'article');
    chapter.setAttribute('aria-label', `Capítulo ${index + 1} de ${totalChapters}`);
});

// ========================================
// Analytics e Rastreamento
// ========================================
const startTime = Date.now();
const chapterViewTimes = {};

function trackEvent(category, action, label) {
    console.log(`[Analytics] ${category} - ${action}${label !== undefined ? ': ' + label : ''}`);
}

function trackChapterView(chapterIndex) {
    if (!chapterViewTimes[chapterIndex]) {
        chapterViewTimes[chapterIndex] = {
            startTime: Date.now(),
            views: 1
        };
    } else {
        chapterViewTimes[chapterIndex].views++;
    }
    
    trackEvent('chapter', 'view', chapterIndex);
}

// ========================================
// Funções Auxiliares
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// Prevenção de Saída Acidental
// ========================================
window.addEventListener('beforeunload', (e) => {
    if (currentChapter > 0 && currentChapter < totalChapters - 1) {
        e.preventDefault();
        e.returnValue = 'Você tem certeza que deseja sair? Seu progresso será salvo.';
        return e.returnValue;
    }
});

// ========================================
// API Pública
// ========================================
window.FaiskaStory = {
    goToChapter,
    getCurrentChapter: () => currentChapter,
    getTotalChapters: () => totalChapters,
    getProgress: () => `${((currentChapter + 1) / totalChapters * 100).toFixed(1)}%`,
    restart: restartStory,
    next: goToNextChapter,
    previous: goToPrevChapter
};

// ========================================
// Mensagens de Console
// ========================================
function logWelcomeMessage() {
    const styles = {
        title: 'color: #FF6B6B; font-size: 24px; font-weight: bold;',
        subtitle: 'color: #4ECDC4; font-size: 14px;',
        info: 'color: #666; font-size: 12px;',
        highlight: 'color: #FFE66D; font-size: 12px; font-weight: bold;'
    };
    
    console.log('%c🌟 A Grande Viagem de Faiska', styles.title);
    console.log('%c✨ História interativa sobre clima espacial', styles.subtitle);
    console.log('%c\n📖 Controles de Navegação:', styles.info);
    console.log('%c  → Setas do teclado para navegar', styles.info);
    console.log('%c  → Swipe em dispositivos touch', styles.info);
    console.log('%c  → Home/End para ir ao início/fim', styles.info);
    console.log('%c\n🎮 Dica: Tente o Konami Code para uma surpresa!', styles.highlight);
    console.log('%c\n💻 API disponível em window.FaiskaStory', styles.info);
}

// ========================================
// Performance Monitoring
// ========================================
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Tempo de carregamento: ${pageLoadTime}ms`);
        trackEvent('performance', 'page_load', pageLoadTime);
    }
});

// ========================================
// Iniciar rastreamento do primeiro capítulo
// ========================================
trackChapterView(0);

console.log('✅ Sistema inicializado com sucesso!');