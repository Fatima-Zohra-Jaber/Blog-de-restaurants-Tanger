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
const tableBody = document.getElementById('restaurants-body');

async function searchRestaurant(){
    const typeSearch = document.getElementById("typeSearch").value;
    const input = document.getElementById("input").value;
    let url;
    if (!typeSearch) {
        tableBody.innerHTML = "<tr><td colspan='5' class='notFound'>Veuillez choisir un type de recherche</td></tr>";
        return;
    }
    if (!input.trim()) {
        tableBody.innerHTML = "<tr><td colspan='5' class='notFound'>Veuillez saisir une valeur de recherche</td></tr>";
        return;
    }
    if (typeSearch === "nom") {
        url = `http://localhost:3000/restaurants/nom/${encodeURIComponent(input)}`;
    }else if(typeSearch === "specialite"){
        url= `http://localhost:3000/restaurants/specialite/${encodeURIComponent(input)}`;
    }
    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                tableBody.innerHTML = "<tr><td colspan='5' class='notFound'>Aucun restaurant trouvé correspondant à votre recherche</td></tr>";
            } else {
                tableBody.innerHTML = `<tr><td colspan='5' class='notFound'>Erreur du serveur : ${response.statusText}</td></tr>`;
            }
            return;
        }
    
        const restaurants = await response.json();
        tableBody.innerHTML = '';
        displayRestaurants(restaurants);
    
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        tableBody.innerHTML = "<tr><td colspan='5' class='notFound'> Erreur de recherche. Vérifiez votre connexion ou réessayez plus tard.</td></tr>";
    }
    


}

// Fonction pour afficher les restaurants dans le tableau
function displayRestaurants(restaurants) {
    tableBody.innerHTML = ''; 

    restaurants.forEach(restaurant => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${restaurant.photo}" alt="${restaurant.nom}" ></td>
            <td>${restaurant.nom}</td>
            <td>${restaurant.specialite}</td>
            <td>${restaurant.notation}</td>
            <td>
                <button onclick="window.location.href='restaurant.html?id=${restaurant.id}'">
                <i class="fa-regular fa-eye"></i></button>
                <button onclick="editRestaurant(${restaurant.id})">
                <i class="fa-solid fa-pencil"></i></button>
                <button onclick="deleteRestaurant(${restaurant.id})">
                <i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Fonction pour ajouter un restaurant
async function addRestaurant() {
    const newRestaurant = {
        nom: document.getElementById('nom').value,
        specialite: document.getElementById('specialite').value.split(','),
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
            fetchRestaurants();
        }
    } catch (error) {
        console.error("Erreur d'ajout de restaurant:", error);
    }
}

// Écouteurs d'événements
document.addEventListener('DOMContentLoaded', () => {
    fetchRestaurants();
    
    const addButton = document.getElementById('add-button');
    addButton.addEventListener('click', addRestaurant);
    
    const searchButton = document.getElementById('searchButton');
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
        specialite: document.getElementById('specialite').value.split(','),
        adresse: document.getElementById('adresse').value,
        notation: parseFloat(document.getElementById('notation').value),
        tel: document.getElementById('tel').value,
        email: document.getElementById('email').value,
        site: document.getElementById('site').value,
        photo: document.getElementById('photo').value,
        avis: document.getElementById('avis').value.split(',')
    };

    try {
        const response = await fetch(`http://localhost:3000/restaurants/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedRestaurant)
        });

        if (response.ok) {
            fetchRestaurants(); 

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
            fetchRestaurants(); 
        } else {
            console.error("Échec de la suppression du restaurant.");
        }
    } catch (error) {
        console.error("Erreur lors de la suppression du restaurant:", error);
    }
}
