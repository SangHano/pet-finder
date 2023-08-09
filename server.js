const express = require('express');
const app = express();
const pets = require('./data.js');

app.use('/public', express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
//get all pets
app.get('/pets', (req, res) => {
    res.send(pets);
});
//get pet's names
app.get(`/pets/:name`, (req, res)=>{
    const petNames = pets.map(p=>p.name);
    res.send(petNames)
})
// get a single pets by it's name
app.get('/pets/name/:name', (req, res) => {
    const pet = pets.find(p => p.name === req.params.name);
    if (pet) {
        res.send(pet);
    } else {
        res.status(404).send({ error: "Pet is missing in action" });
    }
});
//get a single pets by it's id

app.get('/pets/id/:id', (req, res) => {
    const pet = pets.find(p => p.id == req.params.id);
    if (pet) {
        res.send(pet);
    } else {
        res.status(404).send({ error: "Pet is missing in action" });
    }
});
//get pets' ownner by name a show the pet's detail

app.get('/pets/owner/:owner', (req, res) => {
    const petsOwnedBy = pets.filter(p => p.owner === req.params.owner);
    if (petsOwnedBy.length > 0) {
        res.send(petsOwnedBy);
    } else {
        res.status(404).send({ error: "Pets ran away" });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});