const { Router } = require("express");
const { Countries, Activities } = require("../db");



const routerActivities = Router();

routerActivities.get("/", (req, res, next) => {
    return Activities.findAll({})
    .then((activity) => {
        res.send(activity)
    })
    .catch((error) => {
        next(error);
    })
});


routerActivities.post("/", async (req, res, next) => {
    try {

      let countryAsync = async (id) => {
        let countryfind = await Countries.findByPk(id);
        return countryfind;
      }

      const {  countryID, name, difficulty, duration, season } = req.body;

      let newActivities = await Activities.create({
        name,
        difficulty,
        duration,
        season,
      })

      countryID.map(async (id) => {
        let countryFinded = await countryAsync(id);
        if(countryFinded){
          countryFinded.addActivities(newActivities.id);
        }
      })


      res.status(200).send({ msg: "Se ha creado correctamente las actividades"});
    } catch (error) {
      next(error);
    }
  });

module.exports = routerActivities;
