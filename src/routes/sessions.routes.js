const {Router} = require('express');
const sessionController = require('../controllers/sessionController.cjs');
const passport = require('passport');

const sessionRouter = Router();

sessionRouter.post('/login', passport.authenticate('login') , sessionController.login);
sessionRouter.post('/register', passport.authenticate('register'), sessionController.register);
sessionRouter.get('/viewlogin', sessionController.viewLogin);
sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {});
sessionRouter.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), sessionController.githubLogin);
sessionRouter.get('current', passport.authenticate('jwt', { session: false }), (req, res) => { res.send(req.user) });

module.exports = sessionRouter;