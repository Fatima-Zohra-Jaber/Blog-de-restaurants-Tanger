const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors({
  origin: '*', // Autorise toutes les origines pour l'API Vercel
  methods: ['GET'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

app.use(express.json());

const data = fs.readFileSync(__dirname + '/../data.json');
let restaurants = JSON.parse(data);

app.get('/api/restaurants', (req, res) => {
    res.json(restaurants);
});

app.get('/api/restaurants/id/:id', (req, res) => {
    const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
    if (!restaurant) return res.status(404).send('Restaurant non trouvé');
    res.json(restaurant);
});

app.get('/api/restaurants/nom/:nom', (req, res) => {
    const result = restaurants.filter(r =>
        r.nom.toLowerCase().includes(req.params.nom.toLowerCase())
    );
    if (result.length === 0) {
        return res.status(404).send('Aucun restaurant trouvé avec ce nom.');
    }
    res.json(result);
});

app.get('/api/restaurants/specialite/:specialite', (req, res) => {
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

module.exports = app;
