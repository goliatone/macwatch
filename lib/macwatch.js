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
    // goneAfter: 30 * 1000,
    goneAfter: 5 * 60 * 1000,
    command: onStateChanged
};

var macTargets = {};

var active = {
    cache: {},
    items: []
};

function scan(){
    arpscan(onResult);
}


function onResult(err, data){
    if(err) {
        if(Macwatch.options.onError) {
            return Macwatch.options.onError(err);
        }

        throw new Error(err);
    }

    var changes = {
        additions:[],
        deletions:[],
        timestamp: Date.now()
    };

    //Iterate over all found items:
    data.forEach(function scanTargets(item){
        item.mac = item.mac.toUpperCase();
        //is the current item on our list of targeted MACs?
        if(!macTargets.hasOwnProperty(item.mac)) return;

        //item haven't been cached cached?
        if(!active.cache[item.mac]){
            active.items.push(item);
            changes.additions.push(item);
            active.cache[item.mac] = item;
        }

        //refresh TTL
        active.cache[item.mac].lastseen = changes.timestamp;
    });

    //We need to go over all targets
    active.items = active.items.filter(function filterGone(item){
        //Is the time elapsed since last sight greater than threshold?
        if((changes.timestamp - item.lastseen) > Macwatch.options.goneAfter){
            changes.deletions.push(item);
            delete active.cache[item.mac];
            return false; //filter out
        }
        return true;
    });

    //has the state changed? if so, trigger command
    if(changes.additions.length || changes.deletions.length){
        Macwatch.options.command(changes);
    }

    //Schedule next interval
    setTimeout(scan, Macwatch.options.interval);
}


function onStateChanged(data){
    process.stdout.write("Result: " + data + ' \r');
}

process.on('SIGINT', function() {
    // clean up!
    process.exit(0);
});


function Macwatch(options){
    options = extend({}, DEFAULTS, options);

    options.mac.forEach(function(item){
        macTargets[item.toUpperCase()] = true;
    });


    Macwatch.options = options;

    scan();

    // emiter = new events.EventEmitter();
    // return emiter;
}

module.exports = Macwatch;
