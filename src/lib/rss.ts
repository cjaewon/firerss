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
