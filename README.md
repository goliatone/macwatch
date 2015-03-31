# macwatch

Track specific MAC addresses in your network.

>arpwatch is a computer software tool for monitoring Address Resolution Protocol traffic on a computer network.[1] It generates a log of observed pairing of IP addresses with MAC addresses along with a timestamp when the pairing appeared on the network. It also has the option of sending an email to an administrator when a pairing changes or is added.

## Getting Started
Install the module with: `npm install macwatch`

You can use `macwatch` from the **cli**:
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
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 goliatone  
Licensed under the MIT license.
