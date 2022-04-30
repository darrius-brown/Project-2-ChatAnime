const express = require('express')
const router = express.Router()
const passport = require('passport')
const Users = require('../models/users-model')

router.get('/register', (req, res) => {
    res.render('view/register')
})

router.get('/login', (req, res) => {
    res.render('view/login')
})

router.post('/register', async (req, res, next) => {
    const { name, username, password } = req.body;
    const user = new Users({ name, username });
    const registeredUser = await Users.register(user, password);
    req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to Chatime!");
        res.redirect('/user/login');
    });
});

router.post("/login",
    passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/user/login",
    }),
    (req, res) => {
        req.flash("success", "Welcome!");
        res.redirect("/");
    }
);


router.get('/logout', (req, res) => {
    req.logout()
    req.flash("success", "logged out!");
    res.redirect('/user/login')
})


const UserController = router
module.exports = UserController;