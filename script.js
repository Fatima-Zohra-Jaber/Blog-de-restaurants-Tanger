
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
            <a href="restaurant.html?restaurant=${encodeURIComponent(JSON.stringify(restaurant))}" >
            Détails </a>
        `;
        restaurantsElement.appendChild(restaurantElement);
    });
}




// Charger les restaurants au chargement de la page
fetchRestaurants();

// Fonction pour créer les étoiles
function createStarRating(note) {
const filledWidth = (note / 5) * 100; // Pourcentage d'étoiles pleines
return `
    <div class="stars">
    <div class="filled" style="width: ${filledWidth}%;">★★★★★</div>
    </div>
`;
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith("restaurant.html")) {
        detailsRestaurant(); 
    }
    if (window.location.pathname.endsWith("admin.html")) {
        admin(); 
    }

});

// Fonction pour afficher les détails d'un restaurant
function detailsRestaurant(){
    let urlParams = new URLSearchParams(new URL(window.location.href).search);
    const restaurantJson = decodeURIComponent(urlParams.get('restaurant'));
    let restaurant = JSON.parse(restaurantJson); 
    const main= document.querySelector("main");
    const restaurantDetail= document.createElement('section');
    restaurantDetail.className ='restaurantDetail';
    
    restaurantDetail.innerHTML = ` 
            <div class="imageDetail">
                <img src="${restaurant.photo}" alt="">
            </div>
               
            <div class="textDetail">
                <h1>${restaurant.nom}</h1>
                <p><span>Spécialiste: </span>${restaurant.specialite}</p>
                <p><span>Notation: </span>${restaurant.notation}</p>
                <p><span>Avis: </span>${restaurant.avis}</p>
                <p><span>Adresse: </span>${restaurant.adresse}</p>
                <p><span>Tel: </span>${restaurant.tel}</p>
                <p><span>E-mail: </span>${restaurant.email}</p>
                <p><span>Site web: </span>${restaurant.site}</p>
            </div>`;
    main.appendChild(restaurantDetail);
}