import i18next from 'i18next';
import Parser from 'rss-parser';
import dayjs from 'dayjs';

export const toMarkdown = (data: { [key: string]: Parser.Output} ) => {
  let markdown = '';
  const recentlyPost = [];

  for (const [key, feed] of Object.entries(data)) {
    const items = feed.items!.slice(0,5);
    markdown += `## ${feed.title}\n`;
    markdown += `> ${i18next.t('recently_posting')} : ${feed.items?.[0] && dayjs(feed.items?.[0].pubDate).format('MMM, D YYYY') || `😞 ${i18next.t('not_yet')}`}\n`;

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

  recentlyMarkdown += `### ${i18next.t('recently_post')}\n`;
  recentlyMarkdown += `> ${i18next.t('recently_posting')}: ${dayjs(recentlyPost[0].pubDate!).format('MMM, D YYYY')}\n`;

  for (const item of recentlyPost.slice(0, 5)) {
    recentlyMarkdown += `- [\`${item.title} - ${item.blogName}\`](${item.link})\n`;
  }

  recentlyMarkdown += '\n';
  markdown = recentlyMarkdown + markdown;

  return markdown;
};