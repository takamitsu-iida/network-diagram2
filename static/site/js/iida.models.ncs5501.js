/* global iida */

(function () {
  iida.models.ncs5501 = (function () {
    var THUMBNAIL_PATH = 'static/site/img/sNCS-5501.png';
    var IMG_PATH = 'static/site/img/NCS-5501.png';
    var IMG_WIDTH = 1920;
    var IMG_HEIGHT = 168;
    var PORT_WIDTH = 56;
    var PORT_HEIGHT = 30;

    // (x, y) by paint application
    var positionMap = {
      // interface GigabitEthernet0/0/0/1
      // interface TenGigE0/0/0/1

      'G0/0/0/0': [80, 42],
      'G0/0/0/1': [80, 108],

      'G0/0/0/2': [140, 42],
      'G0/0/0/3': [140, 108],

      'G0/0/0/4': [205, 42],
      'G0/0/0/5': [205, 108],

      'G0/0/0/6': [270, 42],
      'G0/0/0/7': [270, 108],

      'G0/0/0/8': [330, 42],
      'G0/0/0/9': [330, 108],

      'G0/0/0/10': [390, 42],
      'G0/0/0/11': [390, 108],

      'G0/0/0/12': [455, 42],
      'G0/0/0/13': [455, 108],

      'G0/0/0/14': [515, 42],
      'G0/0/0/15': [515, 108],

      'G0/0/0/16': [600, 42],
      'G0/0/0/17': [600, 108],

      'G0/0/0/18': [660, 42],
      'G0/0/0/19': [660, 108],

      'G0/0/0/20': [720, 42],
      'G0/0/0/21': [720, 108],

      'G0/0/0/22': [780, 42],
      'G0/0/0/23': [780, 108],

      'G0/0/0/24': [840, 42],
      'G0/0/0/25': [840, 108],

      'G0/0/0/26': [900, 42],
      'G0/0/0/27': [900, 108],

      'G0/0/0/28': [965, 42],
      'G0/0/0/29': [965, 108],

      'G0/0/0/30': [1025, 42],
      'G0/0/0/31': [1025, 108],

      'G0/0/0/32': [1107, 42],
      'G0/0/0/33': [1107, 108],

      'G0/0/0/34': [1170, 42],
      'G0/0/0/35': [1170, 108],

      'G0/0/0/36': [1230, 42],
      'G0/0/0/37': [1230, 108],

      'G0/0/0/38': [1290, 42],
      'G0/0/0/39': [1290, 108],

      'G0/0/0/40': [1355, 42],
      'G0/0/0/41': [1355, 108],

      'G0/0/0/42': [1415, 42],
      'G0/0/0/43': [1415, 108],

      'G0/0/0/44': [1477, 42],
      'G0/0/0/45': [1477, 108],

      'G0/0/0/46': [1540, 42],
      'G0/0/0/47': [1540, 108],

      // interface HundredGigE0/0/1/0
      'H0/0/1/0': [1640, 44],
      'H0/0/1/1': [1640, 112],

      'H0/0/1/2': [1740, 44],
      'H0/0/1/3': [1740, 112],

      'H0/0/1/4': [1835, 44],
      'H0/0/1/5': [1835, 112],
    };

    for (const prop in positionMap) {
      if (prop.startsWith('G0')) {
        positionMap['Gi' + prop.substr(1)] = positionMap[prop];
        positionMap['GigabitEthernet' + prop.substr(1)] = positionMap[prop];
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
