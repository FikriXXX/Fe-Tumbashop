const express = require('express');
const { addProduct, getAllProducts, removeProduct } = require('../controllers/productController');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

router.post('/add', upload.array('image', 4), addProduct);
router.post('/remove', removeProduct);

router.get('/list', getAllProducts);

module.exports = router;