/*
 * REST API for managing queues.
 */
const express = require('express');

const Queue = require('./queue');

const port = process.env.PORT || 3000;

// Default time per user in seconds.
const TIME_PER_USER = 5 * 60 * 60;

// Global variable for testing.
var QUEUES = {
    foo: new Queue(),
    bar: new Queue(),
    baz: new Queue()
};

function makeId(length = 6) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function getQueueOrThrowError(res, id) {
    var q = QUEUES[id];
    if (typeof q === 'undefined') {
        res.status(404).send({ message: `Queue does not exist - ${id}` });

        return null;
    }
    else {
        return q;
    }
}

function estimateWaitingTime(position) {
    return TIME_PER_USER * position;
}

function getUserData(q, userId) {
    var position = q.position(userId);

    if (position === -1) {
        return {
            userId: userId
        };
    }

    return {
        userId: userId,
        position: position,
        estimate: estimateWaitingTime(position)
    };
}

const app = express();

app.get('/', function(_req, res) {
    res.send('Backend is up!');
});

// Get all queues names.
app.get('/queue/', function(_req, res) {
    queueNames = Object.keys(QUEUES);
    res.send(queueNames);
});

// Get length of queue.
app.get('/queue/:queueId', function(req, res) {
    var queueId = req.params.queueId;

    var q = getQueueOrThrowError(res, queueId);
    console.log(q);
    if (q) {
        res.send({ count: q.queue.length });
    }
});

// Get all members in the queue. Includes tokens for admin.
app.get('/queue/:queueId/members', function(req, res) {
    var queueId = req.params.queueId;

    var q = getQueueOrThrowError(res, queueId);
    if (q) {
        res.send(q);
    }
});

// Get data for given member in the queue.
app.get('/queue/:queueId/members/:userId', function(req, res) {
    var queueId = req.params.queueId;
    var userId = req.params.userId;

    var q = getQueueOrThrowError(res, queueId);
    if (q) {
        res.send(getUserData(q, userId));
    }
});

// Add user to queue and give them a random ID.
app.post('/queue/:queueId/members/', function(req, res) {
    var queueId = req.params.queueId;
    var userId = req.params.userId;

    var q = getQueueOrThrowError(res, queueId);
    if (q) {
        userId = makeId();
        q.addToEnd(userId);
        res.send(getUserData(q, userId));
    }
});

// Remove user from queue.
app.delete('/queue/:queueId/members', function(req, res) {
    var queueId = req.params.queueId;

    var q = getQueueOrThrowError(res, queueId);
    if (q) {
        userId = q.removeFromFront();
        res.send(getUserData(q, userId));
    }
});

app.listen(port, () => console.log(`Listening at ${port}`));
