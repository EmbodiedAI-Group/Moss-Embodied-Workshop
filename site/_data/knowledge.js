import fs from 'node:fs';

export default function () {
  return JSON.parse(fs.readFileSync('content/knowledge-guide.json', 'utf8'));
}
