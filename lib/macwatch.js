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
    goneAfter: 30 * 1000,
    // goneAfter: 5 * 60 * 1000,
    command: onStateChanged
};

var macTargets = {};

var MAC = '';
var GONE = 0;
var INTERVAL = 0;
var CALLBACK;

var active = {
    cache: {},
    items: []
};

function interval(){

    arpscan(onResult);
}


function onResult(err, data){
    if(err) { throw new Error(err); }

    var now = Date.now();
    var changes = false;

    //Iterate over all found items:
    data.forEach(function(item){
        item.mac = item.mac.toUpperCase();
        //is the current item on our list of targeted MACs?
        if(!macTargets.hasOwnProperty(item.mac)) return;

        //item haven't been cached cached?
        if(!active.cache[item.mac]){
            changes = true;
            active.items.push(item);
            active.cache[item.mac] = item;
        }

        //refresh TTL
        active.cache[item.mac].lastseen = now;
    });

    //We need to go over all targets
    active.items = active.items.filter(function(item){
        //Is the time elapsed since last sight greater than threshold?
        if((now - item.lastseen) > GONE){
            changes = true;
            delete active.cache[item.mac];
            return false; //filter out
        }
        return true;
    });

    if(changes){
        CALLBACK(active.items);
    }



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
    CALLBACK = options.command;

    interval();

    // emiter = new events.EventEmitter();
    // return emiter;
};
