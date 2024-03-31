const express = require('express')
const router = express.Router();
const { connectDB } = require('../db.js')
const Country = require('../Schemas/schema.js')

router.get('/', async (req, res) => {
    try {
        const countries = await Country.find()
        res.json(countries)
    }
    catch (err) {
        res.json({ error: "An Error occurred 1" })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const foundCountry = await Country.findById(req.params.id)
        res.json(foundCountry)
    }
    catch (err) {
        res.json({ error: "An Error occurred 2" })
    }
});

router.post('/add-Country', async (req, res) => {
    console.log(req.body)
    const newCountry = new Country(req.body)
    try {
        const savedCntry = await newCountry.save()
        res.json(savedCntry)
    }
    catch (err) {
        res.json({ error: err })
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const foundCountry = await Country.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!foundCountry) {
            return res.status(404).json({ error: "Country Not Found 3" })
        }
        res.json(foundCountry)

    }
    catch (err) {
        res.status(500).send('Error: ' + err);

    }

});

router.put('/:id', async (req, res) => {
    try {
        const foundCountry = await Country.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!foundCountry) {
            return res.status(404).json({ error: "Country Not Found 4" })
        }
        res.json(foundCountry);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const foundCountry = await Country.findByIdAndDelete(req.params.id);
        if (!foundCountry) {
            return res.status(404).json({ error: "Country Not Found 5" })
        }
        res.send('Country deleted');
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

connectDB()

module.exports = router