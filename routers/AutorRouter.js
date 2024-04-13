const express = require("express");
const Autor = require("../models/Autor");
const AutorRouter = express.Router();

// funciones sin controladores
AutorRouter.get("/", async (req, res) => {
  let autores = await Autor.find({})
  return res.status(200).send({
    success: true,
    autores,
  });
});

AutorRouter.post('/autor', async (req, res) => {
  try {
    const { name, surname, age } = req.body;
    if (!name || !surname || !age) {
      return res.status(400).send({
        success: false,
        message: 'Faltan datos'
      });
    }
    let autor = new Autor({
      name,
      surname,
      age
    });
    await autor.save();
    return res.status(201).send({
      success: true,
      message: 'Autor creado con éxito'
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

AutorRouter.put("/update/:id", async (req, res) => {
  try{

    const { id } = req.params;
    const { name, surname, age } = req.body;
    
    await Autor.findByIdAndUpdate(id, {name, surname, age})
    return res.status(200).send({
      success: true,
      message: 'Autor actualizado con éxito'
    });

  } catch(error){
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
})

AutorRouter.delete("/delete/:id", async (req, res) => {

  try {
    const { id } = req.params;
    await Autor.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: 'Autor eliminado con éxito'
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
});


module.exports = AutorRouter;