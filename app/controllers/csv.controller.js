const stream = require('stream');
const await = require('await')
const fs = require('fs');
const path = require('path');

const db = require('../config/db.config.js');
const Archivo = db.Archivo;

const csv = require('fast-csv');
const Json2csvParser = require('json2csv').Parser;

/**
 * Carga de archivo CSV formateo Y exportarlo a Mysql
 * @param {*} req 
 * @param {*} res 
 */
exports.uploadFile = (req, res) => {
    try{
        const archivos = [];
        fs.createReadStream(__basedir + "/uploads/" + req.file.filename)
            .pipe(csv.parse({ headers: true }))
            .on('error', error => {
                console.error(error);
                throw error.message;
            })
            .on('data', row => {
                archivos.push(row);
                console.log(row);
            })
            .on('end', () => {
                // Guardar archivo a BD
                Archivo.bulkCreate(archivos).then(() => {
                    const result = {
                        status: "ok",
                        filename: req.file.originalname,
                        message: "Conversion Exitosa!",
                    }
    
                    res.json(result);
                });    
            });
    }catch(error){
        const result = {
            status: "fail",
            filename: req.file.originalname,
            message: "Error! message = " + error.message
        }
        res.json(result);
    }
}

