let express = require('express');
let router = express.Router();
let upload = require('../config/multer.config.js');
 
const csvWorker = require('../controllers/csv.controller.js');

let path = __basedir + '/views/';

router.get('/', (req,res) => {
    console.log("__basedir" + __basedir);
    res.sendFile(path + "index.html");
});

router.post('/api/file/upload', upload.single("file"), csvWorker.uploadFile);


module.exports = router;