// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';

// TODO: Replace the following with your app's Firebase project configuration
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCl6T4yMizGFHM0TLzlum2e_hRnFL_A8CA",
    authDomain: "book-recipe-kroni.firebaseapp.com",
    projectId: "book-recipe-kroni",
    storageBucket: "book-recipe-kroni.appspot.com",
    messagingSenderId: "8274186383",
    appId: "1:8274186383:web:dea74fb444e6d3f8b060fa"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function() {
    const recipeForm = document.getElementById('recipeForm');
    const mainSection = document.querySelector('main');
    const addRecipeBtn = document.querySelector('.addRecipeBtn');
    const addRecipeForm = document.querySelector('.addRecipeForm');

        // Toggle form visibility
        addRecipeBtn.addEventListener('click', function() {
            if (addRecipeForm.style.display === 'none' || addRecipeForm.style.display === '') {
                addRecipeForm.style.display = 'block';
            } else {
                addRecipeForm.style.display = 'none';
            }
        });

        recipeForm.addEventListener('submit', async function(e) {
            e.preventDefault();
        
            const recipeName = document.getElementById('recipeName').value;
            const recipeCategory = document.getElementById('recipeCategory').value;
            const recipeIngredients = document.getElementById('recipeIngredients').value;
            const recipeInstructions = document.getElementById('recipeInstructions').value;
        
            try {
                await addDoc(collection(db, "recipes"), {
                    name: recipeName,
                    category: recipeCategory,
                    ingredients: recipeIngredients,
                    instructions: recipeInstructions
                });
                console.log("Recipe saved!");
                recipeForm.reset();
                displayRecipes(); // Refresh the recipes display
                addRecipeForm.style.display = 'none'; // Close the form
            } catch (error) {
                console.error("Error saving recipe: ", error);
            }
        });
        

        async function displayRecipes() {
            const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert'];
            mainSection.innerHTML = ''; // Clear existing content
        
            for (const category of categories) {
                const section = document.createElement('section');
                section.id = category.toLowerCase();
                section.innerHTML = `<h2>${category}</h2><div class="recipes-container"></div>`;
                mainSection.appendChild(section);
        
                const q = query(collection(db, "recipes"), where("category", "==", category));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    const recipe = doc.data();
                    const card = document.createElement('div');
                    card.classList.add('recipe-card');
                    card.innerHTML = `
                        <h3>${recipe.name}</h3>
                        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                        <p><strong>Instructions:</strong> ${recipe.instructions}</p>
                    `;
                    section.querySelector('.recipes-container').appendChild(card);
                });
            }
        }
        

    displayRecipes();
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
