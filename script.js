const CORRECT_PASS = "SOUHAILPK22";

const unlockBtn = document.getElementById("unlock-btn");
const passInput = document.getElementById("passcode-input");
const errorMsg = document.getElementById("error-msg");
const airlockScreen = document.getElementById("airlock-screen");
const mainLibrary = document.getElementById("main-library");
const mozartAudio = document.getElementById("mozart-audio");

unlockBtn.addEventListener("click", () => {
    if (passInput.value === CORRECT_PASS) {
        airlockScreen.classList.add("hidden");
        mainLibrary.classList.remove("hidden");
        
        // تشغيل معزوفة موزارت
        mozartAudio.play().catch(err => console.log("Audio play blocked: ", err));
    } else {
        errorMsg.classList.remove("hidden");
        passInput.style.borderColor = "#ff4d4d";
    }
});

// قاعدة بيانات الأسئلة
const databases = {
    eco: [
        {
            q: "Selon la théorie économique, que désigne le terme 'économie de marché' ?",
            options: [
                "Un modèle où la coordination s'opère par la confrontation de l'offre et de la demande",
                "Un système de planification centrale dirigé par l'État",
                "Un système fondé exclusivement sur le troc sans monnaie",
                "Un marché fermé sans aucune concurrence"
            ],
            correct: 0
        },
        {
            q: "Selon la loi de la demande (A. Marshall), que se passe-t-il lorsque le prix d'un bien augmente ?",
            options: [
                "La quantité demandée augmente",
                "La quantité demandée diminue, toutes choses égales par ailleurs",
                "La demande reste strictement inchangée",
                "L'offre diminue immédiatement"
            ],
            correct: 1
        },
        {
            q: "Qu'est-ce qu'un 'bien de Giffen' ?",
            options: [
                "Un bien de luxe acheté par ostentation",
                "Un bien de première nécessité dont la demande augmente lorsque son prix augmente",
                "Un bien dont l'élasticité-prix est strictement nulle",
                "Un bien intermédiaire réservé aux entreprises"
            ],
            correct: 1
        },
        {
            q: "Quelles sont les conditions fondamentales de la Concurrence Pure et Parfaite (CPP) ?",
            options: [
                "Monopole, oligopole, opacité, barrières",
                "Atomicité, homogénéité, libre entrée/sortie, transparence, mobilité des facteurs",
                "Régulation étatique, taxes, subventions, quotas",
                "Inflation, déflation, stagflation, croissance"
            ],
            correct: 1
        }
    ],
    droit: [
        {
            q: "Comment est définie la 'règle de droit' (Droit objectif) ?",
            options: [
                "Une règle morale individuelle et facultative",
                "Une règle générale, abstraite, obligatoire et sanctionnée par l'autorité publique",
                "Une recommandation religieuse sans sanction",
                "Un contrat privé modifiable à tout moment"
            ],
            correct: 1
        },
        {
            q: "Quelle est la différence entre une règle impérative et une règle supplétive ?",
            options: [
                "La règle impérative s'impose à tous (ordre public), tandis que la règle supplétive s'applique à défaut de volonté contraire",
                "La règle supplétive ne s'applique qu'en droit pénal",
                "Il n'y a aucune différence",
                "La règle impérative peut être écartée par un simple accord"
            ],
            correct: 0
        },
        {
            q: "À quelle grande branche du droit appartient le 'Droit Commercial' ?",
            options: [
                "Au droit public",
                "Au droit privé",
                "Au droit international public",
                "Au droit constitutionnel"
            ],
            correct: 1
        },
        {
            q: "Quel organe exerce le pouvoir législatif au Maroc selon l'article 70 de la Constitution de 2011 ?",
            options: [
                "Le Gouvernement",
                "Le Parlement (Chambre des représentants et Chambre des conseillers)",
                "La Cour Constitutionnelle",
                "Les collectivités territoriales"
            ],
            correct: 1
        }
    ]
};

let currentQuizData = [];
let currentIndex = 0;

function loadQuiz(type) {
    currentQuizData = databases[type];
    currentIndex = 0;
    document.getElementById("quiz-box").classList.remove("hidden");
    showQuestion();
}

function showQuestion() {
    if (currentIndex >= currentQuizData.length) {
        document.getElementById("question-title").innerText = "Félicitations ! Vous avez terminé ce test. / أحسنت، أنهيت الاختبار!";
        document.getElementById("options-container").innerHTML = "";
        document.getElementById("feedback-msg").innerText = "";
        document.getElementById("next-btn").classList.add("hidden");
        return;
    }

    const qItem = currentQuizData[currentIndex];
    document.getElementById("question-title").innerText = `Question ${currentIndex + 1} : ${qItem.q}`;
    
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
    document.getElementById("feedback-msg").innerText = "";
    document.getElementById("next-btn").classList.add("hidden");

    qItem.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.className = "option-btn";
        btn.onclick = () => checkAnswer(index, qItem.correct);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected, correct) {
    const feedback = document.getElementById("feedback-msg");
    const qItem = currentQuizData[currentIndex];
    
    if (selected === correct) {
        feedback.style.color = "#22c55e";
        feedback.innerText = "Réponse correcte ! 🚀 إجابة صحيحة";
    } else {
        feedback.style.color = "#ff4d4d";
        feedback.innerText = `Réponse incorrecte ❌. La bonne réponse : "${qItem.options[correct]}"`;
    }
    
    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach(b => b.disabled = true);
    
    document.getElementById("next-btn").classList.remove("hidden");
}

function nextQuestion() {
    currentIndex++;
    showQuestion();
}