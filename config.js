function enableFields() {
    document.querySelector('input[name="quiz_exp"]').removeAttribute('disabled');
}

document.getElementById('timer').addEventListener('input', function() {
    const value = this.value;
    if (value < 1 || value > 30) {
        this.setCustomValidity('Please enter a value between 1 and 30.');
    } else {
        this.setCustomValidity('');
    }
});