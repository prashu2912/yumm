const express = require("express");
const { addProduct } = require("../controllers/productController");
const productController = require('../controllers/productController');

const router = express.Router();

router.post("/addProduct/:firmId", addProduct);
router.get('/:firmId/products',productController.getProductByFirm);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});
router.delete('/:productId',productController.deleteProductById)
module.exports = router;
