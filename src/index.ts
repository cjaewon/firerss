import './lib/env';
import i18n from './lib/i18n';

import Parser from 'rss-parser';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { getRssList } from './lib/rss';
import { toMarkdown } from './lib/markdown';
import octokit from './lib/octokit';

const parser = new Parser();

async function main() {
  await i18n();
  dayjs.locale(process.env.LANG || 'en');

  const user = await octokit.users.getAuthenticated();
  const file = await octokit.repos.getContent({
    owner: user.data.login,
    repo: process.env.repo || 'firerss',
    path: process.env.RSS_FILE || 'RSS.md',
  });

  const content = Buffer.from(file.data.content, 'base64').toString();

  const data = {} as { [key: string]: Parser.Output };
  const rssList = await getRssList(content);

  for (const url of rssList) {
    const feed = await parser.parseURL(url);

    if (!feed.items) {
      console.error(`Failed fetching ${url}`);
      continue;
    }

    data[url] = feed;
  }

  const markdown = toMarkdown(data);
  let result = content.replace(
    /<!--\sFIRERSS-VIEW:START\s-->((.|\n)*)<!--\sFIRERSS-VIEW:END\s-->/g,
    `<!--\sFIRERSS-VIEW:START\s-->\n${markdown}\n<!--\sFIRERSS-VIEW:END\s-->`
  );

  await octokit.repos.createOrUpdateFileContents({
    owner: user.data.login,
    repo: process.env.repo || 'firerss',
    path: process.env.RSS_FILE || 'RSS.md',
    message: `${['🤟', '🎉', '📅', '🚀'][Math.floor(Math.random() * 4)]} Happy RSS!`,
    content: Buffer.from(result).toString('base64'),
    sha: file.data.sha,
  });
}

main();