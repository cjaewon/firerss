import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: `token ${process.env.GH_TOKEN}` });

export default octokit;