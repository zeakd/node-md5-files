import os from 'os';
import fs from 'fs';
import crypto from 'crypto';
import path from 'path';
import createDebug from 'debug';
import { $ } from 'execa';

const debug = createDebug('node-md5-files');

/**
 * 
 * @param {string[]} filenames 
 * @param {object} options
 * @param {string} options.cwd
 * @returns 
 */
export async function md5Files(filenames, options) {
  const platform = os.platform();
  debug('running on platform:', platform)

  try {
    if (platform === 'darwin') {
      return await commandMD5(filenames, options)
    }
  
    if (platform === 'linux') {
      return await commandMD5Sum(filenames, options)
    }
  } catch {}

  debug('nothing is matched. run js fallback')
  return jsMd5(filenames, options)
}

/**
 * 
 * @param {string[]} filenames 
 * @param {object} options
 * @param {string} options.cwd
 * @returns 
 */
export async function commandMD5(filenames, { cwd } = { cwd: process.cwd() }) {
  debug('execute commandMd5()')
  if (filenames.length < 0) {
    return {};
  }

  const { stdout } = await $({ cwd })`md5 -q ${filenames}`;
  const hashes = stdout.split('\n');
  const result = {};

  const len = filenames.length;
  for (let i = 0; i < len; i++) {
    result[filenames[i]] = hashes[i]
  }

  return result;
}

/**
 * 
 * @param {string[]} filenames 
 * @param {object} options
 * @param {string} options.cwd
 * @returns 
 */
export async function commandMD5Sum(filenames, { cwd } = { cwd: process.cwd() }) {
  debug('execute commandMd5Sum()')
  if (filenames.length < 0) {
    return {};
  }

  const { stdout } = await $({ cwd })`md5sum ${filenames}`;

  const hashes = stdout.split('\n').map(l => l.split(' ')[0]);
  const result = {};

  const len = filenames.length;
  for (let i = 0; i < len; i++) {
    result[filenames[i]] = hashes[i]
  }

  return result;
}

// https://github.com/kodie/md5-file/blob/master/index.js

/**
 * 
 * @param {string[]} filenames 
 * @param {object} options
 * @param {string} options.cwd
 * @returns 
 */
export async function jsMd5(filenames, { cwd } = { cwd: process.cwd() }) {
  debug('execute jsMd5()')
  if (filenames.length < 0) {
    return {};
  }

  const hashes = await Promise.all(filenames.map(filename => jsMd5One(filename, { cwd })));
  const result = {};

  const len = filenames.length;
  for (let i = 0; i < len; i++) {
    result[filenames[i]] = hashes[i]
  }

  return result;
}

export function jsMd5One(filename, { cwd } = { cwd: process.cwd() }) {
  return new Promise((resolve, reject) => {
    const output = crypto.createHash('md5')
    const input = fs.createReadStream(path.resolve(cwd, filename));

    input.on('error', (err) => {
      reject(err)
    })

    output.once('readable', () => {
      resolve(output.read().toString('hex'))
    })

    input.pipe(output)
  })
}
