
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');// Importer le module file system
const PORT = 3000;

// Activer CORS
app.use(cors());

// Middleware JSON
app.use(express.json());

// Charger les données JSON
// let restaurants = require('./data.json'); // c'est just pour la lecture

const data = fs.readFileSync('server/data.json'); // c'est pour la lecture et l'écriture
let restaurants= JSON.parse(data);

app.get('/', (req, res) => {
    const message = "Welcome To our server";
    res.send(message);
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

// // Récupérer tous les restaurants
app.get('/restaurants', (req, res) => {
    res.json(restaurants);
});


// Récupérer un restaurant par id
app.get('/restaurants/id/:id', (req, res) => {
    const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
    if (!restaurant) return res.status(404).send('Restaurant non trouvé');
    res.json(restaurant);
});

// Récupérer un restaurant par nom
app.get('/restaurants/nom/:nom', (req, res) => {
    const result = restaurants.filter(r =>
 r.nom.toLowerCase().includes(req.params.nom.toLowerCase()));
    if (result.length === 0) {
        return res.status(404).send('Aucun restaurant trouvé avec ce nom.');
    }
    res.json(result);
});


// Récupérer un restaurant par spécialité
app.get('/restaurants/specialite/:specialite', (req, res) => {
    const result = restaurants.filter(restaurant => 
        restaurant.specialite.some(spec => 
            spec.toLowerCase().includes(req.params.specialite.toLowerCase())
        )
    );

    if (result.length === 0) {
        return res.status(404).send('Aucun restaurant trouvé avec cette spécialité.');
    }
    res.json(result);
});

// // Ajouter un restaurant
app.post('/restaurants', (req, res) => {
    const newRestaurant = {
        id: restaurants.length + 1,
        nom: req.body.nom,
        specialite: req.body.specialite,
        adresse: req.body.adresse,
        notation: req.body.notation,
        avis: req.body.avis || [],
        site: req.body.site,
        tel: req.body.tel,
        photo: req.body.photo
    };

    restaurants.push(newRestaurant);
    fs.writeFileSync('server/data.json', JSON.stringify(restaurants, null, 2));
    res.status(201).json(newRestaurant);
    
});

// // Modifier un restaurant
app.put('/restaurants/:id', (req, res) => {
    const restaurant = restaurants.find(r => r.id === parseInt(req.params.id)); 
    if (!restaurant) return res.status(404).send('Restaurant non trouvé');

    // Mettre à jour les informations du restaurant
    restaurant.nom = req.body.nom || restaurant.nom;
    restaurant.specialite = req.body.specialite || restaurant.specialite;
    restaurant.adresse = req.body.adresse || restaurant.adresse;
    restaurant.notation = req.body.notation || restaurant.notation;
    restaurant.avis = req.body.avis || restaurant.avis;
    restaurant.site = req.body.site || restaurant.site;
    restaurant.tel = req.body.tel || restaurant.tel;

    fs.writeFileSync( 'server/data.json', JSON.stringify(restaurants, null, 2));
    res.json(restaurant);
});


// // Supprimer un restaurant
app.delete('/restaurants/:id', (req, res) => {
    const index = restaurants.findIndex(r => r.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Restaurant non trouvé');

    restaurants.splice(index, 1);
    fs.writeFileSync('server/data.json', JSON.stringify(restaurants, null, 2));
    res.sendStatus(204); // res.status(204).send();
});

