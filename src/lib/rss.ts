import Parser from 'rss-parser';
import { TextEncoder } from 'util';
import octokit from './octokit';

export const getRssList = async (content: string) => {
  const regex = new RegExp(/<!--\sFIRERSS-CONFIG:START\s-->((.|\n)*)<!--\sFIRERSS-CONFIG:END\s-->/g);

  if (!regex.test(content)) {
    throw new Error('Can`t find FIRERSS-CONFIG:START, FIRERSS-CONFIG:END section');
  }

  regex.lastIndex = 0;

  const matchs = regex.exec(content);
  if (!matchs) process.exit(); // No Data

  const rssList = matchs[1].split('\n')
    .filter(x => x.trim() !== '')
    .map(x => x.trim());
    
  return rssList;
};

export const updateCheck = async (content: string, links: string[], data: { [key: string]: Parser.Output }) => {
  const regex = new RegExp(/<!--\sFIRERSS-DB:START((.|\n)*)FIRERSS-DB:END\s-->/g);

  if (!regex.test(content)) {
    throw new Error('Can`t find FIRERSS-VIEW:START, FIRERSS-VIEW:END section');
  }

  regex.lastIndex = 0;

  const matchs = regex.exec(content);
  if (!matchs) process.exit(); // No Data

  const text = matchs[1];
  const lastData = JSON.parse(text);

  for (const [key, feed] of Object.entries(data)) {
    if (!lastData[key]) continue;

    if (new Date(data[key].items[0].pubDate) > new Date(lastData[key])) {
      
    }
  }
};