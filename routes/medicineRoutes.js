const express = require('express');
const { getMedicines, getMedicineById, createMedicine, updateMedicine, deleteMedicine } = require('../controllers/medicineController');
const router = express.Router();

router.route('/').get(getMedicines).post(createMedicine);
router.route('/:id').get(getMedicineById).put(updateMedicine).delete(deleteMedicine);

module.exports = router;
