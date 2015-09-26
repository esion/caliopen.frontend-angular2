var _ = require('lodash');

var threads = require('../store/threads');
var messages = require('../store/messages');

threads = threads.map(function(thread) {
  var myMessages = messages.filter(function(message) {
    return message.thread_id === thread.thread_id;
  });
  thread.messages = myMessages.map(function(message) {
    return message.message_id;
  });
  thread.contacts = myMessages.map(function(message) {
    return message.sender;
  });
  return thread;
});

module.exports = function(app) {
  var express = require('express');
  var threadsRouter = express.Router();

  threadsRouter.use(function(req, res, next) {
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

    req.threads = threads.filter(function (x) {
      return x.importance >= importance.min &&
             x.importance <= importance.max &&
             x.privacy >= privacy.min &&
             x.privacy <= privacy.max;
    });
    next();
  });
  threadsRouter.get('/', function(req, res) {
    res.send({
      total: req.threads.length,
      threads: req.threads
    });
  });

  threadsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  threadsRouter.get('/:id', function(req, res) {
    var thread = _.find(req.threads, {thread_id: parseInt(req.params.id)});
    if (!thread) {
      return res
        .status(404)
        .send({
          thread: 'Not Found'
        });
    }
    return res
      .status(200)
      .send({threads: thread});
  });

  threadsRouter.put('/:id', function(req, res) {
    res.send({
      'threads': {
        thread_id: req.params.id
      }
    });
  });

  threadsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/threads', threadsRouter);
};
