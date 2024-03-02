document.querySelectorAll('.addRecipeBtn').forEach(function(button) {
    button.addEventListener('click', function() {
        this.nextElementSibling.style.display = 'block';
    });
});

  