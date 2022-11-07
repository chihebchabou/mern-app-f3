const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');

// Container for contact controller
const controller = {};

/**
 * @route GET /api/contacts
 * @desc Get all users contacts
 * @access Private
 */
controller.getContacts = async (req, res) => {
  console.log(req.user._id);
  console.log(req.user.id);
  try {
    const contacts = await Contact.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

/**
 * @route POST /api/contacts
 * @desc Add new contact
 * @access Private
 */
controller.createContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name, email, phone, type } = req.body;
  console.log(req.user);
  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      user: req.user._id,
    });
    const contact = await newContact.save();
    res.status(201).json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

/**
 * @route PUT /api/contacts/:id
 * @desc Update contact
 * @access Private
 */
controller.updateContact = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFileds = {};
  if (name) contactFileds.name = name;
  if (email) contactFileds.email = email;
  if (phone) contactFileds.phone = phone;
  if (type) contactFileds.type = type;

  try {
    let contact = await Contact.findById(id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorised' });

    contact = await Contact.findByIdAndUpdate(
      id,
      { $set: contactFileds },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

/**
 * @route DELETE /api/contacts/:id
 * @desc Delete contact
 * @access Private
 */
controller.deleteContact = async (req, res) => {
  const id = req.params.id;
  try {
    let contact = await Contact.findById(id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorised' });

    await Contact.deleteOne({ _id: id });
    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Export the module
module.exports = controller;
