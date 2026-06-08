// ==================== CONTADORES ANIMADOS ====================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const stepTime = 16;
        const increment = target / (duration / stepTime);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString('pt-BR');
                setTimeout(updateCounter, stepTime);
            } else {
                counter.textContent = target.toLocaleString('pt-BR');
            }
        };
        updateCounter();
    });
}

// ==================== DICAS SUSTENTÁVEIS (20 dicas) ====================
const tips = [
    "Utilize rotação de culturas para preservar a saúde do solo.",
    "Instale sensores de umidade e reduza o consumo de água em até 40%.",
    "Invista em energia solar rural — mais de 87 mil propriedades já utilizam.",
    "Adote o sistema de Integração Lavoura-Pecuária-Floresta (ILPF).",
    "Faça análise periódica do solo para evitar uso excessivo de fertilizantes.",
    "Utilize drones para aplicação precisa de defensivos.",
    "Plante árvores nativas nas áreas de preservação permanente.",
    "Reduza o uso de agrotóxicos com controle biológico.",
    "Aproveite a água da chuva com sistemas de captação.",
    "Utilize variedades de sementes mais resistentes à seca.",
    "Implemente pastoreio rotacionado para recuperar pastagens.",
    "Faça compostagem dos resíduos orgânicos da propriedade.",
    "Monitore o clima com estações meteorológicas automatizadas.",
    "Evite o desmatamento e invista em restauração florestal.",
    "Use cobertura morta para manter a umidade do solo.",
    "Capacite sua equipe em boas práticas agrícolas sustentáveis.",
    "Utilize tratores e máquinas com menor emissão de carbono.",
    "Adote o sistema de plantio direto na palha.",
    "Crie corredores ecológicos para proteger a biodiversidade.",
    "Faça reflorestamento de áreas degradadas da propriedade."
];

function showNewTip() {
    const tipBox = document.getElementById('tip-box');
    if (!tipBox) return;

    const randomIndex = Math.floor(Math.random() * tips.length);
    tipBox.style.opacity = '0';

    setTimeout(() => {
        tipBox.innerHTML = `<i class="fa-solid fa-lightbulb text-emerald-600 mr-3"></i>${tips[randomIndex]}`;
        tipBox.style.transition = 'opacity 0.4s ease';
        tipBox.style.opacity = '1';
    }, 150);
}

// ==================== QUIZ INTERATIVO ====================
function initQuiz() {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    const questions = [
        {
            question: "Qual prática mais contribui para a preservação do solo?",
            options: ["Rotação de culturas", "Monocultura intensiva", "Uso excessivo de fertilizantes"],
            correct: 0
        },
        {
            question: "O que significa agricultura de precisão?",
            options: ["Uso de tecnologia para aplicação exata de insumos", "Plantio manual", "Irrigação constante"],
            correct: 0
        },
        {
            question: "Qual é um dos principais benefícios da energia solar no campo?",
            options: ["Redução de custos e emissões de carbono", "Aumento do consumo de água", "Maior uso de agrotóxicos"],
            correct: 0
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    function showQuestion() {
        if (currentQuestion >= questions.length) {
            container.innerHTML = `
                <div class="text-center py-4">
                    <h3 class="text-2xl font-bold">Quiz Finalizado!</h3>
                    <p class="mt-3 text-lg">Você acertou <strong>${score}</strong> de ${questions.length} perguntas.</p>
                    <button onclick="location.reload()" class="btn mt-6">Refazer Quiz</button>
                </div>
            `;
            return;
        }

        const q = questions[currentQuestion];
        container.innerHTML = `
            <div>
                <p class="font-semibold mb-6">${q.question}</p>
                <div class="space-y-3">
                    ${q.options.map((option, index) => `
                        <button onclick="checkAnswer(${index}, ${q.correct}, this)" 
                                class="w-full text-left px-6 py-3 border border-zinc-200 rounded-2xl hover:bg-emerald-50 transition-colors">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    window.checkAnswer = function(selected, correct, element) {
        const buttons = container.querySelectorAll('button');
        buttons.forEach(btn => btn.disabled = true);

        if (selected === correct) {
            score++;
            element.classList.add('!bg-emerald-100', '!border-emerald-600');
        } else {
            element.classList.add('!bg-red-100', '!border-red-600');
            buttons[correct].classList.add('!bg-emerald-100', '!border-emerald-600');
        }

        setTimeout(() => {
            currentQuestion++;
            showQuestion();
        }, 1300);
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
                data: [420, 780, 1240, 1890, 2410, 3120],
                borderColor: '#166534',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });
}

// ==================== FORMULÁRIO DE CONTATO ====================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = form.querySelector('button');
        const originalText = btn.innerHTML;

        btn.innerHTML = 'Enviando...';
        btn.disabled = true;

        setTimeout(() => {
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            form.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1200);
    });
}

// ==================== INICIALIZAÇÃO GERAL ====================
function initAll() {
    // Contadores
    if (document.querySelector('.stat-number')) {
        animateCounters();
    }

    // Dicas
    const tipBox = document.getElementById('tip-box');
    if (tipBox) {
        tipBox.innerHTML = `<i class="fa-solid fa-lightbulb text-emerald-600 mr-3"></i>${tips[0]}`;
    }

    // Inicializa funções
    initQuiz();
    initChart();
    initContactForm();
}

window.onload = initAll;
