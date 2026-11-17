$(function () {

    const wordSets = {
        easy: [
            { english: "Apple", translation: "яблуко" },
            { english: "House", translation: "будинок" },
            { english: "Water", translation: "вода" },
            { english: "Friend", translation: "друг" },
            { english: "School", translation: "школа" },
            { english: "Book", translation: "книга" },
            { english: "Window", translation: "вікно" },
            { english: "Family", translation: "сім'я" },
            { english: "Morning", translation: "ранок" },
            { english: "Garden", translation: "сад" },
            { english: "Chair", translation: "стілець" },
            { english: "Table", translation: "стіл" },
            { english: "Summer", translation: "літо" },
            { english: "Winter", translation: "зима" },
            { english: "Village", translation: "село" },
            { english: "Dog", translation: "собака" },
            { english: "Cat", translation: "кіт" },
            { english: "Bread", translation: "хліб" },
            { english: "Milk", translation: "молоко" },
            { english: "Flower", translation: "квітка" },
            { english: "Mother", translation: "мати" },
            { english: "Father", translation: "батько" },
            { english: "Brother", translation: "брат" },
            { english: "Sister", translation: "сестра" },
            { english: "Road", translation: "дорога" },
            { english: "Sun", translation: "сонце" },
            { english: "Moon", translation: "місяць" },
            { english: "Door", translation: "двері" },
            { english: "Kitchen", translation: "кухня" },
            { english: "Bedroom", translation: "спальня" }
        ],

        medium: [
            { english: "Achievement", translation: "досягнення" },
            { english: "Environment", translation: "середовище" },
            { english: "Opportunity", translation: "можливість" },
            { english: "Knowledge", translation: "знання" },
            { english: "Behaviour", translation: "поведінка" },
            { english: "Experience", translation: "досвід" },
            { english: "Improvement", translation: "покращення" },
            { english: "Relationship", translation: "стосунки" },
            { english: "Responsibility", translation: "відповідальність" },
            { english: "Challenge", translation: "виклик" },
            { english: "Decision", translation: "рішення" },
            { english: "Advantage", translation: "перевага" },
            { english: "Purpose", translation: "мета" },
            { english: "Development", translation: "розвиток" },
            { english: "Confidence", translation: "впевненість" },
            { english: "Education", translation: "освіта" },
            { english: "Communication", translation: "спілкування" },
            { english: "Competition", translation: "змагання" },
            { english: "Knowledgeable", translation: "обізнаний" },
            { english: "Solution", translation: "розв'язання" },
            { english: "Agreement", translation: "угода" },
            { english: "Community", translation: "спільнота" },
            { english: "Attention", translation: "увага" },
            { english: "Influence", translation: "вплив" },
            { english: "Requirement", translation: "вимога" },
            { english: "Curiosity", translation: "цікавість" },
            { english: "Determination", translation: "рішучість" },
            { english: "Confidence", translation: "впевненість" },
            { english: "Permission", translation: "дозвіл" },
            { english: "Announcement", translation: "оголошення" }
        ],

        hard: [
            { english: "Consciousness", translation: "свідомість" },
            { english: "Entrepreneurship", translation: "підприємництво" },
            { english: "Sustainability", translation: "сталість" },
            { english: "Misconception", translation: "хибне уявлення" },
            { english: "Comprehensive", translation: "всебічний" },
            { english: "Inevitable", translation: "неминучий" },
            { english: "Ambiguous", translation: "неоднозначний" },
            { english: "Resilience", translation: "стійкість" },
            { english: "Substantial", translation: "значний" },
            { english: "Reluctance", translation: "небажання" },
            { english: "Controversial", translation: "суперечливий" },
            { english: "Accountability", translation: "підзвітність" },
            { english: "Acquisition", translation: "набуття" },
            { english: "Discrepancy", translation: "невідповідність" },
            { english: "Sophisticated", translation: "складний" },
            { english: "Deterioration", translation: "погіршення" },
            { english: "Hypothesis", translation: "гіпотеза" },
            { english: "Predominant", translation: "переважний" },
            { english: "Feasibility", translation: "здійсненність" },
            { english: "Obligation", translation: "зобов'язання" },
            { english: "Unprecedented", translation: "безпрецедентний" },
            { english: "Interpretation", translation: "тлумачення" },
            { english: "Implication", translation: "наслідок" },
            { english: "Inherent", translation: "властивий" },
            { english: "Vulnerability", translation: "вразливість" },
            { english: "Meticulous", translation: "ретельний" },
            { english: "Adversity", translation: "труднощі" },
            { english: "Diligence", translation: "старанність" },
            { english: "Discretion", translation: "розсудливість" },
            { english: "Predicament", translation: "скрутне становище" }
        ]
    };

    let currentWords = [];
    let currentIndex = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let answerChecked = false;
    let selectedLevel = "easy";

    function startGame() {

        currentWords = wordSets[selectedLevel].slice()
            .sort(function () {
                return Math.random() - 0.5;
            })
            .slice(0, 10);

        currentIndex = 0;
        correctCount = 0;
        incorrectCount = 0;
        answerChecked = false;

        $("#correct-count").text(correctCount);
        $("#incorrect-count").text(incorrectCount);

        $("#result-modal").hide();

        showWord();
    }

    function showWord() {

        if (currentIndex >= currentWords.length) {
            showResult();
            return;
        }

        $("#english-word").text(currentWords[currentIndex].english);

        $("#step").text((currentIndex + 1) + " / " + currentWords.length);

        $("#progress-bar").css(
            "width",
            ((currentIndex + 1) / currentWords.length * 100) + "%"
        );

        $("#translation-input").val("");

        $("#message")
            .text("Введи переклад слова.")
            .removeClass("success error");

        answerChecked = false;
    }

    function checkAnswer() {

        if (answerChecked) {
            return;
        }

        const userAnswer = $("#translation-input").val().trim().toLowerCase();

        if (userAnswer === "") {

            $("#message")
                .text("Спочатку введи переклад слова.")
                .removeClass("success")
                .addClass("error");

            $("#translation-input").focus();

            return;
        }

        const correctAnswer = currentWords[currentIndex].translation.toLowerCase();

        if (userAnswer === correctAnswer) {

            correctCount++;

            $("#message")
                .text("Правильно! Молодець!")
                .removeClass("error")
                .addClass("success");

        } else {

            incorrectCount++;

            $("#message")
                .text("Неправильно. Правильна відповідь: " + currentWords[currentIndex].translation)
                .removeClass("success")
                .addClass("error");
        }

        answerChecked = true;

        $("#correct-count").text(correctCount);
        $("#incorrect-count").text(incorrectCount);

        setTimeout(function () {
            currentIndex++;
            showWord();
        }, 1100);
    }

    function showResult() {

        const percentage = Math.round(
            correctCount / currentWords.length * 100
        );

        let level = "";

        if (percentage >= 90) {
            level = "Відмінний результат! Ти чудово знаєш ці слова.";
        } else if (percentage >= 70) {
            level = "Хороший результат! Продовжуй практикуватися.";
        } else if (percentage >= 50) {
            level = "Непоганий початок. Є над чим попрацювати.";
        } else {
            level = "Потрібно ще потренуватися. Не зупиняйся!";
        }

        $("#final-score").text(percentage + "%");
        $("#final-correct").text(correctCount);
        $("#final-incorrect").text(incorrectCount);

        $("#level-text").text(level);

        $("#result-modal").css("display", "flex");
    }

    $(".level-button").on("click", function () {

        selectedLevel = $(this).data("level");

        $(".level-button").removeClass("active");

        $(this).addClass("active");

        startGame();
    });

    $("#word-card").on("click", checkAnswer);

    $("#translation-input").on("keydown", function (event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    $("#restart-button").on("click", startGame);

    startGame();

});
