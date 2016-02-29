var express = require('express');
var router = express.Router();
var contacts = require('../controllers/contacts');
var users = require('../controllers/users');
var auth = require('../controllers/auth');

router.post('/auth/login', auth.login);
router.post('/auth/signup', auth.signUp);

router.get('/api/contacts', contacts.getAll);
router.get('/api/contacts/:id', contacts.getOne);
router.post('/api/contacts/', contacts.create);
router.put('/api/contacts/:id', contacts.update);
router.delete('/api/contacts/:id', contacts.delete);

router.get('/api/admin/users', users.getAll);
router.get('/api/admin/users/:id', users.getOne);
router.post('/api/admin/users/', users.create);
router.put('/api/admin/users/:id', users.update);
router.delete('/api/admin/users/:id', users.delete);

module.exports = router;
