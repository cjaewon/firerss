import Parser from 'rss-parser';

export const toMarkdown = (data: { [key: string]: Parser.Output} ) => {
  let markdown = '';
  const recentlyPost = [];

  for (const [key, feed] of Object.entries(data)) {
    const items = feed.items!.slice(0,5);
    markdown += `## ${feed.title}\n`;
    markdown += `> Recently Posting : ${feed.items?.[0].pubDate || '😞 Not yet\n'}`

    for (const item of items) {
      markdown += `- [\`${item.title}\`](${item.link})\n`;
      recentlyPost.push({
        ...item,
        blogName: feed.title,
      });
    }

    markdown += '\n';
  }

  let recentlyMarkdown = '';
  recentlyPost.sort((x, y) => {
    if (!x.pubDate || !y.pubDate) return 0;

    return (new Date(y.pubDate!) as any) - (new Date(x.pubDate!) as any);
  });

  recentlyMarkdown += '### Recently Post\n';
  recentlyMarkdown += `> Recently Posting: ${new Date(recentlyPost[0].pubDate!)}\n`;

  for (const item of recentlyPost.slice(0, 5)) {
    recentlyMarkdown += `- [\`${item.title} - ${item.blogName}\`](${item.link})\n`;
  }

  recentlyMarkdown += '\n';
  markdown = recentlyMarkdown + markdown;

  return markdown;
};