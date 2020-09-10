import octokit from "./octokit";

export const getRssList = async() => {
  const repo = process.env.repo;
  if (!repo) throw new Error('Can\'t find repo env');

  const user = await octokit.users.getByUsername();
  console.log(user);

  octokit.repos.get({
    owner: user.data.name,
    repo,
  });
};