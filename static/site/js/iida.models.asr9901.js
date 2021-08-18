/* global iida */

(function () {
  iida.models.asr9901 = (function () {

    var MODEL = 'ASR9901';
    var THUMBNAIL_PATH = 'static/site/img/sASR9901.jpg';
    var IMG_PATH = 'static/site/img/ASR9901.jpg';
    var IMG_WIDTH = 1920;
    var IMG_HEIGHT = 364;
    var PORT_WIDTH = 56;
    var PORT_HEIGHT = 30;

    // (x, y) by paint application
    var positionMap = {
      // interface GigabitEthernet0/0/0/1
      'G0/0/0/0': [155, 68],
      'G0/0/0/1': [155, 137],

      'G0/0/0/2': [217, 68],
      'G0/0/0/3': [217, 137],

      'G0/0/0/4': [280, 68],
      'G0/0/0/5': [280, 137],

      'G0/0/0/6': [343, 68],
      'G0/0/0/7': [343, 137],

      // interface TenGigE0/0/0/22
      'T0/0/0/8': [511, 68],
      'T0/0/0/9': [511, 137],

      'T0/0/0/10': [574, 68],
      'T0/0/0/11': [574, 137],

      'T0/0/0/12': [637, 68],
      'T0/0/0/13': [637, 137],

      'T0/0/0/14': [700, 68],
      'T0/0/0/15': [700, 137],

      'T0/0/0/16': [764, 68],
      'T0/0/0/17': [764, 137],

      'T0/0/0/18': [827, 68],
      'T0/0/0/19': [827, 137],

      // interface HundredGigE0/0/0/20
      'H0/0/0/20': [960, 68],
      'H0/0/0/21': [960, 137],

      // interface TenGigE0/0/0/22
      'T0/0/0/22': [1096, 68],
      'T0/0/0/23': [1096, 137],

      'T0/0/0/24': [1160, 68],
      'T0/0/0/25': [1160, 137],

      'T0/0/0/26': [1222, 68],
      'T0/0/0/27': [1222, 137],

      'T0/0/0/28': [1286, 68],
      'T0/0/0/29': [1286, 137],

      'T0/0/0/30': [1349, 68],
      'T0/0/0/31': [1349, 137],

      'T0/0/0/32': [1414, 68],
      'T0/0/0/33': [1414, 137],

      // interface GigabitEthernet0/0/0/34
      'G0/0/0/34': [1580, 68],
      'G0/0/0/35': [1580, 137],

      'G0/0/0/36': [1643, 68],
      'G0/0/0/37': [1643, 137],

      'G0/0/0/38': [1706, 68],
      'G0/0/0/39': [1706, 137],

      'G0/0/0/40': [1770, 68],
      'G0/0/0/41': [1770, 137],
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
