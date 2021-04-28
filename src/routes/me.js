const express = require('express');
const router = express.Router();

const meController = require('../app/Controllers/MeController');

//router.get('/create', khachhangController.create);
router.get('/information',meController.information);
router.put('/edit-profile', meController.editProfile);
// router.post('/register-doanhnghiep',meController.registerDoanhNghiep);
// router.post('/login',meController.login);

// router.post('/handle-form-actions',courseController.handleFormActions);   
// router.get('/:id/edit',courseController.edit);
// router.put('/:id',courseController.update);
// router.patch('/:id/restore', courseController.restore);
// router.delete('/:id',courseController.delete);
// router.delete('/:id/force',courseController.forceDelete);
// router.get('/:slug', courseController.show);
module.exports = router;