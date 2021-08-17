/* global iida */

(function () {
  iida.models.asr9903 = (function () {

    var MODEL = 'ASR9903';
    var THUMBNAIL_PATH = 'static/site/img/sASR9903.png';
    var IMG_PATH = 'static/site/img/ASR9903.png';
    var IMG_WIDTH = 960;
    var IMG_HEIGHT = 298;
    var PORT_WIDTH = 56;
    var PORT_HEIGHT = 30;

    // (x, y) by paint application
    var positionMap = {
      // interface HundredGigE0/0/0/0
      'H0/0/0/0': [93, 250],

      'H0/0/0/1': [148, 250],

      'H0/0/0/2': [204, 214],
      'H0/0/0/3': [204, 250],

      'H0/0/0/4': [259, 250],

      'H0/0/0/5': [314, 250],

      'H0/0/0/6': [370, 214],
      'H0/0/0/7': [370, 250],

      'H0/0/0/8': [425, 250],

      'H0/0/0/9': [480, 250],

      'H0/0/0/10': [536, 214],
      'H0/0/0/11': [536, 250],

      'H0/0/0/12': [590, 250],

      'H0/0/0/13': [647, 250],

      'H0/0/0/14': [703, 214],
      'H0/0/0/15': [703, 250],

      'H0/0/0/16': [756, 250],

      'H0/0/0/17': [813, 250],

      'H0/0/0/18': [869, 214],
      'H0/0/0/19': [869, 250],

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
