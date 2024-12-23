


// Fonction pour récupérer les données de l'API
async function fetchRestaurant() {
    const urlParams = new URLSearchParams(window.location.search);
    const nomRestaurant = urlParams.get('nom');

    try {
        const response = await fetch(`http://localhost:3000/restaurants/nom/${encodeURIComponent(nomRestaurant)}`);
        if (!response.ok) {
            throw new Error('Restaurant non trouvé');
        }
        const restaurant = await response.json();
        detailsRestaurant(restaurant);
    } catch (error) {
        console.error("Erreur lors de la récupération des détails du restaurant :", error);
    }
}

// Fonction pour afficher les détails d'un restaurant
function detailsRestaurant(restaurant){ 
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
                <div class="review-container">
                                <span>Notation:</span>
                                ${createStarRating(restaurant.notation)}
                                <span class="note">${restaurant.notation}</span>
                            </div>
                <p><span>Avis: </span>${restaurant.avis}</p>
                <p><span>Adresse: </span>${restaurant.adresse}</p>
                <p><span>Tel: </span>${restaurant.tel}</p>
                <p><span>E-mail: </span>${restaurant.email}</p>
                <p><span>Site web: </span>${restaurant.site}</p>
            </div>`;
    main.appendChild(restaurantDetail);
}


fetchRestaurant(); 

function createStarRating(note) {
    const filledWidth = (note / 5) * 100; // Pourcentage d'étoiles pleines
    return `
        <div class="stars">
        <div class="filled" style="width: ${filledWidth}%;">★★★★★</div>
        </div>
    `;
    }