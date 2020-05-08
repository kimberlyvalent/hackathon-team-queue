const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.send('Backend is up!');
});

app.get('/queue/', function(req, res) {
    res.send('All queues');
});

app.get('/queue/:queueId', function(req, res) {
    var id = req.params.queueId;
    res.send(`Data for ${id}`);
});

app.post('/queue/:queueId', function(req, res) {
    var id = req.params.queueId;
    res.send(`Joined ${id}`);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
