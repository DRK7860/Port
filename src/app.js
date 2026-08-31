// ==========================================
// 1. GERENCIAMENTO DE TEMA (DARK / LIGHT)
// ==========================================
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const themeToggleBtn = document.getElementById('theme-toggle');

function atualizarIconesTema() {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
        themeToggleLightIcon.classList.remove('hidden');
        themeToggleDarkIcon.classList.add('hidden');
    } else {
        themeToggleDarkIcon.classList.remove('hidden');
        themeToggleLightIcon.classList.add('hidden');
    }
}

atualizarIconesTema();

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
        atualizarIconesTema();
    });
}

// ==========================================
// 2. GERADOR DINÂMICO DE MENSAGENS EM PORTUGUÊS
// ==========================================
async function abrirCartinha() {
    // Cria o modal instantaneamente com um estado de animação elegante
    const modal = document.createElement('div');
    modal.className = "fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in";
    modal.innerHTML = `
        <div id="cartinha-container" class="bg-stone-50 dark:bg-slate-800 rounded-3xl p-8 md:p-10 max-w-md w-full shadow-2xl border border-stone-200 dark:border-slate-700 text-center relative overflow-hidden transition-colors duration-300">
            <div class="w-14 h-14 bg-amber-100 dark:bg-slate-700 text-amber-600 dark:text-amber-400 rounded-3xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-xs animate-spin">✨</div>
            <h3 class="font-bold text-xl text-slate-900 dark:text-white mb-1">Sintonizando a Tripulação...</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-6 uppercase tracking-wider font-semibold">Buscando inspiração no cosmos</p>
            
            <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl mb-8 text-sm text-slate-500 dark:text-slate-400 font-light italic shadow-sm transition-colors duration-300">
                "Conectando frequências de paz e clareza para o seu dia..."
            </div>

            <button onclick="this.closest('.fixed').remove()" class="w-full bg-slate-900 dark:bg-amber-500 hover:bg-amber-500 dark:hover:bg-amber-400 hover:text-slate-900 dark:text-slate-900 text-white font-medium py-3 rounded-full text-sm transition-all shadow-sm cursor-pointer">
                Fechar 💛
            </button>
        </div>
    `;
    document.body.appendChild(modal);

    // Banco inteligente expandido de mensagens em português
    const bancoMensagens = [
        "✨ 'Não se preocupe tanto com o tamanho dos passos que você dá, mas sim com a direção. Respira fundo, as coisas vão se encaixar no momento certo.'",
        "☕ 'Se o dia estiver pesado, lembre-se de que tempestades não duram para sempre. Você já superou 100% dos seus piores dias até aqui. Vai dar tudo certo!'",
        "🌟 'Independentemente dos desafios que você esteja enfrentando agora, lembre-se do seu valor. Resiliência é a sua marca registrada. Siga em frente!'",
        "🙏 'Respira fundo e acalma esse coração. O que é para ser seu encontrará o caminho no tempo certo. Tenha um dia repleto de paz e surpresas boas!'",
        "🚀 'Grandes realizações exigem tempo e paciência. Valorize cada pequeno progresso de hoje; você está construindo algo incrível!'",
        "💡 'Errar faz parte do processo de aprender e evoluir. Trate a si mesmo com carinho e lembre-se de que cada obstáculo é um degrau a mais.'",
        "🌊 'Assim como as águas encontram o seu curso, os problemas encontram soluções quando mantemos a mente serena. Confie no seu processo!'"
    ];

    // Simula um delay rápido de processamento para dar o charme da animação
    setTimeout(() => {
        const mensagemAleatoria = bancoMensagens[Math.floor(Math.random() * bancoMensagens.length)];
        
        const containerTexto = modal.querySelector('.bg-white');
        const containerTitulo = modal.querySelector('h3');
        const iconeBox = modal.querySelector('.w-14');

        iconeBox.classList.remove('animate-spin');
        iconeBox.innerHTML = "💌";
        containerTitulo.textContent = "Uma Pausa para o Coração";
        
        containerTexto.className = "bg-white dark:bg-slate-900 p-6 rounded-2xl mb-8 text-sm text-slate-700 dark:text-slate-300 font-light leading-relaxed border border-stone-100 dark:border-slate-700 italic shadow-sm transition-colors duration-300";
        containerTexto.innerHTML = `${mensagemAleatoria} <br><span class="block mt-3 text-xs text-amber-600 dark:text-amber-400 not-italic font-medium">— Com carinho, tripulação Fabrício & Ni 🚀✨</span>`;
    }, 600);
}

// ==========================================
// 3. ANIMAÇÕES DE SCROLL E BARRA DE PROGRESSO
// ==========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(element => {
    revealObserver.observe(element);
});

const progressBar = document.getElementById('scroll-progress');
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    
    if (progressBar) {
        progressBar.style.width = `${scrolled}%`;
    }

    if (navbar) {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-md', 'dark:shadow-slate-900/50');
        } else {
            navbar.classList.remove('shadow-md', 'dark:shadow-slate-900/50');
        }
    }
});

// ==========================================
// 4. LÓGICA DO FAQ (ACCORDION)
// ==========================================
document.querySelectorAll('.faq-button').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const icon = button.querySelector('.faq-icon');
        
        document.querySelectorAll('.faq-content').forEach(item => {
            if (item !== content) {
                item.style.maxHeight = null;
                const outroIcon = item.previousElementSibling.querySelector('.faq-icon');
                if (outroIcon) outroIcon.classList.remove('rotate-180');
            }
        });

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            if (icon) icon.classList.remove('rotate-180');
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            if (icon) icon.classList.add('rotate-180');
        }
    });
});