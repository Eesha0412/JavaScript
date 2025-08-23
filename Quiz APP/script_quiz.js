const quizzes = [
    {
        id: "facts",
        title: "Facts Quiz",
        description: "Fun trivia and random facts!",
        questions: [
            {
                question: "Which is the largest animal in the world?",
                options: [
                    { value: "Colossal Squid", correct: false },
                    { value: "Blue Whale", correct: true },
                    { value: "Elephant", correct: false },
                    { value: "Saltwater crocodile", correct: false }
                ]
            },
            {
                question: "Which is the tallest mountain?",
                options: [
                    { value: "Mount Everest", correct: true },
                    { value: "K2", correct: false },
                    { value: "Kangchenjunga", correct: false },
                    { value: "Makalu", correct: false }
                ]
            },
            {
                question: "With an average altitude of 1.56 miles, what is the highest continent?",
                options: [
                    { value: "Europe", correct: false },
                    { value: "Antarctica", correct: true },
                    { value: "North America", correct: false },
                    { value: "Asia", correct: false }
                ]
            },
            {
                question: "In which city would you find the world’s tallest building?",
                options: [
                    { value: "Taipei", correct: false },
                    { value: "Shanghai", correct: false },
                    { value: "Dubai", correct: true },
                    { value: "New York City", correct: false }
                ]
            }
        ]
    },
    {
        id: "science",
        title: "Science Quiz",
        description: "Test your science knowledge!",
        questions: [
            {
                question: "What is the chemical symbol for water?",
                options: [
                    { value: "WO", correct: false },
                    { value: "H2O", correct: true },
                    { value: "HO2", correct: false },
                    { value: "O2H", correct: false }
                ]
            },
            {
                question: "Which gas do plants release during photosynthesis?",
                options: [
                    { value: "Carbon Dioxide", correct: false },
                    { value: "Oxygen", correct: true },
                    { value: "Nitrogen", correct: false },
                    { value: "Hydrogen", correct: false }
                ]
            },
            {
                question: "What is the powerhouse of the cell?",
                options: [
                    { value: "Nucleus", correct: false },
                    { value: "Mitochondria", correct: true },
                    { value: "Ribosome", correct: false },
                    { value: "Golgi Apparatus", correct: false }
                ]
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: [
                    { value: "Venus", correct: false },
                    { value: "Mars", correct: true },
                    { value: "Jupiter", correct: false },
                    { value: "Saturn", correct: false }
                ]
            },
        ]
    },
    {
        id: "geography",
        title: "Geography Quiz",
        description: "Explore countries & capitals!",
        questions: [
            {
                question: "Which is the largest desert in the world?",
                options: [
                    { value: "Sahara", correct: false },
                    { value: "Antarctic Desert", correct: true },
                    { value: "Gobi", correct: false },
                    { value: "Arabian", correct: false }
                ]
            },
            {
                question: "Which is the largest continent on Earth?",
                options: [
                    { value: "Africa", correct: false },
                    { value: "Asia", correct: true },
                    { value: "North America", correct: false },
                    { value: "Europe", correct: false }
                ]
            },
            {
                question: "Which river is the longest in the world?",
                options: [
                    { value: "Amazon River", correct: false },
                    { value: "Nile River", correct: true },
                    { value: "Yangtze River", correct: false },
                    { value: "Mississippi River", correct: false }
                ]
            },
            {
                question: "Which country has the most natural lakes?",
                options: [
                    { value: "USA", correct: false },
                    { value: "Canada", correct: true },
                    { value: "Russia", correct: false },
                    { value: "Brazil", correct: false }
                ]
            }
        ]
    },
    {
        id: "tech",
        title: "Tech Quiz",
        description: "All about technology trends!",
        questions: [
            {
                question: "What does HTML stand for?",
                options: [
                    { value: "Hyperlinks and Text Markup Language", correct: false },
                    { value: "HyperText Markup Language", correct: true },
                    { value: "Home Tool Markup Language", correct: false },
                    { value: "Hyperlinking Text Management Language", correct: false }
                ]
            },
            {
                question: "What does CPU stand for?",
                options: [
                    { value: "Central Processing Unit", correct: true },
                    { value: "Computer Personal Unit", correct: false },
                    { value: "Central Performance Utility", correct: false },
                    { value: "Control Processing Unit", correct: false }
                ]
            },
            {
                question: "Who is known as the father of the World Wide Web?",
                options: [
                    { value: "Bill Gates", correct: false },
                    { value: "Tim Berners-Lee", correct: true },
                    { value: "Steve Jobs", correct: false },
                    { value: "Mark Zuckerberg", correct: false }
                ]
            },
            {
                question: "Which company developed the Android operating system?",
                options: [
                    { value: "Apple", correct: false },
                    { value: "Microsoft", correct: false },
                    { value: "Google", correct: true },
                    { value: "Samsung", correct: false }
                ]
            }
        ]
    }
];

