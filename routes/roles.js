var express = require('express');
var router = express.Router();
let roleSchema = require('../models/roles');

router.get('/', async function(req, res, next) {
  try {
    let roles = await roleSchema.find({});
    res.status(200).send({
      success: true,
      data: roles
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    let role = await roleSchema.findById(req.params.id);
    if (!role) {
      return res.status(404).send({ success: false, message: "Role không tồn tại" });
    }
    res.status(200).send({
      success: true,
      data: role
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

router.post('/', async function(req, res, next) {
  try {
    let { roleName, description } = req.body;
    let existingRole = await roleSchema.findOne({ roleName });

    if (existingRole) {
      return res.status(400).send({ success: false, message: 'Role đã tồn tại' });
    }

    let newRole = new roleSchema({
      roleName,
      description: description || ''
    });

    await newRole.save();
    res.status(201).send({
      success: true,
      data: newRole
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    let body = req.body;
    let role = await roleSchema.findByIdAndUpdate(req.params.id, body, { new: true });

    if (!role) {
      return res.status(404).send({ success: false, message: "Role không tồn tại" });
    }

    res.status(200).send({
      success: true,
      data: role
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
