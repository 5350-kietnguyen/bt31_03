const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Định nghĩa các route
router.get('/', menuController.getMenus);
router.post('/', menuController.createMenu);
router.put('/:id', menuController.updateMenu);
router.delete('/:id', menuController.deleteMenu);

module.exports = router;
