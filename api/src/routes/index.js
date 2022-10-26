const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerCountries = require('./countries');
const routerActivities = require('./activities');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/countries", routerCountries);
router.use('/activities', routerActivities);

module.exports = router;