const home = document.getElementById("home");
const play = document.getElementById("play");
const quizList = document.getElementById("quiz-list");
const quizTitle = document.getElementById("quiz-title");
const quizAppHeading = document.getElementById("quiz-app-heading");

const questionElement = document.getElementById("question");
const options = document.getElementById("options");
const next = document.getElementById("next-btn");
const homeBtn = document.getElementById("home-btn");

let currentQuizIndex = -1;
let currentQuesIndex = 0;
let score = 0;

function showHomePage() {
    quizAppHeading.style.display = "block";
    const cardsContainer = document.querySelector(".cards-container");
    cardsContainer.innerHTML = "";
    quizzes.forEach((q, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
        <div class="card-inner">
        <div class="card-front">${q.title}</div>
        <div class="card-back">${q.description}</div>
        </div>
        `;
        card.addEventListener("click", () => startQuiz(index));
        cardsContainer.appendChild(card);
    });
    home.hidden = false;
    play.hidden = true;
}

function startQuiz(quizIndex) {
    quizAppHeading.style.display = "none";
    currentQuizIndex = quizIndex;
    currentQuesIndex = 0;
    score = 0;
    quizTitle.textContent = quizzes[quizIndex].title;
    next.innerHTML = "Next Question";
    home.hidden = true;
    play.hidden = false;
    showQuestion();
}

function showQuestion() {
    resetState();
    let currQuestion = quizzes[currentQuizIndex].questions[currentQuesIndex];
    let quesNo = currentQuesIndex + 1;
    questionElement.innerHTML = quesNo + ". " + currQuestion.question;

    currQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerHTML = option.value;
        button.classList.add("btn");
        // options.appendChild(button);
        if (option.correct) {
            button.dataset.correct = option.correct;
        }
        button.addEventListener("click", selectOption);
        options.appendChild(button);
    });
    // if last question → show "End Quiz", else show "Next Question"
    if (currentQuesIndex === quizzes[currentQuizIndex].questions.length - 1) {
        next.innerHTML = "End Quiz";
    } else {
        next.innerHTML = "Next Question";
    }
    next.style.display = "none";
}

function resetState() {
    next.style.display = "none";
    while (options.firstChild) {
        options.removeChild(options.firstChild);
    }
}

function selectOption(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    }
    else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(options.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    next.style.display = "block";

}

function showScore(currentQuizIndex) {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${quizzes[currentQuizIndex].questions.length}!`;
    next.innerHTML = "Play Again!";
    next.style.display = "block";
    console.log('current quiz index: ', currentQuizIndex);
    // clear any old event handler
    next.onclick = null;

    // now assign fresh handler
    next.onclick = () => startQuiz(currentQuizIndex);
}

function handleNextButton() {
    currentQuesIndex++;
    if (currentQuesIndex < quizzes[currentQuizIndex].questions.length) {
        showQuestion();
    }
    else {
        showScore(currentQuizIndex);
    }
}

next.addEventListener("click", () => {
    if (currentQuesIndex < quizzes[currentQuizIndex].questions.length) {
        handleNextButton();
    }
    else {
        showHomePage();
    }
})

homeBtn.addEventListener("click", showHomePage);

showHomePage();