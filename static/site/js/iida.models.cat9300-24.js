/* global iida */

(function () {
  iida.models.cat9300_24 = (function () {

    var MODEL = 'CAT9300-24';
    var THUMBNAIL_PATH = 'static/site/img/sCAT9300-24.jpg';
    var IMG_PATH = 'static/site/img/CAT9300-24.jpg';
    var IMG_WIDTH = 1920;
    var IMG_HEIGHT = 177;
    var PORT_WIDTH = 50;
    var PORT_HEIGHT = 30;

    // (x, y) by paint application
    var positionMap = {

      // interface GigabitEthernet1/0/1
      'G1/0/1': [842, 64],
      'G1/0/2': [842, 120],

      'G1/0/3': [903, 64],
      'G1/0/4': [903, 120],

      'G1/0/5': [963, 64],
      'G1/0/6': [963, 120],

      'G1/0/7': [1024, 64],
      'G1/0/8': [1024, 120],

      'G1/0/9': [1085, 64],
      'G1/0/10': [1085, 120],

      'G1/0/11': [1145, 64],
      'G1/0/12': [1145, 120],

      'G1/0/13': [1231, 64],
      'G1/0/14': [1231, 120],

      'G1/0/15': [1292, 64],
      'G1/0/16': [1292, 120],

      'G1/0/17': [1353, 64],
      'G1/0/18': [1353, 120],

      'G1/0/19': [1412, 64],
      'G1/0/20': [1412, 120],

      'G1/0/21': [1473, 64],
      'G1/0/22': [1473, 120],

      'G1/0/23': [1534, 64],
      'G1/0/24': [1534, 120],

    };

    for (const prop in positionMap) {
      if (prop.startsWith('G1')) {
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
