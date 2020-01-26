"use strict";

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var PORT = 8080;

var cors = require('cors');

var io = require('socket.io');

var port = process.argv[2] || 8888;

var server = require('http').createServer(app);

var socket = io.listen(server); // start server listening

server.listen(port); // state

var buffer = [];
var count = 0;
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
socket.on('connection', function (client) {
    count++; // each time a new person connects, send them the old stuff

    client.emit('message', {
        buffer: buffer,
        count: count
    }); // send a welcome

    client.broadcast.emit('message', {
        count: count,
        sessionId: client.sessionId
    }); // message

    client.on('paint', function (data) {
        var msg = {
            circle: data,
            session_id: data.sessionId
        };
        buffer.push(msg);
        if (buffer.length > 1024) buffer.shift();
        client.broadcast.emit('paint', msg);
    });
    client.on('reset', function () {
        client.broadcast.emit('reset');
    });
    client.on('clear', function () {
        buffer = [];
        client.broadcast.emit('clear');
    });
    client.on('disconnect', function () {
        count--;
        client.broadcast.emit('message', {
            count: count,
            sessionId: client.sessionId
        });
    });
});
app.post('/check_captcha', cors(), function (req, res) {
    console.log(req.body.use);
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
    });

    if (count < 10) {
        res.json({
            status: true
        });
    } else {
        res.json({
            status: false
        });
    }
});
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/page.html'));
    mixpanel.track('event');
});
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

var Mixpanel = require('mixpanel'); // create an instance of the mixpanel client
// var mixpanel = Mixpanel.init('2896b922feebfb6b659da03a7767c6f0');
// initialize mixpanel client configured to communicate over https


var mixpanel = Mixpanel.init('2896b922feebfb6b659da03a7767c6f0', {
    protocol: 'https'
}); // track an event with optional properties

mixpanel.track('my event', {
    distinct_id: 'some unique client id',
    as: 'many',
    properties: 'as',
    you: 'want'
});
mixpanel.track('React App Track'); // set an IP address to get automatic geolocation info

mixpanel.track('my event', {
    ip: '127.0.0.1'
}); // track an event with a specific timestamp (up to 5 days old;
// use mixpanel.import() for older events)

mixpanel.track('timed event', {
    time: new Date()
}); // create or update a user in Mixpanel Engage

mixpanel.people.set('billybob', {
    $first_name: 'Billy',
    $last_name: 'Bob',
    $created: new Date('jan 1 2013').toISOString(),
    plan: 'premium',
    games_played: 1,
    points: 0
}); // create or update a user in Mixpanel Engage without altering $last_seen
// - pass option $ignore_time: true to prevent the $last_seen property from being updated

mixpanel.people.set('billybob', {
    plan: 'premium',
    games_played: 1
}, {
    $ignore_time: true
}); // set a user profile's IP address to get automatic geolocation info

mixpanel.people.set('billybob', {
    plan: 'premium',
    games_played: 1
}, {
    $ip: '127.0.0.1'
}); // set a single property on a user

mixpanel.people.set('billybob', 'plan', 'free'); // set a single property on a user, don't override

mixpanel.people.set_once('billybob', 'first_game_play', new Date('jan 1 2013').toISOString()); // increment a numeric property

mixpanel.people.increment('billybob', 'games_played'); // increment a numeric property by a different amount

mixpanel.people.increment('billybob', 'points', 15); // increment multiple properties

mixpanel.people.increment('billybob', {
    'points': 10,
    'games_played': 1
}); // append value to a list

mixpanel.people.append('billybob', 'awards', 'Great Player'); // append multiple values to a list

mixpanel.people.append('billybob', {
    'awards': 'Great Player',
    'levels_finished': 'Level 4'
}); // merge value to a list (ignoring duplicates)

mixpanel.people.union('billybob', {
    'browsers': 'ie'
}); // merge multiple values to a list (ignoring duplicates)

mixpanel.people.union('billybob', {
    'browsers': ['ie', 'chrome']
}); // record a transaction for revenue analytics

mixpanel.people.track_charge('billybob', 39.99); // clear a users transaction history

mixpanel.people.clear_charges('billybob'); // delete a user

mixpanel.people.delete_user('billybob'); // delete a user in Mixpanel Engage without altering $last_seen or resolving aliases
// - pass option $ignore_time: true to prevent the $last_seen property from being updated
// (useful if you subsequently re-import data for the same distinct ID)

mixpanel.people.delete_user('billybob', {
    $ignore_time: true,
    $ignore_alias: true
}); // Create an alias for an existing distinct id

mixpanel.alias('distinct_id', 'your_alias'); // all functions that send data to mixpanel take an optional
// callback as the last argument

mixpanel.track('test', function (err) {
    if (err) throw err;
}); // track multiple events at once

mixpanel.track_batch([{
    event: 'recent event',
    properties: {
        time: new Date(),
        distinct_id: 'billybob',
        gender: 'male'
    }
}, {
    event: 'another recent event',
    properties: {
        distinct_id: 'billybob',
        color: 'red'
    }
}]); // import an old event

var mixpanel_importer = Mixpanel.init('2896b922feebfb6b659da03a7767c6f0', {
    key: '3d2acf1f2214b2fe0f6b6848729d4f4e'
}); // needs to be in the system once for it to show up in the interface

mixpanel_importer.track('old event', {
    gender: ''
});
mixpanel_importer["import"]('old event', new Date(2012, 4, 20, 12, 34, 56), {
    distinct_id: 'billybob',
    gender: 'male'
}); // import multiple events at once

mixpanel_importer.import_batch([{
    event: 'old event',
    properties: {
        time: new Date(2012, 4, 20, 12, 34, 56),
        distinct_id: 'billybob',
        gender: 'male'
    }
}, {
    event: 'another old event',
    properties: {
        time: new Date(2012, 4, 21, 11, 33, 55),
        distinct_id: 'billybob',
        color: 'red'
    }
}]);