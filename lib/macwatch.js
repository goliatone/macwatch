/*
 * macwatch
 * https://github.com/goliatone/macwatch
 *
 * Copyright (c) 2015 goliatone
 * Licensed under the MIT license.
 */

'use strict';
var extend = require('gextend');
var arpscan = require('arpscan');

var DEFAULTS = {
    interval: 100,
    goneAfter: 5 * 60 * 1000
};

var MAC = '';
var GONE = 0;
var INTERVAL = 0;

var lapse = 0;
var unseen = 0;
var lastFound = 0;

function interval(){
    arpscan(onResult);
}

function onResult(err, data){
    if(err) {
        throw err;
    }

    data.forEach(function(item){
        if(item.mac.toUpperCase() === MAC.toUpperCase()){
            unseen = 0;
            var now = Date.now();
            lapse = now - lastFound;
            lastFound = now;
            console.log('FOUND', lapse);
        } else if(unseen > GONE) {
            console.log('NOT FOUND');
        } else unseen = lapse;
    });

    setTimeout(interval, INTERVAL);
}

process.on('SIGINT', function() {
    // console.log('Got SIGINT.  Press Control-D to exit.');
    // clean up!
    process.kill();
});


module.exports = function start(options){
    options = extend({}, DEFAULTS, options);

    MAC = options.mac;
    GONE = options.goneAfter;
    INTERVAL = options.interval;

    interval();
};