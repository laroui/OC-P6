const express = require("express");
const router = express.Router();
const sauce = require('../controllers/sauce');

//Import du middleware auth pour sécuriser les routes
const auth = require('../middleware/auth');
//Import du middleware multer pour la gestion des images
const multer = require('../middleware/mt-conf');

//router.post('/', auth, sauce.ANALYSE);
router.put('/:id', auth, multer, sauce.update);
router.delete('/:id', auth, sauce.delete);

router.post('/', auth, multer, sauce.create);
router.get('/', auth, sauce.list);
router.get('/:id', auth, sauce.OneSauce);
router.post('/:id/like', auth, sauce.likeSauce);

module.exports = router;
