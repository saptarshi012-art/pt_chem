document.addEventListener("DOMContentLoaded", function () {
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    document.body.appendChild(tooltip);

    Object.assign(tooltip.style, {
        position: "absolute",
        padding: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        borderRadius: "5px",
        display: "none",
        fontSize: "14px",
        pointerEvents: "none"
    });

    const elementData = {
        "H": { number: 1, name: "Hydrogen", weight: "1.008", symbol: "💧" },
        "He": { number: 2, name: "Helium", weight: "4.0026", symbol: "🎈" },
        "Li": { number: 3, name: "Lithium", weight: "6.94", symbol: "🔋" },
        "Be": { number: 4, name: "Beryllium", weight: "9.0122", symbol: "💎" },
        "B": { number: 5, name: "Boron", weight: "10.81", symbol: "🛡️" },
        "C": { number: 6, name: "Carbon", weight: "12.011", symbol: "💎" },
        "N": { number: 7, name: "Nitrogen", weight: "14.007", symbol: "🌱" },
        "O": { number: 8, name: "Oxygen", weight: "15.999", symbol: "🍃" },
        "F": { number: 9, name: "Fluorine", weight: "18.998", symbol: "⚡" },
        "Ne": { number: 10, name: "Neon", weight: "20.180", symbol: "💡" }
    };

    document.querySelectorAll(".ele").forEach((ele) => {
        const symbol = ele.querySelector(".ele-name").textContent.trim();

        if (elementData[symbol]) {
            const data = elementData[symbol];

            ele.addEventListener("mouseenter", function (event) {
                tooltip.innerHTML = `<strong>${data.name} (${symbol}) ${data.symbol}</strong><br>Atomic Number: ${data.number}<br>Weight: ${data.weight}`;
                tooltip.style.display = "block";
                tooltip.style.left = `${event.pageX + 15}px`;
                tooltip.style.top = `${event.pageY + 15}px`;
                tooltip.style.opacity = "1";
                ele.style.transform = "rotateY(15deg) rotateX(15deg)";
                ele.style.transition = "transform 0.3s ease";
                ele.style.boxShadow = "0px 5px 15px rgba(255, 255, 0, 0.7)";
            });

            ele.addEventListener("mouseleave", function () {
                tooltip.style.display = "none";
                ele.style.transform = "rotateY(0deg) rotateX(0deg)";
                ele.style.boxShadow = "none";
            });

            ele.addEventListener("mousemove", function (event) {
                tooltip.style.left = `${event.pageX + 15}px`;
                tooltip.style.top = `${event.pageY + 15}px`;
            });
        }
    });

    // Search Feature
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search element";
    searchInput.style.padding = "10px";
    searchInput.style.width = "250px";
    searchInput.style.fontSize = "16px";

    const searchButton = document.createElement("button");
    searchButton.innerText = "Search";
    searchButton.style.marginLeft = "10px";
    searchButton.style.padding = "10px";
    searchButton.style.fontSize = "16px";
    searchButton.style.cursor = "pointer";

    document.body.prepend(searchInput, searchButton);

    searchButton.addEventListener("click", function () {
        const searchTerm = searchInput.value.trim().toLowerCase();
        let found = false;
        
        document.querySelectorAll(".ele").forEach((ele) => {
            const symbol = ele.querySelector(".ele-name").textContent.trim();
            const data = elementData[symbol];
            if (data && (symbol.toLowerCase() === searchTerm || data.name.toLowerCase() === searchTerm)) {
                ele.style.border = "3px solid yellow";
                found = true;
                setTimeout(() => {
                    ele.style.border = "thin solid black";
                }, 3000);
            }
        });

        if (!found) {
            alert("No element found!");
        }
    });

    // Quiz Feature
    const quizQuestions = [
        { question: "Which element has the symbol 'O'?", answer: "oxygen" },
        { question: "Which element is the lightest?", answer: "hydrogen" },
        { question: "What is the symbol for gold?", answer: "au" },
        { question: "Which noble gas has atomic number 10?", answer: "neon" },
        { question: "Which element is used in batteries and has the symbol 'Li'?", answer: "lithium" }
    ];

    const quizContainer = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.style.fontSize = "18px";
    questionText.style.color = "yellow";
    
    const answerInput = document.createElement("input");
    answerInput.type = "text";
    answerInput.placeholder = "Your Answer";

    const submitButton = document.createElement("button");
    submitButton.innerText = "Submit";
    
    const newQuestionButton = document.createElement("button");
    newQuestionButton.innerText = "New Question";
    
    const feedback = document.createElement("p");
    feedback.style.fontSize = "16px";

    quizContainer.append(questionText, answerInput, submitButton, newQuestionButton, feedback);
    document.body.appendChild(quizContainer);

    function getRandomQuestion() {
        const randomQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
        questionText.innerText = randomQuestion.question;
        answerInput.value = "";
        feedback.innerText = "";
    }

    newQuestionButton.addEventListener("click", getRandomQuestion);
    submitButton.addEventListener("click", function () {
        const userAnswer = answerInput.value.trim().toLowerCase();
        const correctAnswer = quizQuestions.find(q => q.question === questionText.innerText).answer;
        feedback.innerText = userAnswer === correctAnswer ? "✅ Correct!" : `❌ Wrong! The correct answer is: ${correctAnswer}`;
        feedback.style.color = userAnswer === correctAnswer ? "lightgreen" : "red";
    });

    getRandomQuestion();
});