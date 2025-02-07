const {Router} = require('express');
const sessionController = require('../controllers/sessionController.cjs');

const sessionRouter = Router();

sessionRouter.post('/login', sessionController.login);
sessionRouter.post('/register', sessionController.register);



module.exports = sessionRouter;