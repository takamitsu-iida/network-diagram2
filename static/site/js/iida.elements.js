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
    var _nodeType = 'router'; // "router" or "port" or "rootPort"
    var _width = DEFAULT_ROUTER_WIDTH;
    var _height = DEFAULT_ROUTER_HEIGHT;
    var _dragWith = [];
    var _redundant = 1;
    var _grabbable = true; // only router is grabbable
    var _ports = [];

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

    exports.offset = function (router_width, router_height, port_width, port_height) {
      var rw = router_width / 2;
      var rh = router_height / 2;
      var pw = port_width / 2;
      var ph = port_height / 2;

      switch (_align[0]) {
        case 'L': // Left
          _offsetX = -1 * (rw - pw);
          break;
        case 'C': // Center
          _offsetX = 0;
          break;
        case 'R': // Right
          _offsetX = rw - pw;
          break;
      }

      switch (_align[1]) {
        case 'T': // Top
          _offsetY = -1 * (rh - ph);
          break;
        case 'T2': // 2nd Top
          _offsetY = -1 * (rh - ph) + port_height;
          break;
        case 'C': // Center
          _offsetY = 0;
          break;
        case 'B': // Bottom
          _offsetY = rh - ph;
          break;
      }

      return this;
    };

    exports.fit = function (router_position) {
      _position = { x: router_position.x + _offsetX, y: router_position.y + _offsetY };
      return this;
    };

    return exports;
  };

  var createEdge = function () {
    var _id;
    var _edgeType = 'PortToPort'; // "PortToPort" or "RouterToPort"
    var _classes = ['PortToPort']; // default is same as edgeType
    var _label = '';
    var _popper = '';
    var _source;
    var _sourceRouter;
    var _sourcePort;
    var _target;
    var _targetRouter;
    var _targetPort;
    var _weight = 1;

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
      var label = router.label || '';
      var popper = router.popper || '';
      var router_width = router.width || DEFAULT_ROUTER_WIDTH;
      var router_height = router.height || DEFAULT_ROUTER_HEIGHT;
      var classes = router.classes || [];
      var dragWith = router.dragWith || [];
      var redundant = router.redundant || 1;
      var ports = router.ports || [];

      var n = createNode()
        .id(routerId)
        .nodeType('router')
        .grid(grid)
        .label(label)
        .popper(popper)
        .ports(ports)
        .width(router_width)
        .height(router_height)
        .classes(classes)
        .dragWith(dragWith)
        .redundant(redundant);

      eles.nodes.push(n.toObject());

      // create hidden rootPort node
      var rootPortId = '_' + routerId; // IMPORTANT: rootPortId is defined as "_" + routerId
      var n = createNode()
        .id(rootPortId)
        .nodeType('rootPort') // rootPort is hidden port which designate the node
        .routerId(routerId)
        .align(['C', 'C'])
        .width(10)
        .height(10)
        .offset(router_width, router_height, 10, 10);
      eles.nodes.push(n.toObject());

      // create port node
      ports.forEach((port) => {
        var pid = port.id;
        var portId = routerId + pid;
        var label = port.label || pid;
        var align = port.align || ['C', 'C'];
        var port_width = port.width || DEFAULT_PORT_WIDTH;
        var port_height = port.height || DEFAULT_PORT_HEIGHT;
        var classes = port.classes || [];

        var n = createNode()
          .id(portId)
          .nodeType('port')
          .routerId(routerId)
          .align(align)
          .label(label)
          .width(port_width)
          .height(port_height)
          .classes(classes)
          .offset(router_width, router_height, port_width, port_height);

        eles.nodes.push(n.toObject());

        // create internal hidden edge from rootPort to this port
        var edge_id = rootPortId + portId; // is equal to _routerId routerId pid
        var e = createEdge()
          .edgeType('RouterToPort') // RouterToPort type is special hidden edge
          .id(edge_id)
          .source(rootPortId)
          .target(portId)
          .weight(0);
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

      var edge_id = source + target;
      var label = edge.label || '';
      var popper = edge.popper || '';
      var weight = edge.weight || 1;
      var classes = edge.classes || [];

      var e = createEdge()
        .edgeType('PortToPort') // PortToPort is the default edge type
        .id(edge_id)
        .source(source)
        .sourceRouter(sourceRouter)
        .sourcePort(sourcePort)
        .target(target)
        .targetRouter(targetRouter)
        .targetPort(targetPort)
        .label(label)
        .popper(popper)
        .classes(classes)
        .weight(weight);

      eles.edges.push(e.toObject());
    });

    return eles;
  };

  //
  // create topology model from iida.appdata.elements
  //
  var createTopologyElements = function (elements) {
    var eles = {
      nodes: [],
      edges: [],
    };

    // copy router nodes
    elements.nodes.forEach((node) => {
      if (node.classes.includes('router')) {
        var new_node = JSON.parse(JSON.stringify(node)); // deep copy
        eles.nodes.push(new_node);
      }
    });

    elements.edges.forEach((edge) => {
      var sourceRouter = edge.data.sourceRouter;
      var targetRouter = edge.data.targetRouter;
      if (sourceRouter === targetRouter) {
        return;
      }
      var new_edge = JSON.parse(JSON.stringify(edge)); // deep copy

      // fix the source and target to router node
      new_edge.data.source = sourceRouter;
      new_edge.data.target = targetRouter;
      eles.edges.push(new_edge);
    });

    return eles;
  };

  var elements = createElements(iida.appdata.routers, iida.appdata.edges);
  iida.appdata.elements = elements;
  iida.appdata.topologyElements = createTopologyElements(elements);

  var routerIds = [];
  iida.appdata.topologyElements.nodes.forEach((node) => {
    routerIds.push(node.data.id);
  });
  iida.appdata.routerIds = routerIds;
})();
