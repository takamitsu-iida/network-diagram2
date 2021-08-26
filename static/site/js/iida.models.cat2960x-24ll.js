/* global iida */

(function () {
  iida.models.cat2960x24 = (function () {

    var MODEL = 'CAT2960X-24LL';
    var THUMBNAIL_PATH = 'static/site/img/sCAT2960X-24LL.png';
    var IMG_PATH = 'static/site/img/CAT2960X-24LL.png';
    var IMG_WIDTH = 1920;
    var IMG_HEIGHT = 173;
    var PORT_WIDTH = 50;
    var PORT_HEIGHT = 30;

    // (x, y) by paint application
    var positionMap = {

      // interface GigabitEthernet0/1/0
      'G0/1': [934, 74],
      'G0/2': [934, 120],

      'G0/3': [988, 74],
      'G0/4': [988, 120],

      'G0/5': [1044, 74],
      'G0/6': [1044, 120],

      'G0/7': [1100, 74],
      'G0/8': [1100, 120],

      'G0/9': [1154, 74],
      'G0/10': [1154, 120],

      'G0/11': [1210, 74],
      'G0/12': [1210, 120],

      'G0/13': [1300, 74],
      'G0/14': [1300, 120],

      'G0/15': [1354, 74],
      'G0/16': [1354, 120],

      'G0/17': [1410, 74],
      'G0/18': [1410, 120],

      'G0/19': [1464, 74],
      'G0/20': [1464, 120],

      'G0/21': [1520, 74],
      'G0/22': [1520, 120],

      'G0/23': [1576, 74],
      'G0/24': [1576, 120],

    };

    for (const prop in positionMap) {
      if (prop.startsWith('G0')) {
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
