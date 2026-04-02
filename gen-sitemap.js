/**
 * gen-sitemap.js — Run: node gen-sitemap.js
 * Produces sitemap.xml (index) + sitemap-{lang}.xml per available language.
 */
const fs = require('fs'), path = require('path');
const BASE = 'https://YOUR_DOMAIN', TODAY = new Date().toISOString().slice(0,10);
const LANGS = ['uk']; // add more as content is added

const src = fs.readFileSync(path.join(__dirname,'assets/js/app.js'),'utf8');
const m   = src.match(/var NAV\s*=\s*(\[[\s\S]*?\n\];)/);
if (!m) { console.error('NAV not found'); process.exit(1); }
const NAV = new Function('return '+m[1])();

function urls(lang) {
  return [
    { loc:BASE+'/'+lang+'/', priority:'1.0', freq:'weekly' },
    ...NAV.flatMap(sec=>sec.articles.map(art=>({
      loc:BASE+'/'+lang+'/'+sec.id+'/'+art.id+'.html', priority:'0.8', freq:'monthly'
    })))
  ];
}
function entry(u){ return '  <url>\n    <loc>'+u.loc+'</loc>\n    <lastmod>'+TODAY+'</lastmod>\n    <changefreq>'+u.freq+'</changefreq>\n    <priority>'+u.priority+'</priority>\n  </url>'; }

const files = LANGS.map(lang=>{
  const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls(lang).map(entry).join('\n')+'\n</urlset>';
  const file='sitemap-'+lang+'.xml';
  fs.writeFileSync(path.join(__dirname,file),xml);
  console.log('✓ '+file+' — '+urls(lang).length+' URLs');
  return file;
});

const idx='<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+files.map(f=>'  <sitemap>\n    <loc>'+BASE+'/'+f+'</loc>\n    <lastmod>'+TODAY+'</lastmod>\n  </sitemap>').join('\n')+'\n</sitemapindex>';
fs.writeFileSync(path.join(__dirname,'sitemap.xml'),idx);
console.log('✓ sitemap.xml');
