const express = require('express');
const router = express.Router();

const adminController = require('../app/Controllers/AdminController');

//router.get('/create', khachhangController.create);
router.post('/create-goikhachhang',adminController.creategoiKH);
router.post('/create-goidoanhnghiep',adminController.creategoiDN);
router.put('/update-goidoanhnghiep',adminController.updategoiDN);
router.put('/update-goikhachhang',adminController.updategoiKH);


// router.post('/handle-form-actions',courseController.handleFormActions);   
// router.get('/:id/edit',courseController.edit);
// router.put('/:id',courseController.update);
// router.patch('/:id/restore', courseController.restore);
// router.delete('/:id',courseController.delete);
// router.delete('/:id/force',courseController.forceDelete);
// router.get('/:slug', courseController.show);
module.exports = router;