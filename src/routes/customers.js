const express = require('express');
const router = express.Router();

const khachhangController = require('../app/Controllers/KhachHangController.js');

//router.get('/create', khachhangController.create);
// router.post('/register',khachhangController.register);
 //router.get('/information',khachhangController.information);

// router.post('/handle-form-actions',courseController.handleFormActions);   
// router.get('/:id/edit',courseController.edit);
// router.put('/:id',courseController.update);
// router.patch('/:id/restore', courseController.restore);
// router.delete('/:id',courseController.delete);
// router.delete('/:id/force',courseController.forceDelete);
// router.get('/:slug', courseController.show);
module.exports = router;