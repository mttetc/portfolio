import cryptoguessr from '@/app/images/cryptoguessr.webp';
import polygons from '@/app/images/polygons.webp';
import obat from '@/app/images/obat.webp';
import happywait from '@/app/images/happywait.webp';
import adeo from '@/app/images/adeo.webp';
import maisondesfemmes from '@/app/images/maisondesfemmes.webp';
import gazettedemonaco from '@/app/images/gazettedemonaco.webp';
import alpinecars from '@/app/images/alpinecars.webp';
import bluesystems from '@/app/images/bluesystems.webp';
import ouestfrance from '@/app/images/ouestfrance.webp';
import pagesjaunes from '@/app/images/pagesjaunes.webp';
import agentreplay from '@/app/images/agentreplay.webp';
import cryptosentry from '@/app/images/cryptosentry.webp';
import kantotacticsmeta from '@/app/images/kantotacticsmeta.webp';

// Gradient placeholder image
const placeholderBase64 =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOnJnYigyMCwxODQsMTY2KTtzdG9wLW9wYWNpdHk6MC4yIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjpyZ2IoMTMsMTQ4LDEzNik7c3RvcC1vcGFjaXR5OjAuMSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJyZ2IoMjAsMTg0LDE2NikiIG9wYWNpdHk9IjAuNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+Q29taW5nIFNvb248L3RleHQ+PC9zdmc+';

const placeholder = {
  src: placeholderBase64,
  height: 400,
  width: 600,
  blurDataURL: placeholderBase64,
};

const images = {
  agentreplay,
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
  taskFlow: placeholder,
  tabs: placeholder,
  livethread: placeholder,
  cryptosentry,
  kantotacticsmeta,
  nestjsAuthApi: placeholder,
} as const;

export type ProjectImage = keyof typeof images;
export const hasProjectImage = (name: string): name is ProjectImage => name in images;
export const getProjectImage = (name: ProjectImage) => images[name];
export { placeholder };
