import test from 'ava';
import path from 'path';
import glob from 'fast-glob';
import { md5Files } from './md5-files.js';

test('get md5', async (t) => {
  const result = await md5Files(await glob(['__FIXTURE__/*', '__FIXTURE__/folder/*', '!__FIXTURE__/b']));
  
  t.deepEqual({
    '__FIXTURE__/a': '755f85c2723bb39381c7379a604160d8',
    '__FIXTURE__/empty': 'd41d8cd98f00b204e9800998ecf8427e',
    '__FIXTURE__/empty2': 'd41d8cd98f00b204e9800998ecf8427e',
    '__FIXTURE__/folder/nested': '5d41402abc4b2a76b9719d911017c592',
  }, result);
})

test('cwd', async (t) => {
  const cwd = path.resolve(process.cwd(), '__FIXTURE__');
  const result = await md5Files(await glob(['*', 'folder/*', '!b'], { cwd }), { cwd });
  
  t.deepEqual({
    'a': '755f85c2723bb39381c7379a604160d8',
    'empty': 'd41d8cd98f00b204e9800998ecf8427e',
    'empty2': 'd41d8cd98f00b204e9800998ecf8427e',
    'folder/nested': '5d41402abc4b2a76b9719d911017c592',
  }, result);
})
