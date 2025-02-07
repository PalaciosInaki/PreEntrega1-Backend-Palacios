const {Router} = require('express');
const sessionController = require('../controllers/sessionController.cjs');
const passport = require('passport');

const sessionRouter = Router();

sessionRouter.post('/login', passport.authenticate('login') , sessionController.login);
sessionRouter.post('/register', passport.authenticate('register'), sessionController.register);



module.exports = sessionRouter;