/*
 * macwatch
 * https://github.com/goliatone/macwatch
 *
 * Copyright (c) 2015 goliatone
 * Licensed under the MIT license.
 */

// 'use strict';
var extend = require('gextend');
var arpscan = require('arpscan');

var DEFAULTS = {
    mac: [],
    interval: 100,
    goneAfter: 5 * 60 * 1000,
    command: onStateChanged
};

var macTargets = {};

var MAC = '';
var GONE = 0;
var INTERVAL = 0;

var lapse = 0;
var unseen = 0;
var lastFound = 0;
var INDEX = 0;
var FINDEX=0;

var active = {
    cache: {},
    items: []
};

function interval(){

    arpscan(onResult);
    INDEX++;
}


function onResult(err, data){
    if(err) { throw new Error(err); }

    var seen = [];
    var now = Date.now();
    // var oldActive = active.items.concat();

    //Iterate over all found items:
    data.forEach(function(item){
        item.mac = item.mac.toUpperCase();
        //is the current item on our list of targeted MACs?
        if(macTargets.hasOwnProperty(item.mac)) {

            //item haven't been cached cached?
            if(!active.cache[item.mac]){
                item.lastseen = 0;
                active.items.push(item);
                active.cache[item.mac] = item;
            }

            //refresh timestamp to last seen
            active.cache[item.mac].lastseen = now;

            seen.push(item.mac);
        }
    });

    //We need to go over all targets
    // (macTargets.length !== seen.length) &&
    var remove = [];
    active.items.forEach(function(item, i){
        if(seen.indexOf() !== -1) return
        if((now - item.lastseen) > GONE){
            delete active.cache[item.mac];
            remove.push(i);
        }
    });

    var aryWithoutSeven = ary.filter(function(value) { return value != 'seven' });


    //has the state changed? if so, trigger command

    setTimeout(interval, INTERVAL);
}


function onStateChanged(data){

}

process.on('SIGINT', function() {
    // console.log('Got SIGINT.  Press Control-D to exit.');
    // clean up!
    process.kill();
});


module.exports = function start(options){
    options = extend({}, DEFAULTS, options);

    options.mac.forEach(function(item){
        macTargets[item.toUpperCase()] = true;
    });


    GONE = options.goneAfter;
    INTERVAL = options.interval;

    interval();

    // emiter = new events.EventEmitter();
    // return emiter;
};
