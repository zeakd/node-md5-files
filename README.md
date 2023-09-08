# node-md5-files

node-md5-files create file md5 hashes using built-in command for each OS.

## Install
``` bash
npm install node-md5-files
```

## Usage

``` js
import glob from 'fast-glob'
import { md5Files } from 'node-md5-files'

// no built-in glob match. feel free to use glob, fast-glob, globby, etc
const hashes = await md5Files(await glob(['files/**/*', '!files/exclude/**/*']));

console.log(hashes);
// output:
// { 'files/a': '1a0bd....', 'files/dir/b': '919af...' }
```

## API

### md5Files(filenames, options?)

it use built-in md5 commands for the `os.platfom()`

- darwin: md5
- linux: md5sum
- win32: Get-FileHash
- fallback: use nodejs `crypto` module

#### filenames

Type: string[]

your target files. glob is not supported, so feel free to use any glob library you choose

#### options?.cwd

Type: string[]
Default: `process.cwd()`
