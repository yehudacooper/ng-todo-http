var http = require('http');
var url = require('url');
var fs = require('fs');
var vm = require('vm');
var cr = require('crypto');
var re = require('read-line');
var events = require('events');
var array = require('./tasks.json')
var eventEmitter = new events.EventEmitter();
http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    var exten = q.pathname.split(".")[1];
    var query = q.query;
    if (Object.keys(query) == 'add') {
        console.log(query);
        array.push({
            "name": query.add,
            "edit": false,
            "undone": "fa-circle-thin",
            "trash": false,
            "line": ""
        });
    }
    else if (Object.keys(query) == 'remove') {
        if(array[query.remove].line == 'lineThrough'){
        array.splice(query.remove, 1);
        }
    }
    else if (Object.keys(query) == 'done') {
        // var element = array[query.done];
        if (array[query.done].undone === 'fa-circle-thin') {
            array[query.done].undone = 'fa-check-circle';
            array[query.done].line = 'lineThrough';
        }
        else {
            array[query.done].undone = 'fa-circle-thin';
            array[query.done].line = '';

        }

    }
    else if (Object.keys(query) == 'edit') {
        array[query.edit].edit = true;
    }
    else if (Object.keys(query)[0] == 'editnew') {
        array[query.id].name = query.editnew;
        array[query.id].edit = false;

    }
    else if (Object.keys(query) == 'clear') {
        array = [];
    }
    fs.writeFileSync('tasks.json', JSON.stringify(array), function (eror) {
        if (eror) {
            console.log("error")
        };
    })
    fs.readFile(filename, function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end("404 Not Found");
        }


        var myEventHandler1 = function (exte) {
            console.log(exte);
            return function myEventHandler() {
                switch (exte) {
                    case "html": {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(data);
                    }
                    case "css": {
                        res.writeHead(200, { 'Content-Type': 'text/css', "Access-Control-Allow-Origin": "*" });
                        res.end(data);
                    }
                    case "json": {
                        res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" });
                        res.end(data);
                    }
                    case "json/": {
                        res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" });
                        res.end(data);
                    }
                }
            }
        }
        eventEmitter.on('scream', myEventHandler1(exten));
        eventEmitter.emit('scream');

    });
}).listen(8080);

