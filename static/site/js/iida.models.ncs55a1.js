/* global iida */

(function () {
  iida.models.ncs55a1 = (function () {

    var MODEL = 'NCS55A1-36H';
    var THUMBNAIL_PATH = 'static/site/img/sNCS55A1-36H.png';
    var IMG_PATH = 'static/site/img/NCS55A1-36H.png';
    var IMG_WIDTH = 1920;
    var IMG_HEIGHT = 174;
    var PORT_WIDTH = 72;
    var PORT_HEIGHT = 34;

    // (x, y) by paint application
    var positionMap = {
      // interface HundredGigE0/0/0/1
      'H0/0/0/0': [332, 52],
      'H0/0/0/1': [332, 120],

      'H0/0/0/2': [408, 52],
      'H0/0/0/3': [408, 120],

      'H0/0/0/4': [498, 52],
      'H0/0/0/5': [498, 120],

      'H0/0/0/6': [576, 52],
      'H0/0/0/7': [576, 120],

      'H0/0/0/8': [664, 52],
      'H0/0/0/9': [664, 120],

      'H0/0/0/10': [742, 52],
      'H0/0/0/11': [742, 120],

      'H0/0/0/12': [830, 52],
      'H0/0/0/13': [830, 120],

      'H0/0/0/14': [908, 52],
      'H0/0/0/15': [908, 120],

      'H0/0/0/16': [998, 52],
      'H0/0/0/17': [998, 120],

      'H0/0/0/18': [1075, 52],
      'H0/0/0/19': [1075, 120],

      'H0/0/0/20': [1164, 52],
      'H0/0/0/21': [1164, 120],

      'H0/0/0/22': [1242, 52],
      'H0/0/0/23': [1242, 120],

      'H0/0/0/24': [1330, 52],
      'H0/0/0/25': [1330, 120],

      'H0/0/0/26': [1406, 52],
      'H0/0/0/27': [1406, 120],

      'H0/0/0/28': [1496, 52],
      'H0/0/0/29': [1496, 120],

      'H0/0/0/30': [1574, 52],
      'H0/0/0/31': [1574, 120],

      'H0/0/0/32': [1664, 52],
      'H0/0/0/33': [1664, 120],

      'H0/0/0/34': [1742, 52],
      'H0/0/0/35': [1742, 120],
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
