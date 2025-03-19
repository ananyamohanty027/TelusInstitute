const express = require('express');
const router = express.Router();
const { generateCertificate, getCertificate } = require('../controllers/certificateController');

router.post('/', generateCertificate);
router.get('/:studentId', getCertificate);

module.exports = router; 