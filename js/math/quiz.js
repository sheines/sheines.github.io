function submitQuiz() {
    const questions = document.querySelectorAll('.question');

    const totalQuestions = questions.length;

    let correctCount = 0;
    let correctAnswers = '';

    for (let i = 0; i < totalQuestions; i++) {
        const selectedOption = questions[i].querySelector('input:checked');

        if (selectedOption) {
            const answer = selectedOption.value;
            if (i === 0 && (answer === 'Berlin' || answer === 'Oslo')) {
                correctCount++;
                correctAnswers += '<p>Frage 1: Richtig!</p>';
                document.getElementById("q1").style.color = "green";
            } else if (i === 1 && (answer === 'Seine')) {
                correctCount++;
                correctAnswers += '<p>Frage 2: Richtig!</p>';
                document.getElementById("q2").style.color = "green";
            }
        }
        const resultContainer = document.getElementById("result");
        const scoreContainer = document.getElementById("score");
        const correctAnswersContainer = document.getElementById("correct-answers");

        scoreContainer.innerHTML = `<p>Du hast ${correctCount} von ${totalQuestions} richtig beantwortet.</p>`;
        correctAnswersContainer.innerHTML = correctAnswers;
        resultContainer.style.display = 'block';
    }
}