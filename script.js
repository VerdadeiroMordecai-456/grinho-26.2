// script.js

// ==================== TEMA CLARO/ESCURO ====================
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }

    // Adicione um botão de tema manualmente nas páginas se quiser
}

// ==================== CONTADORES ANIMADOS ====================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const update = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                setTimeout(update, 16);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        update();
    });
}

// ==================== DICAS SUSTENTÁVEIS ====================
const tips = [
    "Utilize rotação de culturas para manter a saúde do solo.",
    "Instale sensores de umidade para irrigação mais eficiente.",
    "Aposte em adubação orgânica e evite fertilizantes químicos.",
    "Implemente sistemas de energia solar em sua propriedade.",
    "Crie corredores ecológicos para proteger a biodiversidade.",
    "Reduza o uso de agrotóxicos com controle biológico.",
    "Faça compostagem dos resíduos orgânicos da fazenda.",
    "Plante árvores nativas nas áreas de preservação."
];

function showNewTip() {
    const tipBox = document.getElementById('tip-box');
    if (!tipBox) return;

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    tipBox.style.opacity = '0';
    
    setTimeout(() => {
        tipBox.innerHTML = `<i class="fa-solid fa-lightbulb text-emerald-600 mr-2"></i> ${randomTip}`;
        tipBox.style.transition = 'opacity 0.4s';
        tipBox.style.opacity = '1';
    }, 200);
}

// ==================== QUIZ ====================
function initQuiz() {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    const questions = [
        {
            q: "Qual prática ajuda mais na preservação do solo?",
            options: ["Rotação de culturas", "Uso intensivo de fertilizantes", "Monocultura"],
            answer: 0
        },
        {
            q: "O que significa agricultura de precisão?",
            options: ["Uso de tecnologia para aplicação exata", "Plantio manual", "Uso excessivo de água"],
            answer: 0
        }
    ];

    let current = 0;
    let score = 0;

    function showQuestion() {
        if (current >= questions.length) {
            container.innerHTML = `
                <div class="text-center">
                    <h3 class="text-2xl font-bold">Quiz finalizado!</h3>
                    <p class="mt-2">Você acertou <strong>${score}</strong> de ${questions.length}.</p>
                    <button onclick="location.reload()" class="btn mt-4">Refazer</button>
                </div>
            `;
            return;
        }

        const q = questions[current];
        container.innerHTML = `
            <p class="font-semibold mb-4">${q.q}</p>
            <div class="space-y-3">
                ${q.options.map((opt, i) => `
                    <button onclick="checkAnswer(${i}, ${q.answer}, this)" 
                            class="w-full text-left px-5 py-3 border rounded-2xl hover:bg-emerald-50">
                        ${opt}
                    </button>
                `).join('')}
            </div>
        `;
    }

    window.checkAnswer = function(selected, correct, element) {
        const buttons = container.querySelectorAll('button');
        buttons.forEach(b => b.disabled = true);

        if (selected === correct) {
            score++;
            element.classList.add('!bg-emerald-100', '!border-emerald-600');
        } else {
            element.classList.add('!bg-red-100', '!border-red-600');
            buttons[correct].classList.add('!bg-emerald-100', '!border-emerald-600');
        }

        setTimeout(() => {
            current++;
            showQuestion();
        }, 1200);
    };

    showQuestion();
}

// ==================== GRÁFICO ====================
function initChart() {
    const canvas = document.getElementById('sustainabilityChart');
    if (!canvas || typeof Chart === 'undefined') return;

    new Chart(canvas, {
        type: 'line',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'Fazendas Sustentáveis',
                data: [320, 580, 920, 1450, 2100, 2840],
                borderColor: '#166534',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(16, 185, 129, 0.1)'
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } }
        }
    });
}

// ==================== FORMULÁRIO DE CONTATO ====================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Mensagem enviada com sucesso! Obrigado pelo contato.');
        form.reset();
    });
}

// ==================== INICIALIZAÇÃO ====================
function init() {
    initTheme();

    // Inicia funções apenas se os elementos existirem
    if (document.querySelector('.stat-number')) {
        animateCounters();
    }

    if (document.getElementById('tip-box')) {
        const tipBox = document.getElementById('tip-box');
        tipBox.innerHTML = `<i class="fa-solid fa-lightbulb text-emerald-600 mr-2"></i> ${tips[0]}`;
    }

    initQuiz();
    initChart();
    initContactForm();
}

window.onload = init;
