import Parser from 'rss-parser';

export const toMarkdown = (data: { [key: string]: Parser.Output} ) => {
  let markdown = '';

  for (const [key, feed] of Object.entries(data)) {
    const items = feed.items!.slice(0,5);
    markdown += `## ${feed.title}\n`;

    for (const item of items) {
      markdown += `- [\`${item.title}\`](${item.link})\n`;
    }

    markdown += '\n';
  }

  return markdown;
};