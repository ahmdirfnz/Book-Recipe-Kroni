document.querySelectorAll('.addRecipeBtn').forEach(function(button) {
    button.addEventListener('click', function() {
        this.nextElementSibling.style.display = 'block';
    });
});

function goBack() {
    window.history.back();
}
document.getElementById("currentYear").innerHTML = new Date().getFullYear();