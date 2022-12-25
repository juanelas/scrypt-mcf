[![License: {{PKG_LICENSE}}](https://img.shields.io/badge/License-{{PKG_LICENSE}}-yellow.svg)](LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
{{GITHUB_ACTIONS_BADGES}}

# {{PKG_NAME}}

A scrypt implementation for both Browsers and Node.js using a MCF and/or PHC compliant format. {{PKG_NAME}} generates scrypt "hashes" in the following format:

```mcf
$scrypt$ln=<cost>,r=<blocksize>,p=<parallelism>$<salt in base64 no padding>$<hash in base64 no padding>
```

## Usage

`{{PKG_NAME}}` can be imported to your project with `npm`:

```console
npm install {{PKG_NAME}}
```

Then either require (Node.js CJS):

```javascript
const {{PKG_CAMELCASE}} = require('{{PKG_NAME}}')
```

or import (JavaScript ES module):

```javascript
import * as {{PKG_CAMELCASE}} from '{{PKG_NAME}}'
```

The appropriate version for browser or node is automatically exported.

You can also download the {{IIFE_BUNDLE}}, the {{ESM_BUNDLE}} or the {{UMD_BUNDLE}} and manually add it to your project, or, if you have already installed `{{PKG_NAME}}` in your project, just get the bundles from `node_modules/{{PKG_NAME}}/dist/bundles/`.

An example of usage could be:

```typescript
import { hash, verify } from 'scrypt-mfc'

async function main () {
  const mcfString = await hash('MyPassword') // $scrypt$ln=17,r=8,p=1$bjDYMlHNovhjawrXbfrAdw$q7Z6sgaMJMMdSNECL+MGGWX+6Vm+q/o6ysACeY8eYNY
  let passwordMatch = await verify('MyPassword', mcfString) // true
  passwordMatch = await verify('OtherPassword', mcfString) // false

  // You can also use non-default options
  const mcfString2 = await hash('MyPassword', { derivedKeyLength: 64, scryptParams: { logN: 18, r: 8, p: 2 } }) // $scrypt$ln=18,r=8,p=2$9lRqxeVS/at1bktaJ5q64A$pFmlWRrddcMHScP1Yceyo6UKc8eKEJDv+/aWSRlArg3b4Hu+xEFE88P+0HHilbBViRAAhtNWETTosUtxEJl95g
  passwordMatch = await verify('MyPassword', mcfString) // true
  passwordMatch = await verify('OtherPassword', mcfString) // false
}

main()
```

## API reference documentation

[Check the API](../../docs/API.md)
