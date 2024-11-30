import quaestio from '@/app/images/quaestio.png';
import cryptoguessr from '@/app/images/cryptoguessr.png';
import polygons from '@/app/images/polygons.png';
import obat from '@/app/images/obat.png';
import happywait from '@/app/images/happywait.png';
import videobookmark from '@/app/images/videobookmark.png';
import adeo from '@/app/images/adeo.png';
import maisondesfemmes from '@/app/images/maisondesfemmes.png';
import gazettedemonaco from '@/app/images/gazettedemonaco.png';
import alpinecars from '@/app/images/alpinecars.png';
import bluesystems from '@/app/images/bluesystems.png';
import ouestfrance from '@/app/images/ouestfrance.png';
import pagesjaunes from '@/app/images/pagesjaunes.png';

const images = {
  quaestio,
  cryptoguessr,
  polygons,
  obat,
  happywait,
  videobookmark,
  adeo,
  maisondesfemmes,
  gazettedemonaco,
  alpinecars,
  bluesystems,
  ouestfrance,
  pagesjaunes,
} as const;

export type ProjectImage = keyof typeof images;
export const getProjectImage = (name: ProjectImage) => images[name];
