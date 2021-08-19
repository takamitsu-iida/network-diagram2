/* global iida */

(function () {
  DEFAULT_ROUTER_WIDTH = iida.appdata.DEFAULT_ROUTER_WIDTH; // 200
  DEFAULT_ROUTER_HEIGHT = iida.appdata.DEFAULT_ROUTER_HEIGHT; // 120
  DEFAULT_PORT_WIDTH = iida.appdata.DEFAULT_PORT_WIDTH; // 60
  DEFAULT_PORT_HEIGHT = iida.appdata.DEFAULT_PORT_HEIGHT; // 20

  var createNode = function () {
    // for router node
    var _id;
    var _label = '';
    var _popper = '';
    var _grid = { row: 1, col: 1 };
    var _classes = [];
    var _nodeType = 'router'; // "router" or "port"
    var _width = DEFAULT_ROUTER_WIDTH;
    var _height = DEFAULT_ROUTER_HEIGHT;
    var _dragWith = [];
    var _redundant = 1;
    var _model = '';
    var _grabbable = true; // only router is grabbable
    var _ports = [];
    var _data = {};

    // for port node
    var _routerId = undefined;
    var _align = ['C', 'C']; // Center, Center
    var _offsetX = 0; // Center of the router
    var _offsetY = 0; // Center of the router

    function exports() {
      return this;
    }

    exports.toObject = function () {
      var data = {};

      // for router and port common parameters
      data['id'] = _id;
      data['nodeType'] = _nodeType;
      data['label'] = _label;
      data['popper'] = _popper;
      data['width'] = _width;
      data['height'] = _height;
      data['dragWith'] = _dragWith;
      data['redundant'] = _redundant;
      data['model'] = _model;
      data['grid'] = _grid;
      data['ports'] = _ports;

      // for port only parameters
      if (_routerId) {
        data['routerId'] = _routerId;
        data['align'] = _align;
        data['offsetX'] = _offsetX;
        data['offsetY'] = _offsetY;
        _grabbable = false;
      }

      // if exists
      if (Object.keys(_data).length) {
        // merge _data
        data = Object.assign(data, _data);
      }

      return {
        data: data,
        classes: _classes,
        grabbable: _grabbable,
      };

    };

    exports.id = function (_) {
      if (!arguments.length) {
        return _id;
      }
      if (_) {
        _id = _;
      }
      return this;
    };

    exports.nodeType = function (_) {
      if (!arguments.length) {
        return _nodeType;
      }
      if (_) {
        _nodeType = _;
        _classes = [_nodeType];
      }
      return this;
    };

    exports.label = function (_) {
      if (!arguments.length) {
        return _label;
      }
      if (_) {
        _label = _;
      }
      return this;
    };

    exports.popper = function (_) {
      if (!arguments.length) {
        return _popper;
      }
      if (_) {
        _popper = _;
      }
      return this;
    };

    exports.grid = function (_) {
      if (!arguments.length) {
        return _grid;
      }
      if (_) {
        _grid = _;
      }
      return this;
    };

    exports.ports = function (_) {
      if (!arguments.length) {
        return _ports;
      }
      if (_) {
        _ports = _;
      }
      return this;
    };

    exports.width = function (_) {
      if (!arguments.length) {
        return _width;
      }
      if (_) {
        _width = _;
      }
      return this;
    };

    exports.height = function (_) {
      if (!arguments.length) {
        return _height;
      }
      if (_) {
        _height = _;
      }
      return this;
    };

    exports.classes = function (_) {
      if (!arguments.length) {
        return _classes;
      }
      if (_) {
        if (typeof _ === 'string') {
          _ = _.split(',');
        }
        Array.prototype.push.apply(_classes, _);
        _classes = _classes.filter((elem, index, self) => self.indexOf(elem) === index);
      }
      return this;
    };

    exports.dragWith = function (_) {
      if (!arguments.length) {
        return _dragWith;
      }
      if (_) {
        if (typeof _ === 'string') {
          _dragWith = [_];
        } else {
          _dragWith = _;
        }
      }
      return this;
    };

    exports.redundant = function (_) {
      if (!arguments.length) {
        return _redundant;
      }
      if (_) {
        _redundant = _;
      }
      return this;
    };

    exports.model = function (_) {
      if (!arguments.length) {
        return _model;
      }
      if (_) {
        _model = _;
      }
      return this;
    };

    exports.data = function (_) {
      if (!arguments.length) {
        return _data;
      }
      if (_ && Object.keys(_).length) {
        _data = Object.assign(_data, _);
      }
      return this;
    };

    // for port node
    exports.routerId = function (_) {
      if (!arguments.length) {
        return _routerId;
      }
      if (_) {
        _routerId = _;
      }
      return this;
    };

    // for port node
    exports.align = function (_) {
      if (!arguments.length) {
        return _align;
      }
      if (_) {
        _align = _;
      }
      return this;
    };

    exports.offset = function (routerWidth, routerHeight, portWidth, portHeight) {
      // TODO: routerHeight should be adjusted automatically

      switch (_align[0]) {
        case 'L': // Left
          _offsetX = -1 * (routerWidth / 2 - portWidth / 2);
          break;
        case 'LO': // Left Outside
          _offsetX = -1 * (routerWidth / 2 + portWidth / 2);
          break;
        case 'C': // Center
          _offsetX = 0;
          break;
        case 'R': // Right
          _offsetX = routerWidth / 2 - portWidth / 2;
          break;
        case 'RO': // Right Outside
          _offsetX = routerWidth / 2 + portWidth / 2;
          break;
      }

      switch (_align[1]) {
        case 'T': // Top
          _offsetY = (-1 * routerHeight) / 2 + portHeight / 2;
          break;
        case 'T1': // 1st Top
          _offsetY = (-1 * routerHeight) / 2 + portHeight / 2;
          break;
        case 'T2': // 2nd Top
          _offsetY = (-1 * routerHeight) / 2 + portHeight / 2 + portHeight * 1;
          break;
        case 'T3': // 3rd Top
          _offsetY = (-1 * routerHeight) / 2 + portHeight / 2 + portHeight * 2;
          break;
        case 'T4':
          _offsetY = (-1 * routerHeight) / 2 + portHeight / 2 + portHeight * 3;
          break;
        case 'T5':
          _offsetY = (-1 * routerHeight) / 2 + portHeight / 2 + portHeight * 4;
          break;
        case 'T6':
          _offsetY = (-1 * routerHeight) / 2 + portHeight / 2 + portHeight * 5;
          break;
        case 'T7':
          _offsetY = (-1 * routerHeight) / 2 + portHeight / 2 + portHeight * 6;
          break;
        case 'T8':
          _offsetY = (-1 * routerHeight) / 2 + portHeight / 2 + portHeight * 7;
          break;
        case 'T9':
          _offsetY = (-1 * routerHeight) / 2 + portHeight / 2 + portHeight * 8;
          break;
        case 'T10':
          _offsetY = (-1 * routerHeight) / 2 + portHeight / 2 + portHeight * 9;
          break;
        case 'T11':
          _offsetY = (-1 * routerHeight) / 2 + portHeight / 2 + portHeight * 10;
          break;
        case 'T12':
          _offsetY = (-1 * routerHeight) / 2 + portHeight / 2 + portHeight * 11;
          break;
        case 'C': // Center
          _offsetY = 0;
          break;
        case 'B': // Bottom
          _offsetY = routerHeight / 2 - portHeight / 2;
          break;
        case 'B1': // 1st from Bottom
          _offsetY = routerHeight / 2 - portHeight / 2;
          break;
        case 'B2': // 2nd from Bottom
          _offsetY = routerHeight / 2 - portHeight / 2 - portHeight * 1;
          break;
        case 'B3': // 3rd from Bottom
          _offsetY = routerHeight / 2 - portHeight / 2 - portHeight * 2;
          break;
        case 'B4': // 3rd from Bottom
          _offsetY = routerHeight / 2 - portHeight / 2 - portHeight * 3;
          break;
        case 'B5': // 3rd from Bottom
          _offsetY = routerHeight / 2 - portHeight / 2 - portHeight * 4;
          break;
        case 'B6': // 3rd from Bottom
          _offsetY = routerHeight / 2 - portHeight / 2 - portHeight * 5;
          break;
        case 'B7': // 3rd from Bottom
          _offsetY = routerHeight / 2 - portHeight / 2 - portHeight * 6;
          break;
        case 'B8': // 3rd from Bottom
          _offsetY = routerHeight / 2 - portHeight / 2 - portHeight * 7;
          break;
        case 'B9': // 3rd from Bottom
          _offsetY = routerHeight / 2 - portHeight / 2 - portHeight * 8;
          break;
        case 'B10': // 3rd from Bottom
          _offsetY = routerHeight / 2 - portHeight / 2 - portHeight * 9;
          break;
        case 'B11': // 3rd from Bottom
          _offsetY = routerHeight / 2 - portHeight / 2 - portHeight * 10;
          break;
        case 'B12': // 3rd from Bottom
          _offsetY = routerHeight / 2 - portHeight / 2 - portHeight * 11;
          break;
      }

      return this;
    };

    exports.fit = function (routerPosition) {
      _position = { x: routerPosition.x + _offsetX, y: routerPosition.y + _offsetY };
      return this;
    };

    return exports;
  };

  var createEdge = function () {
    var _id;
    var _edgeType = 'portToPort'; // "portToPort" or "routerToPort"
    var _classes = ['portToPort']; // default is same as edgeType
    var _label = '';
    var _popper = '';
    var _source;
    var _sourceRouter;
    var _sourcePort;
    var _target;
    var _targetRouter;
    var _targetPort;
    var _weight = 1;
    var _data = {};

    // need for class 'taxiL' or 'taxiR'
    var _taxiTurn;

    // need for class 'segments'
    var _segmentDistances;

    function exports() {
      return this;
    }

    exports.toObject = function () {
      var data = {
        id: _id,
        edgeType: _edgeType,
        source: _source,
        sourceRouter: _sourceRouter,
        sourcePort: _sourcePort,
        target: _target,
        targetRouter: _targetRouter,
        targetPort: _targetPort,
        label: _label,
        popper: _popper,
        weight: _weight,
      };

      // if exists
      if (_taxiTurn) {
        data['taxiTurn'] = _taxiTurn;
      }
      if (_segmentDistances) {
        data['segmentDistances'] = _segmentDistances;
      }
      if (Object.keys(_data).length) {
        // merge _data
        data = Object.assign(data, _data);
      }

      return {
        data: data,
        classes: _classes,
      };
    };

    exports.id = function (_) {
      if (!arguments.length) {
        return _id;
      }
      if (_) {
        _id = _;
      }
      return this;
    };

    exports.edgeType = function (_) {
      if (!arguments.length) {
        return _edgeType;
      }
      if (_) {
        _edgeType = _;
        _classes = [_edgeType];
      }
      return this;
    };

    exports.source = function (_) {
      if (!arguments.length) {
        return _source;
      }
      if (_) {
        _source = _;
      }
      return this;
    };

    exports.sourceRouter = function (_) {
      if (!arguments.length) {
        return _sourceRouter;
      }
      if (_) {
        _sourceRouter = _;
      }
      return this;
    };

    exports.sourcePort = function (_) {
      if (!arguments.length) {
        return _sourcePort;
      }
      if (_) {
        _sourcePort = _;
      }
      return this;
    };

    exports.target = function (_) {
      if (!arguments.length) {
        return _target;
      }
      if (_) {
        _target = _;
      }
      return this;
    };

    exports.targetRouter = function (_) {
      if (!arguments.length) {
        return _targetRouter;
      }
      if (_) {
        _targetRouter = _;
      }
      return this;
    };

    exports.targetPort = function (_) {
      if (!arguments.length) {
        return _targetPort;
      }
      if (_) {
        _targetPort = _;
      }
      return this;
    };

    exports.label = function (_) {
      if (!arguments.length) {
        return _label;
      }
      if (_) {
        _label = _;
      }
      return this;
    };

    exports.popper = function (_) {
      if (!arguments.length) {
        return _popper;
      }
      if (_) {
        _popper = _;
      }
      return this;
    };

    exports.weight = function (_) {
      if (!arguments.length) {
        return _weight;
      }
      if (_) {
        _weight = _;
      }
      return this;
    };

    exports.taxiTurn = function (_) {
      if (!arguments.length) {
        return _taxiTurn;
      }
      if (_) {
        _taxiTurn = _;
      }
      return this;
    };

    exports.segmentDistances = function (_) {
      if (!arguments.length) {
        return _segmentDistances;
      }
      if (_) {
        _segmentDistances = _;
      }
      return this;
    };

    exports.classes = function (_) {
      if (!arguments.length) {
        return _classes;
      }
      if (_) {
        if (typeof _ === 'string') {
          _ = _.split(',');
        }
        Array.prototype.push.apply(_classes, _);
        _classes = _classes.filter((elem, index, self) => self.indexOf(elem) === index);
      }
      return this;
    };

    exports.data = function (_) {
      if (!arguments.length) {
        return _data;
      }
      if (_ && Object.keys(_).length) {
        _data = Object.assign(_data, _);
      }
      return this;
    };

    return exports;
  };

  //
  // create cytoscape.js elements from iida.appdata.routers and iida.appdata.edges
  //
  var createElements = function (routers, edges) {
    var eles = {
      nodes: [],
      edges: [],
    };

    // create router and port node
    routers.forEach((router) => {
      var grid = router.grid || {};
      var routerId = router.id;
      var routerLabel = router.label || '';
      var popper = router.popper || '';
      var routerWidth = router.width || DEFAULT_ROUTER_WIDTH;
      var routerHeight = router.height || DEFAULT_ROUTER_HEIGHT;
      var routerClasses = router.classes || [];
      var dragWith = router.dragWith || [];
      var redundant = router.redundant || 1;
      var model = router.model || '';
      var ports = router.ports || [];
      var routerData = router.data;

      var n = createNode()
        .id(routerId)
        .nodeType('router')
        .grid(grid)
        .label(routerLabel)
        .popper(popper)
        .ports(ports)
        .width(routerWidth)
        .height(routerHeight)
        .classes(routerClasses)
        .dragWith(dragWith)
        .redundant(redundant)
        .model(model)
        .data(routerData);

      eles.nodes.push(n.toObject());

      // create port node
      ports.forEach((port) => {
        var pid = port.id;
        var portId = routerId + pid;
        var portLabel = port.label || pid;
        var align = port.align || ['C', 'C'];
        var portWidth = port.width || DEFAULT_PORT_WIDTH;
        var portHeight = port.height || DEFAULT_PORT_HEIGHT;
        var portClasses = port.classes || [];
        var portData = port.data;

        var n = createNode()
          .id(portId)
          .nodeType('port')
          .routerId(routerId)
          .align(align)
          .label(portLabel)
          .width(portWidth)
          .height(portHeight)
          .classes(portClasses)
          .redundant(redundant)
          .data(portData)
          .offset(routerWidth, routerHeight, portWidth, portHeight);
        eles.nodes.push(n.toObject());

        // create internal hidden edge from node to this port
        var edgeId = routerId + portId; // is equal to 'routerId'+'routerId'+'port.id'
        var e = createEdge()
          .edgeType('routerToPort') // routerToPort type is special hidden edge
          .id(edgeId)
          .source(routerId)
          .target(portId)
          .weight(0.0001);  // because 0 is not accepted, use small enough value
        eles.edges.push(e.toObject());
      });
    });

    // create edge
    edges.forEach((edge) => {
      var sourceRouter = edge.sourceRouter;
      if (!sourceRouter) {
        console.log('ERROR: sourceRouter is not defined in edge data');
        return;
      }
      var sourcePort = edge.sourcePort;
      if (!sourcePort) {
        console.log('ERROR: sourcePort is not defined in edge data');
        return;
      }
      var source = sourceRouter + sourcePort;
      if (!eles.nodes.filter(({ data }) => data.id === source)) {
        console.log('ERROR: failed to create edge, source port not found.');
        return;
      }

      var targetRouter = edge.targetRouter;
      if (!targetRouter) {
        console.log('ERROR: targetRouter is not defined in edge data');
        return;
      }
      var targetPort = edge.targetPort;
      if (!targetPort) {
        console.log('ERROR: targetPort is not defined in edge data');
        return;
      }
      var target = targetRouter + targetPort;
      if (!eles.nodes.filter(({ data }) => data.id === target)) {
        console.log('ERROR: failed to create edge, target port not found.');
        return;
      }

      var edgeId = source + target;
      var edgeLabel = edge.label || '';
      var edgePopper = edge.popper || '';
      var weight = edge.weight || 1;
      var edgeClasses = edge.classes || [];
      var taxiTurn = edge.taxiTurn;
      var segmentDistances = edge.segmentDistances;
      var edgeData = edge.data;

      var e = createEdge()
        .edgeType('portToPort') // portToPort is the default edge type
        .id(edgeId)
        .source(source)
        .sourceRouter(sourceRouter)
        .sourcePort(sourcePort)
        .target(target)
        .targetRouter(targetRouter)
        .targetPort(targetPort)
        .label(edgeLabel)
        .popper(edgePopper)
        .classes(edgeClasses)
        .weight(weight)
        .taxiTurn(taxiTurn)
        .data(edgeData)
        .segmentDistances(segmentDistances);

      eles.edges.push(e.toObject());
    });

    return eles;
  };

  iida.appdata.elements = createElements(iida.appdata.routers, iida.appdata.edges);

})();
