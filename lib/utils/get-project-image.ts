import cryptoguessr from '@/app/images/cryptoguessr.jpg';
import polygons from '@/app/images/polygons.jpg';
import obat from '@/app/images/obat.jpg';
import happywait from '@/app/images/happywait.jpg';
import adeo from '@/app/images/adeo.jpg';
import maisondesfemmes from '@/app/images/maisondesfemmes.jpg';
import gazettedemonaco from '@/app/images/gazettedemonaco.jpg';
import alpinecars from '@/app/images/alpinecars.jpg';
import bluesystems from '@/app/images/bluesystems.jpg';
import ouestfrance from '@/app/images/ouestfrance.jpg';
import pagesjaunes from '@/app/images/pagesjaunes.jpg';

// Gradient placeholder image
const placeholderBase64 =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOnJnYig5NCw4NCwyMzApO3N0b3Atb3BhY2l0eTowLjIiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOnJnYigxMDAsOTIsMTg3KTtzdG9wLW9wYWNpdHk6MC4xIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9InJnYig5NCw4NCwyMzApIiBvcGFjaXR5PSIwLjUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkNvbWluZyBTb29uPC90ZXh0Pjwvc3ZnPg==';

const placeholder = {
  src: placeholderBase64,
  height: 400,
  width: 600,
  blurDataURL: placeholderBase64,
};

const images = {
  cryptoguessr,
  polygons,
  obat,
  happywait,
  adeo,
  maisondesfemmes,
  gazettedemonaco,
  alpinecars,
  bluesystems,
  ouestfrance,
  pagesjaunes,
  quaestio: placeholder,
  videobookmark: placeholder,
} as const;

export type ProjectImage = keyof typeof images;
export const getProjectImage = (name: ProjectImage) => images[name];
