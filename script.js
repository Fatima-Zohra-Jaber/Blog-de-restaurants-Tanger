
// Fonction pour récupérer les données de l'API
async function fetchRestaurants() {
    try {
        const response = await fetch("http://localhost:3000/restaurants"); // Faire une requête GET vers l'API
        const data = await response.json(); // Convertir la réponse en JSON
        displayRestaurants(data); // Appeler une fonction pour afficher les données
    } catch (error) {
        console.error("Erreur lors de la récupération des restaurants :", error);
    }
}

// Fonction pour afficher les restaurants dans la page
function displayRestaurants(data) {
    const restaurantsElement = document.getElementById("restaurants");
    
    data.forEach((restaurant) => {
        const restaurantElement = document.createElement("div");
        restaurantElement.innerHTML = `
            <img src="${restaurant.photo}" alt="${restaurant.nom}">
            <h2>${restaurant.nom}</h2>
            <p>Note : ${restaurant.notation}</p>
            <p>Téléphone : ${restaurant.tel}</p>
        `;
        restaurantsElement.appendChild(restaurantElement);
    });
}

// Charger les restaurants au chargement de la page
fetchRestaurants();

