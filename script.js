document.addEventListener('DOMContentLoaded', function() {
  const recipeForm = document.getElementById('recipe-form');
  const recipeList = document.getElementById('recipe-list');

  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyCl6T4yMizGFHM0TLzlum2e_hRnFL_A8CA",
    authDomain: "book-recipe-kroni.firebaseapp.com",
    projectId: "book-recipe-kroni",
    storageBucket: "book-recipe-kroni.appspot.com",
    messagingSenderId: "8274186383",
    appId: "1:8274186383:web:dea74fb444e6d3f8b060fa"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  // Function to save recipe to Firestore
  recipeForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const recipeName = document.getElementById('recipe-name').value;
      const recipeCategory = document.getElementById('recipe-category').value;
      const recipeIngredients = document.getElementById('recipe-ingredients').value;

      // Add recipe to Firestore
      db.collection("recipes").add({
          name: recipeName,
          category: recipeCategory,
          ingredients: recipeIngredients
      }).then(() => {
          console.log("Recipe saved!");
          // Clear form inputs after saving
          recipeForm.reset();
          // Display recipes of the selected category
          displayRecipesByCategory(recipeCategory);
      }).catch(error => {
          console.error("Error saving recipe: ", error);
      });
  });

  // Function to display recipes based on category
  function displayRecipesByCategory(category) {
      recipeList.innerHTML = ''; // Clear existing recipes

      // Query Firestore for recipes of the selected category
      db.collection("recipes").where("category", "==", category)
          .get()
          .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                  const recipeData = doc.data();
                  const recipeItem = `
                      <div class="recipe-item">
                          <h3>${recipeData.name}</h3>
                          <p><strong>Category:</strong> ${recipeData.category}</p>
                          <p><strong>Ingredients:</strong> ${recipeData.ingredients}</p>
                      </div>
                  `;
                  recipeList.insertAdjacentHTML('beforeend', recipeItem);
              });
          })
          .catch(error => {
              console.log("Error getting recipes: ", error);
          });
  }

  // Event listener for category dropdown change
  document.getElementById('recipe-category').addEventListener('change', function() {
      const selectedCategory = this.value;
      if (selectedCategory) {
          displayRecipesByCategory(selectedCategory);
      }
  });

  // Initial display of recipes
  const initialCategory = document.getElementById('recipe-category').value;
  if (initialCategory) {
      displayRecipesByCategory(initialCategory);
  }
});
