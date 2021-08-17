/* global iida */

(function () {
  iida.models.ncs55a1 = (function () {

    var MODEL = 'NCS-55A1-36H';
    var THUMBNAIL_PATH = 'static/site/img/sNCS-55A1-36H.png';
    var IMG_PATH = 'static/site/img/NCS-55A1-36H.png';
    var IMG_WIDTH = 1920;
    var IMG_HEIGHT = 171;
    var PORT_WIDTH = 78;
    var PORT_HEIGHT = 34;

    // (x, y) by paint application
    var positionMap = {
      // interface HundredGigE0/0/0/1
      'H0/0/0/0': [275, 50],
      'H0/0/0/1': [275, 115],

      'H0/0/0/2': [360, 50],
      'H0/0/0/3': [360, 115],

      'H0/0/0/4': [460, 50],
      'H0/0/0/5': [460, 115],

      'H0/0/0/6': [555, 50],
      'H0/0/0/7': [555, 115],

      'H0/0/0/8': [645, 50],
      'H0/0/0/9': [645, 115],

      'H0/0/0/10': [730, 50],
      'H0/0/0/11': [730, 115],

      'H0/0/0/12': [830, 50],
      'H0/0/0/13': [830, 115],

      'H0/0/0/14': [910, 50],
      'H0/0/0/15': [910, 115],

      'H0/0/0/16': [1010, 50],
      'H0/0/0/17': [1010, 115],

      'H0/0/0/18': [1095, 50],
      'H0/0/0/19': [1095, 115],

      'H0/0/0/20': [1195, 50],
      'H0/0/0/21': [1195, 115],

      'H0/0/0/22': [1275, 50],
      'H0/0/0/23': [1275, 115],

      'H0/0/0/24': [1380, 50],
      'H0/0/0/25': [1380, 115],

      'H0/0/0/26': [1460, 50],
      'H0/0/0/27': [1460, 115],

      'H0/0/0/28': [1560, 50],
      'H0/0/0/29': [1560, 115],

      'H0/0/0/30': [1645, 50],
      'H0/0/0/31': [1645, 115],

      'H0/0/0/32': [1745, 50],
      'H0/0/0/33': [1745, 115],

      'H0/0/0/34': [1830, 50],
      'H0/0/0/35': [1830, 115],
    };

    for (const prop in positionMap) {
      if (prop.startsWith('H0')) {
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
