var _ = require('lodash');

var messages = require('../store/messages');

// [
// { 'message_id': 41, 'type': 'str', 'external_message_id' : 'bbb', 'thread_id' : 42, 'security_level' : 43, 'subject' : 'mail subject or whatever', 'from_' : '???', 'date' : '2015-07-18', 'date_insert' : '2015-07-18', 'text' : 'I can haz cheesburger', 'size': '???', 'answer_to' => 'xxx', 'offset': '', 'headers': '', 'tags': [], 'flags': [], 'parts': '???', 'contacts': [{ ??? }],
// ]

module.exports = function(app) {
  var express = require('express');
  var messagesRouter = express.Router();

  messagesRouter.use(function(req, res, next) {
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
    req.messages = messages.filter(function (x) {
      return x.importance >= importance.min &&
             x.importance <= importance.max &&
             x.privacy >= privacy.min &&
             x.privacy <= privacy.max;
    });
    next();
  });
  messagesRouter.get('/', function(req, res) {
    var threadId = parseInt(req.query.thread_id, 10);
    var messages = !!threadId ? req.messages.filter(function(message) {
      return message.thread_id === threadId;
    }) : req.messages;

    res.send({
      total: messages.length,
      messages: messages
    });
  });

  messagesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  messagesRouter.get('/:id', function(req, res) {
    var message = _.find(req.messages, {message_id: req.params.id});
    if (!message) {
      return res
        .status(404)
        .send({
          message: 'Not Found'
        });
    }
    return res
      .status(200)
      .send({messages: message});
  });

  messagesRouter.put('/:id', function(req, res) {
    res.send({
      'messages': {
        message_id: req.params.id
      }
    });
  });

  messagesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/messages', messagesRouter);
};
