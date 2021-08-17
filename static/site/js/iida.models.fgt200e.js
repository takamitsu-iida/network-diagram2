/* global iida */

(function () {
  iida.models.fgt200e = (function () {

    var MODEL = 'FGT200E';
    var THUMBNAIL_PATH = 'static/site/img/sFGT200E.png';
    var IMG_PATH = 'static/site/img/FGT200E.png';
    var IMG_WIDTH = 1920;
    var IMG_HEIGHT = 186;
    var PORT_WIDTH = 52;
    var PORT_HEIGHT = 38;

    // (x, y) by paint application
    var positionMap = {

      // WAN1 WAN2
      'WAN1': [918, 64],
      'WAN2': [918, 123],

      'LAN1': [981, 64],
      'LAN2': [981, 123],

      'LAN3': [1043, 64],
      'LAN4': [1043, 123],

      'LAN5': [1105, 64],
      'LAN6': [1105, 123],

      'LAN7': [1168, 64],
      'LAN8': [1168, 123],

      'LAN9': [1230, 64],
      'LAN10': [1230, 123],

      'LAN11': [1330, 64],
      'LAN12': [1330, 123],

      'LAN13': [1392, 64],
      'LAN14': [1392, 123],

      'LAN15': [1600, 64],
      'LAN16': [1600, 123],

      'LAN17': [1664, 64],
      'LAN18': [1664, 123],

    };

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
