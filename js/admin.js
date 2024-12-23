// Fonction pour récupérer tous les restaurants
async function fetchRestaurants() {
    try {
        const response = await fetch("http://localhost:3000/restaurants");
        const data = await response.json();
        displayRestaurants(data);
    } catch (error) {
        console.error("Erreur de récupération des restaurants:", error);
    }
}

// Fonction pour afficher les restaurants dans le tableau
function displayRestaurants(restaurants) {
    const tableBody = document.getElementById('restaurants-body');
    tableBody.innerHTML = ''; 

    restaurants.forEach(restaurant => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${restaurant.photo}" alt="${restaurant.nom}" >
            </td>
            <td>${restaurant.nom}</td>
            <td>${restaurant.specialite}</td>
            <td>${restaurant.notation}</td>
            <td>
                <button onclick="editRestaurant(${restaurant.id})">Modifier</button>
                <button onclick="deleteRestaurant(${restaurant.id})">Supprimer</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Fonction pour ajouter un restaurant
async function addRestaurant() {
    const newRestaurant = {
        nom: document.getElementById('nom').value,
        specialite: document.getElementById('specialite').value,
        adresse: document.getElementById('adresse').value,
        notation: parseFloat(document.getElementById('notation').value),
        tel: document.getElementById('tel').value,
        email: document.getElementById('email').value,
        site: document.getElementById('site').value,
        photo: document.getElementById('photo').value,
        avis: document.getElementById('avis').value.split(',')
    };

    try {
        const response = await fetch('http://localhost:3000/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRestaurant)
        });
        
        if (response.ok) {
            fetchRestaurants(); // Rafraîchir la liste
        }
    } catch (error) {
        console.error("Erreur d'ajout de restaurant:", error);
    }
}


// Fonction de recherche
async function searchRestaurant() {
    const searchTerm = document.getElementById('search-input').value;
    
    try {
        const response = await fetch(`http://localhost:3000/restaurants/nom/${encodeURIComponent(searchTerm)}`);
        if (!response.ok) {
            // Gérez le cas où le restaurant n'est pas trouvé
            const tableBody = document.getElementById('restaurants-body');
            tableBody.innerHTML = '<tr><td colspan="4">Aucun restaurant trouvé</td></tr>';
            return;
        }
        const restaurant = await response.json();
        
        if (restaurant) {
            displayRestaurants([restaurant]);
        }
    } catch (error) {
        console.error("Erreur de recherche:", error);
        const tableBody = document.getElementById('restaurants-body');
        tableBody.innerHTML = `<tr><td colspan="4">Erreur: ${error.message}</td></tr>`;
    }
}

// Écouteurs d'événements
document.addEventListener('DOMContentLoaded', () => {
    fetchRestaurants();
    
    const addButton = document.getElementById('add-button');
    addButton.addEventListener('click', addRestaurant);
    
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', searchRestaurant);
});

async function editRestaurant(id) {
    try {
        // Récupérer les informations du restaurant à modifier
        const response = await fetch(`http://localhost:3000/restaurants/id/${id}`);
        const restaurant = await response.json();

        // Pré-remplir le formulaire avec les informations existantes
        document.getElementById('nom').value = restaurant.nom;
        document.getElementById('specialite').value = restaurant.specialite;
        document.getElementById('adresse').value = restaurant.adresse;
        document.getElementById('notation').value = restaurant.notation;
        document.getElementById('tel').value = restaurant.tel;
        document.getElementById('email').value = restaurant.email;
        document.getElementById('site').value = restaurant.site;
        document.getElementById('photo').value = restaurant.photo;
        document.getElementById('avis').value = restaurant.avis.join(',');

        // Modifier le bouton pour "Mettre à jour"
        const addButton = document.getElementById('add-button');
        addButton.textContent = 'Mettre à jour';
        addButton.onclick = () => updateRestaurant(id);

    } catch (error) {
        console.error("Erreur lors de la récupération du restaurant:", error);
    }
}

async function updateRestaurant(id) {
    const updatedRestaurant = {
        nom: document.getElementById('nom').value,
        specialite: document.getElementById('specialite').value,
        adresse: document.getElementById('adresse').value,
        notation: parseFloat(document.getElementById('notation').value),
        tel: document.getElementById('tel').value,
        email: document.getElementById('email').value,
        site: document.getElementById('site').value,
        photo: document.getElementById('photo').value,
        avis: document.getElementById('avis').value.split(',')
    };

    try {
        const response = await fetch(`http://localhost:3000/restaurants/id/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedRestaurant)
        });

        if (response.ok) {
            fetchRestaurants(); // Rafraîchir la liste

            // Réinitialiser le formulaire et le bouton
            document.getElementById('restaurant-form').reset();
            const addButton = document.getElementById('add-button');
            addButton.textContent = 'Ajouter Restaurant';
            addButton.onclick = addRestaurant;
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour du restaurant:", error);
    }
}


async function deleteRestaurant(id) {
    try {
        const response = await fetch(`http://localhost:3000/restaurants/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchRestaurants(); // Rafraîchir la liste après suppression
        } else {
            console.error("Échec de la suppression du restaurant.");
        }
    } catch (error) {
        console.error("Erreur lors de la suppression du restaurant:", error);
    }
}
