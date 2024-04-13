const express = require("express")
const LibroRouter = express.Router()
const Libro = require("../models/Libro")

// crear libro
LibroRouter.post("/libro", async (req, res) => {
  try {
    const { title, description, autorId } = req.body;
    if (!title || !description || !autorId) {
      return res.status(400).send({
        success: false,
        message: "faltan datos",
      });
    }

    let libro = await Libro({
      title,
      description,
      autor: autorId
    })

    await libro.save()

    return res.status(200).send({
      success: true,
      message: "libro creado"
    })

  } catch (error) {
    return res.status(500).send({
      succes: false,
      message: error.message
    })
  }
});

// obtener todos los libros
LibroRouter.get("/libros", async (req, res) => {
  try {
    let libros = await Libro.find({})
    return res.status(200).send({
      success: true,
      libros
    })
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message
    })
  }
})

// Devolver un libro

LibroRouter.get("/libro/:id", async (req, res)=>{
  try {
    const {id} = req.params
    let libro = await Libro.findById(id).populate({
        path: "autor",
        select: "name surname"

      })

    if(!libro){
      return res.status(404).send({
        seccess: false,
        message: "libro no encontrado"
      })
    }

    return res.status(200).send({
      success: true,
      message: "libro encontrado",
      libro
    })

  } catch (error){
    return res.status(500).send({
      success: false,
      message: error.message
    })
  }
})

module.exports = LibroRouter;