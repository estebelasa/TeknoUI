// Fails if a `var(--tk-…)` references a custom property that is never declared.
// An undefined var makes the whole CSS declaration invalid at computed time,
// silently: no build error, so this check is the only guard.
// Usage: node scripts/check-tokens.mjs [dir=projects/teknoui/src]
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2] ?? 'projects/teknoui/src';
const EXTENSIONS = /\.(s?css|ts|html)$/;

function* files(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* files(path);
    else if (EXTENSIONS.test(entry.name)) yield path;
  }
}

const defined = new Set();
const used = new Map(); // token -> first file that uses it

for (const file of files(root)) {
  const text = readFileSync(file, 'utf8');
  for (const [, name] of text.matchAll(/(--tk-[a-z0-9-]+)\s*:/g)) defined.add(name);
  for (const [, name] of text.matchAll(/var\(\s*(--tk-[a-z0-9-]+)/g)) {
    if (!used.has(name)) used.set(name, file);
  }
}

const missing = [...used].filter(([name]) => !defined.has(name));

if (missing.length > 0) {
  console.error(`${missing.length} --tk-* token(s) used but never defined:`);
  for (const [name, file] of missing) console.error(`  ${name}  (${file})`);
  process.exit(1);
}
console.log(`OK: ${used.size} --tk-* tokens used, all defined (${defined.size} defined).`);
