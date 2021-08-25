/* global iida */

(function () {
  iida.models.ncs5501 = (function () {

    var MODEL = 'NCS5501';
    var THUMBNAIL_PATH = 'static/site/img/sNCS5501.png';
    var IMG_PATH = 'static/site/img/NCS5501.png';
    var IMG_WIDTH = 1920;
    var IMG_HEIGHT = 172;
    var PORT_WIDTH = 52;
    var PORT_HEIGHT = 30;

    // (x, y) by paint application
    var positionMap = {
      // interface GigabitEthernet0/0/0/1
      // interface TenGigE0/0/0/1

      'G0/0/0/0': [155, 60],
      'G0/0/0/1': [155, 124],

      'G0/0/0/2': [211, 60],
      'G0/0/0/3': [211, 124],

      'G0/0/0/4': [268, 60],
      'G0/0/0/5': [268, 124],

      'G0/0/0/6': [324, 60],
      'G0/0/0/7': [324, 124],

      'G0/0/0/8': [378, 60],
      'G0/0/0/9': [378, 124],

      'G0/0/0/10': [436, 60],
      'G0/0/0/11': [436, 124],

      'G0/0/0/12': [492, 60],
      'G0/0/0/13': [492, 124],

      'G0/0/0/14': [548, 60],
      'G0/0/0/15': [548, 124],

      'G0/0/0/16': [622, 60],
      'G0/0/0/17': [622, 124],

      'G0/0/0/18': [680, 60],
      'G0/0/0/19': [680, 124],

      'G0/0/0/20': [735, 60],
      'G0/0/0/21': [735, 124],

      'G0/0/0/22': [792, 60],
      'G0/0/0/23': [792, 124],

      'G0/0/0/24': [847, 60],
      'G0/0/0/25': [847, 124],

      'G0/0/0/26': [904, 60],
      'G0/0/0/27': [904, 124],

      'G0/0/0/28': [960, 60],
      'G0/0/0/29': [960, 124],

      'G0/0/0/30': [1016, 60],
      'G0/0/0/31': [1016, 124],

      'G0/0/0/32': [1091, 60],
      'G0/0/0/33': [1091, 124],

      'G0/0/0/34': [1148, 60],
      'G0/0/0/35': [1148, 124],

      'G0/0/0/36': [1204, 60],
      'G0/0/0/37': [1204, 124],

      'G0/0/0/38': [1260, 60],
      'G0/0/0/39': [1260, 124],

      'G0/0/0/40': [1316, 60],
      'G0/0/0/41': [1316, 124],

      'G0/0/0/42': [1373, 60],
      'G0/0/0/43': [1373, 124],

      'G0/0/0/44': [1428, 60],
      'G0/0/0/45': [1428, 124],

      'G0/0/0/46': [1485, 60],
      'G0/0/0/47': [1485, 124],

      // interface HundredGigE0/0/1/0
      'H0/0/1/0': [1580, 60],
      'H0/0/1/1': [1580, 124],

      'H0/0/1/2': [1668, 60],
      'H0/0/1/3': [1668, 124],

      'H0/0/1/4': [1756, 60],
      'H0/0/1/5': [1756, 124],
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
