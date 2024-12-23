
const restaurantsElement = document.getElementById("restaurants");

document.addEventListener('DOMContentLoaded', () => {

    fetchRestaurants();

    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', () => {
        restaurantsElement.innerHTML = "";
        searchRestaurant();
    });
});

// Fonction pour récupérer les données de l'API
async function fetchRestaurants() {
    try {
        const response = await fetch("http://localhost:3000/restaurants"); 
        const data = await response.json(); 
        if (data.length === 0) {
            restaurantsElement.innerHTML = "Aucun restaurant trouvé";
            return;
        }
        displayRestaurants(data); 
    } catch (error) {
        console.error("Erreur lors de la récupération des restaurants :", error);
        restaurantsElement.innerHTML = `
            <div style="color:red; text-align:center;">
                Erreur de chargement : ${error.message}
                <br>Vérifiez que le serveur est actif.
            </div>`;
    }
}


function displayRestaurants(data) {
    data.forEach((restaurant) => {
        displayRestaurant(restaurant);
    
    });
}

function displayRestaurant(restaurant) {
    const restaurantElement = document.createElement("div");
    restaurantElement.className='restaurant';
    restaurantElement.innerHTML = `
        <img src="${restaurant.photo}" alt="${restaurant.nom}" >
        <h2>${restaurant.nom}</h2>
        <p>${restaurant.specialite}</p>
        <div class="review-container">
            ${createStarRating(restaurant.notation)}
            <span class="note">${restaurant.notation}</span>
        </div>
        <button onclick="window.location.href='restaurant.html?nom=${encodeURIComponent(restaurant.nom)}'">
            Détails</button>
        
    `;
    restaurantsElement.appendChild(restaurantElement);
}


// Fonction pour créer les étoiles
function createStarRating(note) {
const filledWidth = (note / 5) * 100; // Pourcentage d'étoiles pleines
return `
    <div class="stars">
    <div class="filled" style="width: ${filledWidth}%;">★★★★★</div>
    </div>
`;
}

 async function searchRestaurant(){
    const nomRestaurant = document.getElementById("inputName").value;
    
    try {
        const response = await fetch(`http://localhost:3000/restaurants/nom/${encodeURIComponent(nomRestaurant)}`);
        if (!response.ok) {
            // throw new Error('Restaurant non trouvé');
            restaurantsElement.innerHTML = "<p>Restaurant non trouvé</p>";
            return;
        }
        const restaurant = await response.json();
        restaurantsElement.innerHTML = '';
            displayRestaurant(restaurant);
        } catch (error) {
        console.error("Erreur lors de la récupération des détails du restaurant :", error);
        restaurantsElement.innerHTML = "<p>Erreur de recherche</p>";
    }

}
