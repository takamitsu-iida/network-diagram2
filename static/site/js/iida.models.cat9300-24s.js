/* global iida */

(function () {
  iida.models.cat9300_24 = (function () {

    var MODEL = 'CAT9300-24S';
    var THUMBNAIL_PATH = 'static/site/img/sCAT9300-24S.jpg';
    var IMG_PATH = 'static/site/img/CAT9300-24S.jpg';
    var IMG_WIDTH = 1920;
    var IMG_HEIGHT = 174;
    var PORT_WIDTH = 50;
    var PORT_HEIGHT = 30;

    // (x, y) by paint application
    var positionMap = {

      // interface GigabitEthernet1/0/1
      'G1/0/1': [857, 64],
      'G1/0/2': [857, 128],

      'G1/0/3': [912, 64],
      'G1/0/4': [912, 128],

      'G1/0/5': [968, 64],
      'G1/0/6': [968, 128],

      'G1/0/7': [1024, 64],
      'G1/0/8': [1024, 128],

      'G1/0/9': [1080, 64],
      'G1/0/10': [1080, 128],

      'G1/0/11': [1134, 64],
      'G1/0/12': [1134, 128],

      'G1/0/13': [1204, 64],
      'G1/0/14': [1204, 128],

      'G1/0/15': [1262, 64],
      'G1/0/16': [1262, 128],

      'G1/0/17': [1316, 64],
      'G1/0/18': [1316, 128],

      'G1/0/19': [1372, 64],
      'G1/0/20': [1372, 128],

      'G1/0/21': [1428, 64],
      'G1/0/22': [1428, 128],

      'G1/0/23': [1484, 64],
      'G1/0/24': [1484, 128],

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
