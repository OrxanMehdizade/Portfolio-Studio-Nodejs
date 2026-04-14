const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/authMiddleware');
const authorizeRoles = require('../../middleware/roleMiddleware');
const validate = require('../../middleware/validateMiddleware');
const { changePasswordSchema, updateMeSchema } = require('../../validators/admin/adminValidator');

const ROLES = require('../../constants/roles');

const upload = require('../../middleware/upload/uploadMiddleware');

const { getMy, changePassword, updateMy, uploadAvatar } = require('../../controllers/admin/adminController');

router.get('/my', authMiddleware, getMy);
router.post('/avatar', authMiddleware, authorizeRoles(ROLES.ADMIN), upload.single('file'), uploadAvatar);
router.put('/change-password', authMiddleware, validate(changePasswordSchema), changePassword);
router.put('/myUp', authMiddleware, validate(updateMeSchema), updateMy);

module.exports = router;