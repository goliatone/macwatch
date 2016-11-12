# macwatch

Track specific MAC addresses in your network, and execute a command when found or lost.

>arpwatch is a computer software tool for monitoring Address Resolution Protocol traffic on a computer network.[1] It generates a log of observed pairing of IP addresses with MAC addresses along with a timestamp when the pairing appeared on the network. It also has the option of sending an email to an administrator when a pairing changes or is added.

## Getting Started
Install the module with: `npm install macwatch`

You can use `macwatch` from the **cli**:
```
$ macwatch -m XX:XX:XX:XX:XX:XX -e 'say on state changed'
```
You might need `sudo`:
```
$  sudo macwatch -m XX:XX:XX:XX:XX:XX -e 'say on state changed'
```

Thie previous command will scan the network for a MAC address that matches the provided address and execute the `say` command when state changes.

```javascript
var macwatch = require('macwatch');
```

## TODO
- Ingress arpscan from file, using stream
- Support multiple MAC addresses
- Execute commands on SEEN/GONE
- Define semantics for state SEEN/GONE
- Make commands pluggable: macwatch-email, macwatch-rest, etc.

## Documentation

```
Usage: macwatch [options]

  Options:

    -h, --help                     output usage information
    -V, --version                  output the version number
    -m, --mac-address <address>    MAC address to watch for
    -e, --exec-cmd <command>       Command to execute on state transition
    -i, --interval [milliseconds]  Interval between scans
    -g, --gone-after [minutes]     Period of time after which a MAC is considered as not present anymore
```

## Examples
_(Coming soon)_

## TODO
- Explore command/plugin system [see][gh]

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 goliatone  
Licensed under the MIT license.


[gh]:https://www.npmjs.com/package/gitlike-cli
