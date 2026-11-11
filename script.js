$(function () {

    const words = [
        { english: "Apple", translation: "яблуко" },
        { english: "Book", translation: "книга" },
        { english: "Window", translation: "вікно" },
        { english: "Friend", translation: "друг" },
        { english: "Water", translation: "вода" },
        { english: "House", translation: "будинок" },
        { english: "School", translation: "школа" },
        { english: "Flower", translation: "квітка" },
        { english: "Morning", translation: "ранок" },
        { english: "Travel", translation: "подорож" },
        { english: "Computer", translation: "комп'ютер" },
        { english: "Chair", translation: "стілець" },
        { english: "Table", translation: "стіл" },
        { english: "Garden", translation: "сад" },
        { english: "Family", translation: "сім'я" },
        { english: "Beautiful", translation: "гарний" },
        { english: "Important", translation: "важливий" },
        { english: "Knowledge", translation: "знання" },
        { english: "Journey", translation: "подорож" },
        { english: "Language", translation: "мова" },
        { english: "Mountain", translation: "гора" },
        { english: "Picture", translation: "картина" },
        { english: "Question", translation: "питання" },
        { english: "Answer", translation: "відповідь" },
        { english: "Summer", translation: "літо" },
        { english: "Winter", translation: "зима" },
        { english: "Evening", translation: "вечір" },
        { english: "Morning", translation: "ранок" },
        { english: "Village", translation: "село" },
        { english: "World", translation: "світ" }
    ];

    let currentWords = [];
    let currentIndex = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let answerChecked = false;

    function startGame() {

        currentWords = words.slice().sort(function () {
            return Math.random() - 0.5;
        }).slice(0, 10);

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
                .text("Правильно!")
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
            level = "Відмінний результат!";
        } else if (percentage >= 70) {
            level = "Хороший результат!";
        } else if (percentage >= 50) {
            level = "Непоганий початок.";
        } else {
            level = "Потрібно ще потренуватися.";
        }

        $("#final-score").text(percentage + "%");
        $("#final-correct").text(correctCount);
        $("#final-incorrect").text(incorrectCount);

        $("#level-text").text(level);

        $("#result-modal").css("display", "flex");
    }

    $("#word-card").on("click", checkAnswer);

    $("#translation-input").on("keydown", function (event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    $("#restart-button").on("click", startGame);

    startGame();

});