const clase = require('...');
const intancia = new clase();

route.get('/ejemplo', async (req, res, next) => {
    try {
        const { param } = req.param;
        const respuesta = await instancia.getUserInfo(param);
    } catch (error) {
        
    }
});

module.exports = {
    UserRouter: router,
}