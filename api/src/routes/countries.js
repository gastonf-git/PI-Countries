const { Router } = require("express");
const { Op } = require('sequelize')
const { Countries, Activities } = require("../db");
const axios = require("axios");

const routerCountries = Router();

routerCountries.get("/", async (req, res, next) => {
  
    let { data } = await axios.get("https://restcountries.com/v3/all");
    const dataCountriesFiltered = data.map((country) => {
        let subregion;
        if (!country.subregion) {
            subregion = "-";
        } else {
            subregion = country.subregion;
        }

        return {
            id: country.cca3,
            name: country.name.official,
            image: country.flags[1],
            continent: country.continents[0],
            subregion,
            area: country.area,
            population: country.population,
        };
    });
    
    await Countries.bulkCreate(dataCountriesFiltered, {
        ignoreDuplicates: true,
    });

    let name = req.query.name;
    
    if(name) {
      try {
        let countries = await Countries.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
          order: [["name", "ASC"]],
        });
        res.send(countries);
        
      } catch (error) {
        next(error)
      }
    } else {
      
      try {
        let countries = await Countries.findAll({
          include: Activities,
          order: [["id", "ASC"]]
        });
        res.send(countries);
      } catch (error) {
        next(error)
      }

    }


});


routerCountries.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    let country = await Countries.findByPk(id.toUpperCase(), {
      include: Activities
    });
    res.send(country);
  } catch (error) {
    next(error)
  }
})

routerCountries.post("/", async (req, res, next) => {
  try {
    const { id, name, image, continent, population, area, subregion } = req.body;
    const newCountries = await Countries.create({
      id,
      name,
      image,
      continent,
      population,
      area,
      subregion,
    });
    res.status(201).send(newCountries);
  } catch (error) {
    next(error);
  }
});

module.exports = routerCountries;
