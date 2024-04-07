const express = require('express')
const router = express.Router();
const { connectDB } = require('../db.js')
const Weirdy = require('../Schemas/WeirdiesSchema.js')

router.get('/', async (req, res) => {
    try{
        const weirdies = await Weirdy.find()
        res.json(weirdies)
    }
    catch(err) {
        res.json({err})
    }
})

router.post('/add-weirdy', async (req, res) => {
    console.log(req.body)
    const newWeirdy = new Weirdy(req.body)
    try {
        const savedWeird = await newWeirdy.save()
        res.json(savedWeird)
    }
    catch (err) {
        res.json({ err })
    }
})
router.patch('/:id', async (req, res) => {
    try {
        const foundWeirdy = await Weirdy.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!foundWeirdy) {
            return res.status(404).json({ error: "Weirdy not found" })
        }
        res.json(foundWeirdy)
    }
    catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

router.put('/update-vehicle/:id', async (req, res) => {
    try {
        const foundWeirdy = await Weirdy.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!foundWeirdy) {
            return res.status(404).json({ error: "Weirdy Not Found" })
        }
        res.json(foundWeirdy);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const foundWeirdy = await Weirdy.findByIdAndDelete(req.params.id);
        if (!foundWeirdy) {
            return res.status(404).json({ err })
        }
        res.send('Weirdy deleted');
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});
connectDB()

module.exports = router
