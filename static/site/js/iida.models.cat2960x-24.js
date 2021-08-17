/* global iida */

(function () {
  iida.models.cat2960x24 = (function () {

    var MODEL = 'CAT2960X-24';
    var THUMBNAIL_PATH = 'static/site/img/sCAT2960X-24.png';
    var IMG_PATH = 'static/site/img/CAT2960X-24.png';
    var IMG_WIDTH = 1920;
    var IMG_HEIGHT = 188;
    var PORT_WIDTH = 50;
    var PORT_HEIGHT = 30;

    // (x, y) by paint application
    var positionMap = {

      // interface GigabitEthernet0/1/0
      'G0/1': [844, 74],
      'G0/2': [844, 128],

      'G0/3': [904, 74],
      'G0/4': [904, 128],

      'G0/5': [964, 74],
      'G0/6': [964, 128],

      'G0/7': [1025, 74],
      'G0/8': [1025, 128],

      'G0/9': [1085, 74],
      'G0/10': [1085, 128],

      'G0/11': [1145, 74],
      'G0/12': [1145, 128],

      'G0/13': [1231, 74],
      'G0/14': [1231, 128],

      'G0/15': [1292, 74],
      'G0/16': [1292, 128],

      'G0/17': [1353, 74],
      'G0/18': [1353, 128],

      'G0/19': [1412, 74],
      'G0/20': [1412, 128],

      'G0/21': [1473, 74],
      'G0/22': [1473, 128],

      'G0/23': [1534, 74],
      'G0/24': [1534, 128],

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
