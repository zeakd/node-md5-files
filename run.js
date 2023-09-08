import glob from "fast-glob";
import { md5Files } from './md5-files.js';

const output = await md5Files(await glob('**/*'));
console.log(output)