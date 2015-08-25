# open

Open nachos packages

<table>
  <thead>
    <tr>
      <th>Linux</th>
      <th>OSX</th>
      <th>Windows</th>
      <th>Coverage</th>
      <th>Dependencies</th>
      <th>DevDependencies</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="2" align="center">
        <a href="https://travis-ci.org/nachos/nachos-open"><img src="https://img.shields.io/travis/nachos/nachos-open.svg?style=flat-square"></a>
      </td>
      <td align="center">
        <a href="https://ci.appveyor.com/project/nachos/nachos-open"><img src="https://img.shields.io/appveyor/ci/nachos/nachos-open.svg?style=flat-square"></a>
      </td>
      <td align="center">
<a href='https://coveralls.io/r/nachos/nachos-open'><img src='https://img.shields.io/coveralls/nachos/nachos-open.svg?style=flat-square' alt='Coverage Status' /></a>
      </td>
      <td align="center">
        <a href="https://david-dm.org/nachos/nachos-open"><img src="https://img.shields.io/david/nachos/nachos-open.svg?style=flat-square"></a>
      </td>
      <td align="center">
        <a href="https://david-dm.org/nachos/nachos-open#info=devDependencies"><img src="https://img.shields.io/david/dev/nachos/nachos-open.svg?style=flat-square"/></a>
      </td>
    </tr>
  </tbody>
</table>

## Have a problem? Come chat with us!
[![Join the chat at https://gitter.im/nachos/nachos-open](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/nachos/nachos-open?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Installation
``` bash
  $ [sudo] npm install nachos-open -g
```

**Note:** If you are using nachos open _programmatically_

``` bash
  $ cd /path/to/your/project
  $ [sudo] npm install nachos-open --save
```

## Examples
### From a command line
Open nachos package
``` bash
  $ nachos-open package-name
  // -> opens package-name
```

Supports args to the package
``` bash
  $ nachos-home package-name a r g s
  // -> opens package-name with ['a', 'r', 'g', 's']
```

### From code
#### nachosOpen(name, [args])
``` js
var nachosOpen = require('nachos-open');

nachosOpen('package-name', ['a', 'r', 'g', 's'])
  .then(function () {
    // Opend succesfully
  })
  .catch(function (err) {
    // Handle error
  });
```

## Run Tests
``` bash
  $ npm test
```

## License

[GNU GPLv2](LICENSE)
