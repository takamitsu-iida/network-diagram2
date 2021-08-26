/* global iida */

(function () {
  iida.models.asr9903 = (function () {

    var MODEL = 'ASR9903';
    var THUMBNAIL_PATH = 'static/site/img/sASR9903.png';
    var IMG_PATH = 'static/site/img/ASR9903.png';
    var IMG_WIDTH = 1920;
    var IMG_HEIGHT = 530;
    var PORT_WIDTH = 52;
    var PORT_HEIGHT = 30;

    // (x, y) by paint application
    var positionMap = {
      // interface HundredGigE0/0/0/0
      'H0/0/0/0': [254, 452],

      'H0/0/0/1': [354, 452],

      'H0/0/0/2': [454, 386],
      'H0/0/0/3': [454, 452],

      'H0/0/0/4': [556, 452],

      'H0/0/0/5': [658, 452],

      'H0/0/0/6': [758, 386],
      'H0/0/0/7': [758, 452],

      'H0/0/0/8': [860, 452],

      'H0/0/0/9': [960, 452],

      'H0/0/0/10': [1062, 386],
      'H0/0/0/11': [1062, 452],

      'H0/0/0/12': [1164, 452],

      'H0/0/0/13': [1264, 452],

      'H0/0/0/14': [1364, 386],
      'H0/0/0/15': [1364, 452],

      'H0/0/0/16': [1466, 452],

      'H0/0/0/17': [1568, 452],

      'H0/0/0/18': [1668, 386],
      'H0/0/0/19': [1668, 452],

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
