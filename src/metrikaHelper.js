import ym from 'react-yandex-metrika';

// Yandex Metrika id
export const YmId = (process.env.NODE_ENV === 'production')
  ? [42857239, 42866674] // <- Alice id, Padavan id
  : [42866674]; // <- Padavan id

export function ymHit(link) {
  setTimeout(() => {
      try {
        ym('hit', link);
      } catch (e) {
        console.error('YM Metrika error', e);
        ymHit(link);
      }
    }, 1000);
}
