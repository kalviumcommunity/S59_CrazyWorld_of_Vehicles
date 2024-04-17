const express = require('express')
const router = express.Router();
const { connectDB } = require('../db.js')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const Weirdy = require('../Schemas/WeirdiesSchema.js')
const user = require('../Schemas/UserSchema.js')
const SECRET = process.env.SECRET

const userSchema = Joi.object({
    name: Joi.string().required(),
    imgURL: Joi.string().required(),
    category: Joi.string().required(),
    details: Joi.string()  
})
const validateRegister = Joi.object({
    fname: Joi.string().required(),
    lname: Joi.string(),
    mail: Joi.string().required(),
    password: Joi.string().required(),
})

const checkValidation = (input, schema) => {
    const { error } = schema.validate(input)
    if (error) {
        return false
    }
    else {
        return true
    }
}

router.post('/register', async (req, res) => {
    const findUser = await user.findOne({ mail: req.body.mail })
    if (findUser) {
        return res.status(409).json({ Error: "User already exists" })
    }
    if (!checkValidation(req.body, validateRegister)) {
        return res.status(400).json({ "Error": "Data validation failed. Please add data as per the norms" })
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
        res.status(500).json({ error: "An error occurred" })
    }
})

router.post('/login', async (req, res) => {
    const findUser = await user.findOne({ mail: req.body.mail })
    if (findUser) {
        const token = jwt.sign({userId : findUser._id}, SECRET, {expiresIn : '6h'})
        return res.json({ Message: "Login Successful!", name: findUser.fname, accessToken : token })
    }
    else {
        return res.status(401).json({ Error: "Login Failed!", err })
    }
})

router.post('/logout', async (req, res) => {
    return res.json({ Message: "Logout successfull!" })
})

router.get('/', async (req, res) => {
    try{
        const weirdies = await Weirdy.find()
        res.json(weirdies)
    }
    catch(err) {
        res.json({err})
    }
})

router.get('/user-vehicle/', async (req, res) => {
    try {
        const uservehicles = await userVehicle.find()
        res.json(uservehicles)
    }
    catch (err) {
        res.status(500).json({ error: "Failed fetching the vehicle" })
    }
});


router.get('/users', async (req, res) => {
    try {
        const users = await user.find();
        const usernames = users.map(user => user.fname)
        res.json(usernames);
    } catch(err) {
        res.status(500).json({ error: "No user found" });
    }
});


router.post('/add-weirdy', async (req, res) => {
    if(!checkValidation(req.body, userSchema)){
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

connectDB()

module.exports = router
