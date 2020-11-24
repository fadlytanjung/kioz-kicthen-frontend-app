const BASE_URL_PROD = 'https://api.useetv.com';
const BASE_URL_DEV = 'http://indibox-plus-content-dev.vsan-apps.playcourt.id';
const BASE_URL_UAT = 'https://stage.indibox.id';

const BASE_URL_USER_PROD = 'https://api.useetv.com';
const BASE_URL_USER_DEV = 'http://indibox-plus-user-dev.vsan-apps.playcourt.id';
const BASE_URL_USER_UAT = 'https://stage.indibox.id';

const BASE_URL_POINT_PROD = 'https://api.useetv.com';
const BASE_URL_POINT_DEV = 'http://indibox-plus-point-dev.vsan-apps.playcourt.id';
const BASE_URL_POINT_UAT = 'https://stage.indibox.id';

const BASE_URL_GAMES_PROD = 'https://api.useetv.com';
const BASE_URL_GAMES_DEV = 'http://indibox-plus-games-dev.vsan-apps.playcourt.id';
const BASE_URL_GAMES_UAT = 'https://stage.indibox.id';

const BASE_URL_WORKER_PROD = 'https://api.useetv.com';
const BASE_URL_WORKER_DEV = 'http://indibox-plus-worker-dev.vsan-apps.playcourt.id';
const BASE_URL_WORKER_UAT = 'https://stage.indibox.id';

const BASE_URL_NOTIF_PROD = 'https://api.useetv.com';
const BASE_URL_NOTIF_DEV = 'http://indibox-plus-notification-dev.vsan-apps.playcourt.id';
const BASE_URL_NOTIF_UAT = 'https://stage.indibox.id';

const VERSION_PROD = 'v1.0.0';
const VERSION_DEV = 'v1.0.0-dev';
const VERSION_UAT = 'v1.0.0-stage';

let BASE_URL = process.env.NODE_ENV == 'production' && !__DEV__ ? BASE_URL_PROD : BASE_URL_DEV;
let BASE_URL_GAMES = process.env.NODE_ENV == 'production' && !__DEV__ ? BASE_URL_GAMES_PROD : BASE_URL_GAMES_DEV;
let BASE_URL_POINT = process.env.NODE_ENV == 'production' && !__DEV__ ? BASE_URL_POINT_PROD : BASE_URL_POINT_DEV;
let BASE_URL_USER = process.env.NODE_ENV == 'production' && !__DEV__ ? BASE_URL_USER_PROD : BASE_URL_USER_DEV;
let BASE_URL_WORKER = process.env.NODE_ENV == 'production' && !__DEV__ ? BASE_URL_WORKER_PROD : BASE_URL_WORKER_DEV;
let BASE_URL_NOTIF = process.env.NODE_ENV == 'production' && !__DEV__ ? BASE_URL_NOTIF_PROD : BASE_URL_NOTIF_DEV;
let VERSION = process.env.NODE_ENV == 'production' && !__DEV__ ? VERSION_PROD : VERSION_DEV;

if (typeof __UAT__ != 'undefined' && __UAT__) BASE_URL = BASE_URL_UAT;
if (typeof __UAT__ != 'undefined' && __UAT__) BASE_URL_GAMES = BASE_URL_GAMES_UAT;
if (typeof __UAT__ != 'undefined' && __UAT__) BASE_URL_POINT = BASE_URL_POINT_UAT;
if (typeof __UAT__ != 'undefined' && __UAT__) BASE_URL_USER = BASE_URL_USER_UAT;
if (typeof __UAT__ != 'undefined' && __UAT__) BASE_URL_WORKER = BASE_URL_WORKER_UAT;
if (typeof __UAT__ != 'undefined' && __UAT__) BASE_URL_NOTIF = BASE_URL_NOTIF_UAT;
if (typeof __UAT__ != 'undefined' && __UAT__) VERSION = VERSION_UAT;

const services = {
  ADMIN: `${BASE_URL_USER}/users/v1/admin`,
  BANNER: (id) => `${BASE_URL_NOTIF}/fcm/v1/banner${id ? '/' + id : ''}`,
  GAME_DETAIL: `${BASE_URL_GAMES}/games/v1`,
  GAME_INSERT: `${BASE_URL_GAMES}/games/v1/insert`,
  GAME_UPDATE: `${BASE_URL_GAMES}/games/v1`,
  GET_DETAIL_ADMIN: `${BASE_URL_USER}/users/v1/profile-admin`,
  LIST_ADMIN: `${BASE_URL_USER}/users/v1/list-admin?page=1&size=100`,
  LIST_GAMES: `${BASE_URL_GAMES}/games/v1/list?page=1&size=100`,
  LIST_QUEST: `${BASE_URL_POINT}/point/v1/quest?page=1&size=100`,
  LIST_USER: (page,size) => `${BASE_URL_USER}/users/v1/list-users?page=${page}&size=${size}`,
  LOGIN: `${BASE_URL_USER}/users/v1/login-admin`,
  NOTIFICATION: (id)=> `${BASE_URL_NOTIF}/fcm/v1/notification${id ? '/'+id : ''}`,
  NOTIFICATION_BANNER: `${BASE_URL_NOTIF}/fcm/v1/banner`,
  NOTIFICATION_LIST: `${BASE_URL_NOTIF}/fcm/v1/notification/list?page=1&size=10000`,
  POPUP_BANNER_LIST: `${BASE_URL_NOTIF}/fcm/v1/banner/?page=1&size=10000`,
  OFFERING: `${BASE_URL_POINT}/point/v1/offering`,
  OFFERING_LIST: `${BASE_URL_POINT}/point/v1/offering?page=1&size=10000`,
  PARTICIPANT: (id,page,size) =>`${BASE_URL_POINT}/point/v1/list-participant?offeringId=${id}&page=${page}&size=${size}`,
  PUBLISH_NOTIF: (topic) => `${BASE_URL_NOTIF}/fcm/v1/${topic !== null ? `blast-notification?topic=${topic}` : 'notification'}`,
  QUEST: `${BASE_URL_POINT}/point/v1/quest`,
  TAG: `${BASE_URL}/content/v1/tag`,
  UPDATE_POINT: `${BASE_URL_POINT}/point/v1/update-point`,
  UPLOAD: `${BASE_URL}/content/v1/bulk`,
  USER_HISTORY_DASHBOARD: `${BASE_URL_POINT}/point/v1/user-history-dashboard`,
  'version': VERSION,
};

export default services;