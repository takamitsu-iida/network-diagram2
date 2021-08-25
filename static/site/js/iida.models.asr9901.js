/* global iida */

(function () {
  iida.models.asr9901 = (function () {

    var MODEL = 'ASR9901';
    var THUMBNAIL_PATH = 'static/site/img/sASR9901.png';
    var IMG_PATH = 'static/site/img/ASR9901.png';
    var IMG_WIDTH = 1920;
    var IMG_HEIGHT = 350;
    var PORT_WIDTH = 52;
    var PORT_HEIGHT = 30;

    // (x, y) by paint application
    var positionMap = {
      // interface GigabitEthernet0/0/0/1
      'G0/0/0/0': [232, 74],
      'G0/0/0/1': [232, 136],

      'G0/0/0/2': [290, 74],
      'G0/0/0/3': [290, 136],

      'G0/0/0/4': [346, 74],
      'G0/0/0/5': [346, 136],

      'G0/0/0/6': [403, 74],
      'G0/0/0/7': [403, 136],

      // interface TenGigE0/0/0/22
      'T0/0/0/8': [554, 74],
      'T0/0/0/9': [554, 136],

      'T0/0/0/10': [612, 74],
      'T0/0/0/11': [612, 136],

      'T0/0/0/12': [666, 74],
      'T0/0/0/13': [666, 136],

      'T0/0/0/14': [724, 74],
      'T0/0/0/15': [724, 136],

      'T0/0/0/16': [780, 74],
      'T0/0/0/17': [780, 136],

      'T0/0/0/18': [836, 74],
      'T0/0/0/19': [836, 136],

      // interface HundredGigE0/0/0/20
      'H0/0/0/20': [958, 74],
      'H0/0/0/21': [958, 136],

      // interface TenGigE0/0/0/22
      'T0/0/0/22': [1080, 74],
      'T0/0/0/23': [1080, 136],

      'T0/0/0/24': [1136, 74],
      'T0/0/0/25': [1136, 136],

      'T0/0/0/26': [1194, 74],
      'T0/0/0/27': [1194, 136],

      'T0/0/0/28': [1252, 74],
      'T0/0/0/29': [1252, 136],

      'T0/0/0/30': [1308, 74],
      'T0/0/0/31': [1308, 136],

      'T0/0/0/32': [1364, 74],
      'T0/0/0/33': [1364, 136],

      // interface GigabitEthernet0/0/0/34
      'G0/0/0/34': [1516, 74],
      'G0/0/0/35': [1516, 136],

      'G0/0/0/36': [1572, 74],
      'G0/0/0/37': [1572, 136],

      'G0/0/0/38': [1630, 74],
      'G0/0/0/39': [1630, 136],

      'G0/0/0/40': [1686, 74],
      'G0/0/0/41': [1686, 136],
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
