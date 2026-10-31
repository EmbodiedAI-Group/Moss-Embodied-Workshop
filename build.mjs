import { build } from 'esbuild';
import Eleventy from '@11ty/eleventy';
import { mkdir, readdir, rm } from 'node:fs/promises';

await build({ entryPoints:['src/motion.jsx'], outfile:'assets/motion.js', bundle:true, minify:true, format:'iife', target:['es2020'], jsx:'automatic', define:{ 'process.env.NODE_ENV':'"production"' }, legalComments:'eof', logLevel:'info' });
await build({ entryPoints:['src/navigation.js'], outfile:'assets/navigation.js', bundle:true, minify:true, format:'iife', target:['es2020'], legalComments:'eof', logLevel:'info' });
const output = new URL('./_site/', import.meta.url);
await mkdir(output, { recursive: true });
for (const entry of await readdir(output)) {
  await rm(new URL(entry, output), { recursive: true, force: true });
}
await new Eleventy('site', '_site').write();
