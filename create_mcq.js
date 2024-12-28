const maxQuestions = 20; // limit for premium users = 100
// const maxQuestions = 2; // debug

function addQuestion() {

    // alert when reached max limit
    if (questionCounter >= maxQuestions) {
        alert(`You can only add up to ${maxQuestions} questions.`);
        return;
    }


    questionCounter++;
    const questionHtml = `
        <div class="question-container" id="question${questionCounter}">
            <h5>Question ${questionCounter}</h5>
            <div class="form-group">
                <label for="questionText${questionCounter}">Question Text</label>
                <input type="text" class="form-control" id="questionText${questionCounter}" name="questions[${questionCounter}][text]" placeholder="Enter question" required>
            </div>
            <div class="form-group">
                <label>Options</label>
                <div id="options${questionCounter}">
                    ${createOptionHTML(questionCounter, 1)}
                    ${createOptionHTML(questionCounter, 2)}
                    ${createOptionHTML(questionCounter, 3)}
                    ${createOptionHTML(questionCounter, 4)}
                </div>
            </div>
            <button type="button" class="btn btn-danger remove-question-btn" onclick="removeQuestion(${questionCounter})">Remove Question</button>
        </div>
    `;
    document.getElementById('questionsList').insertAdjacentHTML('beforeend', questionHtml);
}

function createOptionHTML(questionId, optionIndex) {
    return `
        <div class="form-check">
            <input class="form-check-input" type="radio" name="questions[${questionId}][correct]" id="option${questionId}${optionIndex}" value="${optionIndex - 1}">
            <label class="form-check-label" for="option${questionId}${optionIndex}">
                <input type="text" class="form-control" id="optionText${questionId}${optionIndex}" name="questions[${questionId}][options][]" placeholder="Option ${optionIndex}" required>
            </label>
        </div>
    `;
}

function removeQuestion(questionId) {
    const questionElement = document.getElementById(`question${questionId}`);
    if (questionElement) {
        questionElement.remove();
        renumberQuestions();
    }
}

function renumberQuestions() {
    const questions = document.querySelectorAll('.question-container');
    questionCounter = 0;

    questions.forEach((question, index) => {
        questionCounter++;
        prev_question_counter = (question.id)[question.id.length - 1]; // prev question counter
        question.id = `question${questionCounter}`;
        const heading = question.querySelector('h5');
        heading.textContent = `Question ${questionCounter}`;

        const questionText = question.querySelector('input[name^="questions"][name$="[text]"]');
        questionText.name = `questions[${questionCounter}][text]`;

        const options = question.querySelectorAll(`#options${prev_question_counter} .form-check`);
        
        // debug
        // alert(`Prev Question ID : ${prev_question_counter} | QUestion ID : ${question.id} | Options len : ${options.length}`);
        
        options.forEach((option, optIndex) => {
            const optionRadio = option.querySelector('input[type="radio"]');
            const optionLabel = option.querySelector('label');
            const optionInput = option.querySelector('input[type="text"]');
            // const optionInput = option.querySelector('input[name^="questions"][name$="[options][]"]');

            optionRadio.name = `questions[${questionCounter}][correct]`;
            optionRadio.id = `option${questionCounter}${optIndex + 1}`;
            optionRadio.value = optIndex;

            optionLabel.for = `option${questionCounter}${optIndex + 1}`;

            optionInput.name = `questions[${questionCounter}][options][]`;
            optionInput.id = `optionText${questionCounter}${optIndex + 1}`;
            optionInput.placeholder = `Option ${optIndex + 1}`;
        });

        const removeButton = question.querySelector('button.btn-danger');
        removeButton.onclick = () => removeQuestion(questionCounter);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addQuestionBtn').addEventListener('click', addQuestion);
});