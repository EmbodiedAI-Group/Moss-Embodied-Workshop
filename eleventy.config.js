import markdownit from 'markdown-it';
const md = markdownit({ html: true, linkify: true });
// Chinese text can touch **bold** without spaces; parse it without touching code spans.
md.inline.ruler.before('emphasis', 'cjk-strong', (state, silent) => {
  const start = state.pos;
  if (!state.src.startsWith('**', start)) return false;
  const end = state.src.indexOf('**', start + 2);
  if (end < 0 || end === start + 2 || /^\s|\s$/.test(state.src.slice(start + 2, end))) return false;
  if (!silent) {
    state.push('strong_open', 'strong', 1);
    state.md.inline.parse(state.src.slice(start + 2, end), state.md, state.env, state.tokens);
    state.push('strong_close', 'strong', -1);
  }
  state.pos = end + 2;
  return true;
});
export default function (config) {
  config.addPassthroughCopy({ 'assets': 'assets' });
  config.addFilter('markdown', (value = '', kind = '') => {
    let index = 0;
    const ids = kind === 'talk' ? ['intro-title', 'insights-title', 'forceband-title'] : [];
    return md.render(value).replace(/(src|href)="\/(?!\/)/g, '$1="').replace(/<h2>/g, () => {
      const id = ids[index] || `section-${index + 1}`;
      index += 1;
      return `<h2 id="${id}">`;
    });
  });
  config.addFilter('limit', (items, count) => items.slice(0, count));
  config.addFilter('lines', (value = '') => value.split('\n').filter(Boolean));
  config.addFilter('safeDate', (value = '') => value.slice(0, 10).replaceAll('-', '.'));
  config.setNunjucksEnvironmentOptions({ autoescape: true });
  return { dir: { input: 'site', output: '_site', includes: '_includes' }, templateFormats: ['njk'] };
}
