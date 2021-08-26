/* global iida */

(function () {
  iida.models.asr1001hx = (function () {

    var MODEL = 'ASR1001-HX';
    var THUMBNAIL_PATH = 'static/site/img/sASR1001-HX.png';
    var IMG_PATH = 'static/site/img/ASR1001-HX.png';
    var IMG_WIDTH = 1920;
    var IMG_HEIGHT = 170;
    var PORT_WIDTH = 52;
    var PORT_HEIGHT = 32;

    // (x, y) by paint application
    var positionMap = {

      // interface GigabitEthernet0/1/0
      'G0/1/0': [1112, 60],
      'G0/1/1': [1112, 120],

      'G0/1/2': [1170, 60],
      'G0/1/3': [1170, 120],

      'G0/1/4': [1226, 60],
      'G0/1/5': [1226, 120],

      'G0/1/6': [1284, 60],
      'G0/1/7': [1284, 120],

      // interface TenGigE0/0/0/22
      'T0/1/0': [1518, 60],
      'T0/1/1': [1518, 120],

      'T0/1/2': [1576, 60],
      'T0/1/3': [1576, 120],

      'T0/1/4': [1632, 60],
      'T0/1/5': [1632, 120],

      'T0/1/6': [1690, 60],
      'T0/1/7': [1690, 120],

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
