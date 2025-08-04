
// Fonction pour récupérer les données de l'API
async function fetchRestaurant() {
    const urlParams = new URLSearchParams(window.location.search);
    const idRestaurant = urlParams.get('id');

    try {
        const response = await fetch(`/api/restaurants/id/${idRestaurant}`);
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

    // Injection dans les blocs existants
    document.querySelector('.imageDetail').innerHTML = `<img src="${restaurant.photo}" alt="">`;
    document.querySelector('.textDetail').innerHTML = `
        <h1>${restaurant.nom}</h1>
        <p class="specialite-container">
            ${restaurant.specialite.map(s => `<span class="specialite">${s.trim()}</span>`).join('')}
        </p>
        <div class="review-container">
            ${createStarRating(restaurant.notation)}
            <span class="note">(${restaurant.notation})</span>
        </div>
        <p class="avis">${restaurant.avis}</p>
        <p><i class="fa-solid fa-location-dot"></i> ${restaurant.adresse}</p>
        <p><i class="fa-solid fa-phone"></i> ${restaurant.tel}</p>
        <p><i class="fa-regular fa-envelope"></i> ${restaurant.email}</p>
        <p><span>Site web: </span>${restaurant.site ? restaurant.site : ''}</p>
    `;
    document.querySelector('.mapDetail').innerHTML = `
        <iframe src="${restaurant.map}" width="100%" height="350" style="border:0; border-radius:12px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    `;
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
