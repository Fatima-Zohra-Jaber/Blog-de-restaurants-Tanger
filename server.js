
const express = require('express');
const cors = require('cors'); // Importer le module CORS
const app = express();
const fs = require('fs');
const PORT = 3000;

// Activer CORS
app.use(cors());

// Charger les données JSON
let restaurants = require('./data.json');

// Middleware JSON
app.use(express.json());

// Endpoint pour récupérer tous les restaurants
app.get('/restaurants', (req, res) => {
    res.json(restaurants);
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

// // Récupérer tous les restaurants
// app.get('/restaurants', (req, res) => {
//     res.json(restaurants);
// });

// // Récupérer un restaurant par nom
// app.get('/restaurants/:nom', (req, res) => {
//     const restaurant = restaurants.find(r => r.nom.toLowerCase() === req.params.nom.toLowerCase());
//     if (!restaurant) return res.status(404).send('Restaurant non trouvé');
//     res.json(restaurant);
// });

// // Ajouter un restaurant
// app.post('/restaurants', (req, res) => {
//     const nouveauRestaurant = {
//         id: Date.now(), // Ajout d'un identifiant unique
//         nom: req.body.nom,
//         specialite: req.body.specialite,
//         adresse: req.body.adresse,
//         notation: req.body.notation,
//         avis: req.body.avis || [],
//         site: req.body.site,
//         tel: req.body.tel
//     };

//     restaurants.push(nouveauRestaurant);
//     fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(restaurants, null, 2)); // Sauvegarder les changements dans le fichier
//     res.status(201).json(nouveauRestaurant);
// });

// // Modifier un restaurant
// app.put('/restaurants/:id', (req, res) => {
//     const restaurant = restaurants.find(r => r.id === parseInt(req.params.id)); // Utilisation de l'id pour la correspondance
//     if (!restaurant) return res.status(404).send('Restaurant non trouvé');

//     // Mettre à jour les informations du restaurant
//     restaurant.nom = req.body.nom || restaurant.nom;
//     restaurant.specialite = req.body.specialite || restaurant.specialite;
//     restaurant.adresse = req.body.adresse || restaurant.adresse;
//     restaurant.notation = req.body.notation || restaurant.notation;
//     restaurant.avis = req.body.avis || restaurant.avis;
//     restaurant.site = req.body.site || restaurant.site;
//     restaurant.tel = req.body.tel || restaurant.tel;

//     fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(restaurants, null, 2)); // Sauvegarder les changements dans le fichier
//     res.json(restaurant);
// });

// // Supprimer un restaurant
// app.delete('/restaurants/:id', (req, res) => {
//     const index = restaurants.findIndex(r => r.id === parseInt(req.params.id)); // Utilisation de l'id pour la correspondance
//     if (index === -1) return res.status(404).send('Restaurant non trouvé');

//     restaurants.splice(index, 1);
//     fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(restaurants, null, 2)); // Sauvegarder les changements dans le fichier
//     res.sendStatus(204); // Pas de contenu
// });


