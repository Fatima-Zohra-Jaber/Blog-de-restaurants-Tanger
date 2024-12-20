
// Fonction pour récupérer les données de l'API
async function fetchRestaurants() {
    try {
        const response = await fetch("http://localhost:3000/restaurants"); 
        const data = await response.json(); 
        displayRestaurants(data); 
    } catch (error) {
        console.error("Erreur lors de la récupération des restaurants :", error);
    }
}

function displayRestaurants(data) {
    const restaurantsElement = document.getElementById("restaurants");

    data.forEach((restaurant) => {
        const restaurantElement = document.createElement("div");
        restaurantElement.className='restaurant';
        restaurantElement.innerHTML = `
            <img src="${restaurant.photo}" alt="${restaurant.nom}" >
            <h2>${restaurant.nom}</h2>
            <p>${restaurant.specialite}</p>
            <div class="review-container">
                <span>Notation:</span>
                ${createStarRating(restaurant.notation)}
                <span class="note">${restaurant.notation}</span>
            </div>
            <button onclick="window.location.href='restaurant.html?nom=${encodeURIComponent(restaurant.nom)}'">
                Détails</button>
            
        `;
        restaurantsElement.appendChild(restaurantElement);
    });
}

// Charger les restaurants au chargement de la page
fetchRestaurants();

// Fonction pour créer les étoiles
export function createStarRating(note) {
const filledWidth = (note / 5) * 100; // Pourcentage d'étoiles pleines
return `
    <div class="stars">
    <div class="filled" style="width: ${filledWidth}%;">★★★★★</div>
    </div>
`;
}



