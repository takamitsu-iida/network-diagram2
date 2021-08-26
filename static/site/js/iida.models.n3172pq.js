/* global iida */

(function () {
  iida.models.n3172 = (function () {

    var MODEL = 'N3172PQ';
    var THUMBNAIL_PATH = 'static/site/img/sN3172PQ.png';
    var IMG_PATH = 'static/site/img/N3172PQ.png';
    var IMG_WIDTH = 1920;
    var IMG_HEIGHT = 173;
    var PORT_WIDTH = 52;
    var PORT_HEIGHT = 36;

    // (x, y) by paint application
    var positionMap = {

      // interface Ethernet1/1
      'E1/1': [152, 52],
      'E1/2': [152, 114],

      'E1/3': [210, 52],
      'E1/4': [210, 114],

      'E1/5': [266, 52],
      'E1/6': [266, 114],

      'E1/7': [324, 52],
      'E1/8': [324, 114],

      'E1/9': [380, 52],
      'E1/10': [380, 114],

      'E1/11': [438, 52],
      'E1/12': [438, 114],

      'E1/13': [496, 52],
      'E1/14': [496, 114],

      'E1/15': [552, 52],
      'E1/16': [552, 114],

      'E1/17': [608, 52],
      'E1/18': [608, 114],

      'E1/19': [666, 52],
      'E1/20': [666, 114],

      'E1/21': [724, 52],
      'E1/22': [724, 114],

      'E1/23': [780, 52],
      'E1/24': [780, 114],

      'E1/25': [850, 52],
      'E1/26': [850, 114],

      'E1/27': [908, 52],
      'E1/28': [908, 114],

      'E1/29': [966, 52],
      'E1/30': [966, 114],

      'E1/31': [1022, 52],
      'E1/32': [1022, 114],

      'E1/33': [1080, 52],
      'E1/34': [1080, 114],

      'E1/35': [1138, 52],
      'E1/36': [1138, 114],

      'E1/37': [1194, 52],
      'E1/38': [1194, 114],

      'E1/39': [1252, 52],
      'E1/40': [1252, 114],

      'E1/41': [1308, 52],
      'E1/42': [1308, 114],

      'E1/43': [1366, 52],
      'E1/44': [1366, 114],

      'E1/45': [1424, 52],
      'E1/46': [1424, 114],

      'E1/47': [1480, 52],
      'E1/48': [1480, 114],

      'E1/49': [1582, 52],
      'E1/50': [1582, 114],

      'E1/51': [1666, 52],
      'E1/52': [1666, 114],

      'E1/53': [1748, 52],
      'E1/54': [1748, 114],

    };

    for (const prop in positionMap) {
      if (prop.startsWith('E1')) {
        positionMap['Eth' + prop.substr(1)] = positionMap[prop];
        positionMap['Ethernet' + prop.substr(1)] = positionMap[prop];
      } else if (prop.startsWith('G0')) {
        positionMap['Gi' + prop.substr(1)] = positionMap[prop];
        positionMap['GigabitEthernet' + prop.substr(1)] = positionMap[prop];
      } else if (prop.startsWith('T0')) {
        positionMap['Te' + prop.substr(1)] = positionMap[prop];
        positionMap['TenGigE' + prop.substr(1)] = positionMap[prop];
      } else if (prop.startsWith('H0')) {
        positionMap['Hu' + prop.substr(1)] = positionMap[prop];
        positionMap['HundredGigE' + prop.substr(1)] = positionMap[prop];
      }
    }

    var offsetMap = {};
    for (let k in positionMap) {
      offsetX = positionMap[k][0] - IMG_WIDTH / 2;
      offsetY = positionMap[k][1] - IMG_HEIGHT / 2;
      offsetMap[k] = [offsetX, offsetY];
    }

    return {
      MODEL,
      THUMBNAIL_PATH,
      IMG_PATH,
      IMG_WIDTH,
      IMG_HEIGHT,
      PORT_WIDTH,
      PORT_HEIGHT,
      offsetMap,
    };
  })();
  //
})();
