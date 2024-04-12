const express = require('express')
const router = express.Router();
const { connectDB } = require('../db.js')
const Joi = require('joi')
const Weirdy = require('../Schemas/WeirdiesSchema.js')

const userSchema = Joi.object({
    Name: Joi.string().required(),
    ImgURL: Joi.string().required(),
    Category: Joi.string().required(),
    Details: Joi.string()  
})

const checkValidation = (input) => {
    const { error } = userSchema.validate(input)
    if (error) {
        return false
    }
    else {
        return true
    }
}

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
    if(!checkValidation(req.body)){
        return res.status(400).json({"Error" : "Data validation failed. Please add data as per the norms"})
    }
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

router.post('/register', async (req, res) => {
    const findUser = await user.findOne({ mail: req.body.mail })
    if (findUser) {
        return res.status(409).json({ Error: "User already exists" })
    }
    const newUser = new user({
        fname: req.body.fname,
        lname: req.body.lname,
        mail: req.body.mail,
        password: req.body.password,
    })
    try {
        const savedUser = await newUser.save()
        res.status(201).json({ savedUser })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Error adding the new user. Try again later" })
    }
})

connectDB()

module.exports = router
