import octokit from './octokit';

export const getRssList = async() => {
  const repoName = process.env.repo || 'firerss';

  const user = await octokit.users.getAuthenticated();
  const file = await octokit.repos.getContent({
    owner: user.data.login,
    repo: repoName,
    path: process.env.RSS_FILE || 'RSS.md',
  });
  
  const content = Buffer.from(file.data.content, 'base64').toString();
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
