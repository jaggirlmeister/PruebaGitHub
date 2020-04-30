const crudLocations = (app) =>{
    const Location = require('../models/locations.js');

    //Funciones de endpoints
    //GET - Devuelve todas las cervecerías
    findAllLocations = (req, res) => {
        Location.find((err, locations) =>{
            if(!err){
                console.log('GET /locations');
                res.send(locations);
            }
        })
     }
     //URLS
     app.get('/locations', findAllLocations);
}
module.exports = crudLocations;