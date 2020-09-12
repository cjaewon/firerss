import './lib/env';
import Parser from 'rss-parser';

import { getRssList } from './lib/rss';
import { toMarkdown } from './lib/markdown';

const parser = new Parser();

async function main() {
  const data = {} as { [key: string]: Parser.Output };
  const rssList = await getRssList();

  for (const url of rssList) {
    const feed = await parser.parseURL(url);

    if (!feed.items) {
      console.error(`Failed fetching ${url}`);
      continue;
    }

    data[url] = feed;
  }

  const markdown = toMarkdown(data);
  console.log(markdown);
}

main();