const express = require('express');
const { body } = require('express-validator');
const {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getContacts);
router.post(
  '/',
  protect,
  [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
  ],
  createContact
);
router.put('/:id', protect, updateContact);
router.delete('/:id', protect, deleteContact);

module.exports = router;
