/*
 * REST API for managing queues.
 */
const express = require('express');
const app = express();

const Queue = require('./queue');

const port = process.env.PORT || 3000;

// Global variable for testing.
var QUEUES = {
    foo: new Queue(),
    bar: new Queue(),
    baz: new Queue()
};

app.get('/', function(_req, res) {
    res.send('Backend is up!');
});

// Get all queues.
app.get('/queue/', function(_req, res) {
    queueNames = Object.keys(QUEUES);
    res.send(queueNames);
});

// Get items in queue.
app.get('/queue/:queueId/members', function(req, res) {
    var id = req.params.queueId;
    var q = QUEUES[id];
    if (q) {
        res.send(q);
    }
});

app.get('/queue/:queueId/members/length', function(req, res) {
    var id = req.params.queueId;
    var q = QUEUES[id];
    res.send(q.length);
});

// Add user to queue.
app.post('/queue/:queueId/members/:userId', function(req, res) {
    var id = req.params.queueId;
    var userId = req.params.userId;

    var q = QUEUES[id];
    q.push(userId);
    res.send(`Joined ${id}!`);
});

// Remove user from queue.
app.delete('/queue/:queueId/members', function(req, res) {
    var id = req.params.queueId;
    var q = QUEUES[id];
    userId = q.pop();
    res.send(userId);
});

app.listen(port, () => console.log(`Listening at ${port}`));
