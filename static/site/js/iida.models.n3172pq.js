/* global iida */

(function () {
  iida.models.n3172 = (function () {

    var MODEL = 'N3172';
    var THUMBNAIL_PATH = 'static/site/img/sNexus3172PQ.png';
    var IMG_PATH = 'static/site/img/Nexus3172PQ.png';
    var IMG_WIDTH = 1920;
    var IMG_HEIGHT = 188;
    var PORT_WIDTH = 56;
    var PORT_HEIGHT = 36;

    // (x, y) by paint application
    var positionMap = {

      // interface Ethernet1/1
      'E1/1': [77, 40],
      'E1/2': [77, 110],

      'E1/3': [140, 40],
      'E1/4': [140, 110],

      'E1/5': [203, 40],
      'E1/6': [203, 110],

      'E1/7': [264, 40],
      'E1/8': [264, 110],

      'E1/9': [327, 40],
      'E1/10': [327, 110],

      'E1/11': [388, 40],
      'E1/12': [388, 110],

      'E1/13': [451, 40],
      'E1/14': [451, 110],

      'E1/15': [513, 40],
      'E1/16': [513, 110],

      'E1/17': [575, 40],
      'E1/18': [575, 110],

      'E1/19': [638, 40],
      'E1/20': [638, 110],

      'E1/21': [700, 40],
      'E1/22': [700, 110],

      'E1/23': [763, 40],
      'E1/24': [763, 110],

      'E1/25': [849, 40],
      'E1/26': [849, 110],

      'E1/27': [911, 40],
      'E1/28': [911, 110],

      'E1/29': [973, 40],
      'E1/30': [973, 110],

      'E1/31': [1036, 40],
      'E1/32': [1036, 110],

      'E1/33': [1098, 40],
      'E1/34': [1098, 110],

      'E1/35': [1159, 40],
      'E1/36': [1159, 110],

      'E1/37': [1222, 40],
      'E1/38': [1222, 110],

      'E1/39': [1284, 40],
      'E1/40': [1284, 110],

      'E1/41': [1347, 40],
      'E1/42': [1347, 110],

      'E1/43': [1409, 40],
      'E1/44': [1409, 110],

      'E1/45': [1471, 40],
      'E1/46': [1471, 110],

      'E1/47': [1533, 40],
      'E1/48': [1533, 110],

      'E1/49': [1644, 40],
      'E1/50': [1644, 110],

      'E1/51': [1737, 40],
      'E1/52': [1737, 110],

      'E1/53': [1829, 40],
      'E1/54': [1829, 110],

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
