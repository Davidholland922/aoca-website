// Tells Bing, Yandex, Seznam and Naver (IndexNow) that pages changed, so they
// re-crawl now instead of on their own schedule. Bing's index feeds ChatGPT
// search and Copilot. Run after a deploy that changes content:
//   node scripts/indexnow.mjs            every URL in the live sitemap
//   node scripts/indexnow.mjs /company   just the paths given
const HOST = "www.aoca.ie";
const KEY = "8e87993e9afb3d973f6d51866b387bbd"; // public by design: served at /${KEY}.txt

const paths = process.argv.slice(2);
let urlList;
if (paths.length) {
  urlList = paths.map((p) => new URL(p, `https://${HOST}`).href);
} else {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});
console.log(`IndexNow: ${urlList.length} URLs submitted, HTTP ${res.status}`);
if (!res.ok) {
  console.log(await res.text());
  process.exit(1);
}
