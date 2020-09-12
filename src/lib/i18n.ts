import i18next from 'i18next';

async function boostrap() {
  await i18next.init({
    lng: 'en',
    debug: false,
    resources: {
      en: {
        translation: {
          recently_post: 'Recently Post',
          recently_posting: 'Recently Posting',
          not_yet: 'Not yet',
        }
      },
      ko: {
        translation: {
          recently_post: '최신 포스트',
          recently_posting: '최신 포스팅',
          not_yet: '아직이에요.'
        }
      },
    }
  });
}

export default boostrap;