var _ = require('lodash');

var contactStore = require('../store/contacts');

module.exports = function(app) {
  var express = require('express');
  var contactsRouter = express.Router();
  contactsRouter.use(function (req, res, next) {
    const importanceHeader = req.header('X-CALIOPEN-IMPORTANCE') || '0:100';
    const privacyHeader = req.header('X-CALIOPEN-PRIVACY-INDEX') || '0:100';
    var importance = {
      min: parseInt(importanceHeader.split(':')[0], 10),
      max: parseInt(importanceHeader.split(':')[1], 10)
    };
    var privacy = {
      min: parseInt(privacyHeader.split(':')[0], 10),
      max: parseInt(privacyHeader.split(':')[1], 10)
    };
    req.contacts = contactStore.contacts.filter(function (x) {
      return x.importance >= importance.min &&
             x.importance <= importance.max &&
             x.privacy >= privacy.min &&
             x.privacy <= privacy.max;
    });
    next();
  });

  contactsRouter.get('/', function(req, res) {
    res.send({
      total: req.contacts.length,
      contacts: req.contacts
    });
  });

  contactsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  contactsRouter.get('/:id', function(req, res) {
    var contact = _.find(req.contacts, {contact_id: req.params.id});
    if (!contact) {
      return res
        .status(404)
        .send({
          message: 'Not Found'
        });
    }
    return res
      .status(200)
      .send({contacts: contact});
  });

  contactsRouter.put('/:id', function(req, res) {
    var contact = _.find(req.contacts, {id: req.params.id});
    if (!contact) {
      return res
        .status(404)
        .send({
          message: 'Not Found'
        });
    }
    res.send({
      'contacts': contact
    });
  });

  contactsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  contactsRouter.get('/:id/emails', function(req, res) {
    var contact = _.find(req.contacts, {contact_id: req.params.id});
    if (!contact) {
      return res
        .status(404)
        .send({
          message: 'Not Found'
        });
    }

    var emails = _.filter(contactStore.emails, { contact_id: contact.contact_id });

    return res
      .status(200)
      .send({ emails: emails });
  });

  app.use('/api/contacts', contactsRouter);
};
