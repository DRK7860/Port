// --- Tema Dark/Light Toggle ---
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const themeToggleBtn = document.getElementById('theme-toggle');

// Mostra o ícone correspondente ao tema atual
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

themeToggleBtn.addEventListener('click', function() {
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
});

// --- Cartinha de Conforto ---
function abrirCartinha() {
    const cartas = [
        "✨ 'Não se preocupe tanto com o tamanho dos passos que você dá, mas sim com a direção. Respira fundo, as coisas vão se encaixar no momento certo. Tenha um dia abençoado!'",
        "☕ 'Se o dia estiver pesado, lembre-se de que tempestades não duram para sempre. Você já superou 100% dos seus piores dias até aqui. Vai dar tudo certo!'",
        "🌟 'Independentemente dos desafios que você esteja enfrentando agora, lembre-se do seu valor. Resiliência é a sua marca registrada. Um forte abraço e siga em frente!'",
        "🙏 'Respira fundo. Acalma esse coração. O que é para ser seu encontrará o caminho. Que o seu dia seja repleto de paz, clareza e surpresas boas!'"
    ];
    
    const mensagemAleatoria = cartas[Math.floor(Math.random() * cartas.length)];
    
    const modal = document.createElement('div');
    modal.className = "fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in";
    modal.innerHTML = `
        <div class="bg-stone-50 dark:bg-slate-800 rounded-3xl p-8 md:p-10 max-w-md w-full shadow-2xl border border-stone-200 dark:border-slate-700 text-center relative overflow-hidden transition-colors duration-300">
            <div class="w-14 h-14 bg-amber-100 dark:bg-slate-700 text-amber-600 dark:text-amber-400 rounded-3xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-xs">💌</div>
            <h3 class="font-bold text-xl text-slate-900 dark:text-white mb-1">Uma Pausa para o Coração</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-6 uppercase tracking-wider font-semibold">Mensagem Especial do Dia</p>
            
            <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl mb-8 text-sm text-slate-700 dark:text-slate-300 font-light leading-relaxed border border-stone-100 dark:border-slate-700 italic shadow-sm transition-colors duration-300">
                "${mensagemAleatoria}"
            </div>

            <button onclick="this.closest('.fixed').remove()" class="w-full bg-slate-900 dark:bg-amber-500 hover:bg-amber-500 dark:hover:bg-amber-400 hover:text-slate-900 dark:text-slate-900 text-white font-medium py-3 rounded-full text-sm transition-all shadow-sm cursor-pointer">
                Obrigado, me senti melhor 💛
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

// --- Animações e Scroll ---
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
    progressBar.style.width = `${scrolled}%`;

    if (window.scrollY > 20) {
        navbar.classList.add('shadow-md', 'dark:shadow-slate-900/50');
    } else {
        navbar.classList.remove('shadow-md', 'dark:shadow-slate-900/50');
    }
});

document.querySelectorAll('.faq-button').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const icon = button.querySelector('.faq-icon');
        
        document.querySelectorAll('.faq-content').forEach(item => {
            if (item !== content) {
                item.style.maxHeight = null;
                item.previousElementSibling.querySelector('.faq-icon').classList.remove('rotate-180');
            }
        });

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            icon.classList.remove('rotate-180');
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            icon.classList.add('rotate-180');
        }
    });
});