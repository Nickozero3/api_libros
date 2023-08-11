const express = require("express");
const router = express.Router();
const libros = require("../data");
const joi = require("joi");

const librosSchema = joi.object({
    titulo: joi.string().required().label("titulo"),
    autor: joi.string().required().label("Autor")
});

router.get("/", async (req, res) => {
    try {
        res.json(libros)
    } catch (err) {
        next(err);
    }
});

//obtener libro por el id 

router.get("/:id", (req, res, next) => {
    try {
        const id = req.params.id;
        const libro = libros.find((l) => l.id === id);

        if (!libro) {
            const error = new Error("libro no encontrado");
            error.status = 404;
            throw error;
        }

        res.json(libro);
    } catch (err) {
        next(err);
    }
});

// Crear un nuevo libro
router.post("/", (req, res, next) => {
    try {
        const { error, value } = librosSchema.validate(req.body);
        if (error) {
            const validationError = new Error("Error de validacion");
            validationError.status = 400;
            validationError.details = error.details.map(detail =>
                detail.message);
            throw validationError;
        }

        const { titulo, autor } = value;

        const nuevoLibro = {
            id: libros.length + 1,
            titulo,
            autor
        };

        libros.push(nuevoLibro);
        res.status(201).json(nuevoLibro);
    } catch (err) {
        next(err);
    }
});

//eliminar un libro
router.delete("/:id", (req,res,next)=> {
    try {
        const id = req.params.id;
        const index = libros.findIndex((l) => l.id === id);
        
        if (index === -1){
            const error = new Error ("libro no encontrado");
            error.status = 404;
            throw error;
        }
        
        const libroEliminado = libro.splice(index,1);
        res.json(libroEliminado[0]);
    } catch (err) {
        next(err);
    }
});

module.exports = router;