import fs from 'node:fs';
import path from 'node:path';

export default function () {
  const types = { projects: 'project', knowledge: 'knowledge', talks: 'talk', updates: 'update' };
  const groups = {};
  for (const [folder, kind] of Object.entries(types)) {
    groups[folder] = fs.readdirSync(`content/${folder}`).filter(name => name.endsWith('.json')).map(name => {
      const item = JSON.parse(fs.readFileSync(`content/${folder}/${name}`, 'utf8'));
      const stem = path.basename(name, '.json');
      if (item.published !== false && (!item.title || !item.summary || !item.body || (!item.legacyOrder && !item.date))) {
        throw new Error(`${folder}/${name} 缺少标题、摘要、正文或发布日期，请在内容管理界面补齐。`);
      }
      if (item.published !== false && kind === 'talk' && (!item.speaker || !item.eventDate || !item.eventStart || !item.eventEnd)) {
        throw new Error(`${folder}/${name} 缺少嘉宾或分享时间，请在内容管理界面补齐。`);
      }
      const headings = [...(item.body || '').matchAll(/^##\s+(.+)$/gm)].map((match, index) => ({ title: match[1].replace(/[*_`]/g, ''), id: `section-${index + 1}` }));
      return { ...item, headings, image: (item.image || '').replace(/^\/+/, ''), video: (item.video || '').replace(/^\/+/, ''), videoPoster: (item.videoPoster || '').replace(/^\/+/, ''), kind, url: item.legacyUrl || `${kind}-${stem}.html`, id: `${kind}:${stem}` };
    }).filter(item => item.published !== false).sort((a, b) => (b.date || '').localeCompare(a.date || '') || (a.legacyOrder || 9999) - (b.legacyOrder || 9999) || a.id.localeCompare(b.id));
  }
  const now = Date.now();
  const knowledgeArticles = groups.knowledge.filter(item => item.series);
  const knowledgeResources = groups.knowledge.filter(item => !item.series);
  for (const item of groups.talks) item.eventEnded = Boolean(item.eventDate && new Date(`${item.eventDate}T${item.eventEnd || '23:59'}:00+08:00`).getTime() < now);
  const site = JSON.parse(fs.readFileSync('content/site.json', 'utf8'));
  site.qrImage = site.qrImage.replace(/^\/+/, '');
  return { ...groups, knowledgeArticles, knowledgeResources, talksUpcoming: groups.talks.filter(item => !item.eventEnded), talksPast: groups.talks.filter(item => item.eventEnded), all: Object.values(groups).flat(), site };
}
