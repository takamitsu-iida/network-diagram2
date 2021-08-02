/* global iida */

(function () {

    var DEFAULT_NODE_WIDTH = 200;
    var DEFAULT_NODE_HEIGHT = 120;
    var DEFAULT_PORT_WIDTH = 60;
    var DEFAULT_PORT_HEIGHT = 20;
    var DEFAULT_OUTSIDE_OFFSET = 20;


    var create_node = function (id) {

        // for router node
        var _id = id;
        var _label = id;
        var _position = { x: 0, y: 0 };
        var _classes = [];
        var _width = DEFAULT_NODE_WIDTH;
        var _height = DEFAULT_NODE_HEIGHT;
        var _drag_with = [];
        var _grabbable = true;  // only router is grabbable

        // for port node
        var _router_id = undefined;
        var _align = ['L', 'T'];  // Left, Top
        var _offset_x = 0;
        var _offset_y = 0;

        // for grouping
        var _parent = undefined;

        function exports() {
            return this;
        };

        exports.toObject = function () {
            var data = {};

            // for router and port common parameters
            data['id'] = _id;
            data['label'] = _label;
            data['width'] = _width;
            data['height'] = _height;
            data['drag_with'] = _drag_with;
            data['initial_position'] = Object.assign({}, _position);  // store initial position to revert to preset position

            // for port only parameters
            if (_router_id) {
                data['router_id'] = _router_id;
                data['align'] = _align;
                data['offset_x'] = _offset_x;
                data['offset_y'] = _offset_y;
                if (_parent) {
                    data['parent'] = _parent;
                }
                _grabbable = false;
            }

            if (_classes.includes('parent')) {
                _grabbable = false;
            }

            return {
                'data': data,
                'position': _position,
                'classes': _classes,
                'grabbable': _grabbable
            };
        }

        exports.id = function (_) {
            if (!arguments.length) { return _id; }
            _id = _;
            return this;
        };

        exports.label = function (_) {
            if (!arguments.length) {
                return _label;
            }
            _label = _;
            return this;
        };

        exports.position = function (_) {
            if (!arguments.length) {
                return _position;
            }
            _position = _;
            return this;
        };

        exports.width = function (_) {
            if (!arguments.length) {
                return _width;
            }
            _width = _;
            return this;
        };

        exports.height = function (_) {
            if (!arguments.length) {
                return _height;
            }
            _height = _;
            return this;
        };

        exports.classes = function (_) {
            if (!arguments.length) {
                return _classes;
            }
            if (!_) {
                return this;
            }
            if (typeof (_) === 'string') {
                _ = _.split(",");
            }
            Array.prototype.push.apply(_classes, _);
            _classes = _classes.filter((elem, index, self) => self.indexOf(elem) === index);
            return this;
        };

        exports.drag_with = function (_) {
            if (!arguments.length) {
                return _drag_with;
            }
            if (typeof (_) === "string") {
                _drag_with = [_];
            } else {
                _drag_with = _;
            }
            return this;
        };

        // for port node
        exports.router_id = function (_) {
            if (!arguments.length) { return _router_id; }
            _router_id = _;
            return this;
        };

        // for port node
        exports.align = function (_) {
            if (!arguments.length) {
                return _align;
            }
            _align = _;
            return this;
        };

        // for port node
        exports.parent = function (_) {
            if (!arguments.length) {
                return _parent;
            }
            _parent = _;
            return this;
        };

        exports.fit = function (router_position, router_width, router_height) {
            var nw = router_width / 2;
            var nh = router_height / 2;
            var pw = _width / 2;
            var ph = _height / 2;
            var oo = DEFAULT_OUTSIDE_OFFSET;

            switch (_align[0]) {
                case 'L':  // Left
                    _offset_x = -1 * (nw - pw);
                    break;
                case 'OL':  // Outside Left
                    _offset_x = -1 * (nw + oo);
                    break;
                case 'C':  // Center
                    _offset_x = 0;
                    break;
                case 'R':  // Right
                    _offset_x = nw - pw;
                    break;
                case 'OR':  // Outside Right
                    _offset_x = nw + oo;
                    break;
                case 'ORR':  // Outside Right Right
                    _offset_x = nw + oo + oo;
                    break;
            }

            switch (_align[1]) {
                case 'T':  // Top
                    _offset_y = -1 * (nh - ph);
                    break;
                case 'T2':  // 2nd Top
                    _offset_y = -1 * (nh - ph) + _height;
                    break;
                case 'OT':  // Outside Top
                    _offset_y = -1 * (nh + oo);
                    break;
                case 'C':  // Center
                    _offset_y = 0;
                    break;
                case 'B':  // Bottom
                    _offset_y = nh - ph;
                    break;
                case 'OB':  // Outside Bottom
                    _offset_y = nh + oo;
                    break;
            }
            _position = { x: router_position.x + _offset_x, y: router_position.y + _offset_y }

            return this;
        };

        return exports;
    };


    var create_edge = function (id) {
        var _id = id;
        var _source;
        var _target;
        var _weight = 1;
        var _label = "";
        var _classes = ['autorotate'];

        function exports() {
            return this;
        };

        exports.toObject = function () {
            return {
                'data': {
                    'id': _id,
                    'source': _source,
                    'target': _target,
                    'weight': _weight,
                    'label': _label
                },
                'classes': _classes
            }
        }

        exports.id = function (_) {
            if (!arguments.length) { return _id; }
            _id = _;
            return this;
        };

        exports.source = function (_) {
            if (!arguments.length) {
                return _source;
            }
            _source = _;
            return this;
        };

        exports.target = function (_) {
            if (!arguments.length) {
                return _target;
            }
            _target = _;
            return this;
        };

        exports.label = function (_) {
            if (!arguments.length) {
                return _label;
            }
            _label = _;
            return this;
        };

        exports.weight = function (_) {
            if (!arguments.length) {
                return _weight;
            }
            _weight = _;
            return this;
        };

        exports.classes = function (_) {
            if (!arguments.length) {
                return _classes;
            }
            if (!_) {
                return this;
            }
            if (typeof (_) === 'string') {
                _ = _.split(",");
            }
            Array.prototype.push.apply(_classes, _);
            _classes = _classes.filter((elem, index, self) => self.indexOf(elem) === index);
            return this;
        };

        return exports;
    };

    //
    // create cytoscape.js elements from iida.appdata.physical_routers array
    //
    var create_physical_elements = function () {
        var nodes = [];
        var edges = [];

        // create router and port node
        iida.appdata.physical_routers.forEach(router => {

            var position = router.position || { x: 0, y: 0 };
            var router_id = router.id;
            var label = router.label || '';
            var node_width = router.width || DEFAULT_NODE_WIDTH;
            var node_height = router.height || DEFAULT_NODE_HEIGHT;
            var classes = router.classes || ['router', 'physical_router'];  // if classes is defined then use it. if not, use these classes as default
            var drag_with = router.drag_with || [];

            var r = create_node(router_id)
                .position(position)
                .label(label)
                .width(node_width)
                .height(node_height)
                .classes(classes)
                .drag_with(drag_with);

            nodes.push(r.toObject());

            // create port node
            var ports = router.ports || [];
            ports.forEach(port => {
                var port_id = port.id;
                var label = port.label || port_id;
                var align = port.align || 'TL';
                var port_width = port.width || DEFAULT_PORT_WIDTH;
                var port_height = port.height || DEFAULT_PORT_HEIGHT;
                var classes = port.classes || ['port', 'physical_port'];
                var parent = port.parent || undefined;

                var p = create_node(router_id + port_id)
                    .router_id(router_id)
                    .align(align)
                    .label(label)
                    .width(port_width)
                    .height(port_height)
                    .classes(classes)
                    .parent(parent)
                    .fit(position, node_width, node_height);

                nodes.push(p.toObject());
            });
        });

        // create edge
        iida.appdata.physical_edges.forEach(edge => {
            var source_router = edge.source_router;
            if (!source_router) {
                console.log("ERROR: source_router is not defined in edge data");
                return;
            }
            var source_port = edge.source_port;
            if (!source_port) {
                console.log("ERROR: source_port is not defined in edge data");
                return;
            }
            var target_router = edge.target_router;
            if (!target_router) {
                console.log("ERROR: target_router is not defined in edge data");
                return;
            }
            var target_port = edge.target_port;
            if (!target_port) {
                console.log("ERROR: target_port is not defined in edge data");
                return;
            }
            var source_port_id = source_router + source_port;
            if (!nodes.filter(({ data }) => data.id === source_port_id)) {
                console.log("ERROR: failed to create edge, source port not found.")
                return;
            }
            var target_port_id = target_router + target_port;
            if (!nodes.filter(({ data }) => data.id === target_port_id)) {
                console.log("ERROR: failed to create edge, target port not found.")
                return;
            }
            var edge_id = source_port_id + target_port_id;
            var label = edge.label || "";

            var e = create_edge(edge_id)
                .source(source_port_id)
                .target(target_port_id)
                .label(label);

            edges.push(e.toObject());
        });

        return {
            'nodes': nodes,
            'edges': edges
        };
    };

    iida.appdata.physical_elements = create_physical_elements();

    //
    // create topology model from iida.appdata.physical_elements
    //
    var create_topology_elements = function () {
        var eles = []
        iida.appdata.physical_elements.forEach(element => {
            if (element.source && element.target) {
                // edge
                var source = element.data.source;
                var target = element.data.target;
                var source_router = source.data.router_id;
                var target_router = target.data.router_id;
                if (source_router && target_router && source_router === target_router) {
                    // just ignore self loopback edge
                    return;
                }
                var label = element.data.label || "";
                var edge = create_edge(source + target).source(source).target(target).label(label);
                eles.push(edge.toObject());
            } else {
                // router node
                var position = element.position || { x: 0, y: 0 };
                var router_id = element.id;
                var label = element.label || '';
                var node_width = element.width || DEFAULT_NODE_WIDTH;
                var node_height = element.height || DEFAULT_NODE_HEIGHT;

                // if classes is defined, use it
                // if not defined, use these classes as default
                var classes = element.classes || ['router', 'physical_router'];
                var ports = element.ports || [];
                var drag_with = element.drag_with || [];
                var router_node = create_node(router_id).position(position).label(label).width(node_width).height(node_height).classes(classes).drag_with(drag_with);
                eles.push(router_node.toObject());

                // port node
                ports.forEach(element => {
                    var port_id = element.id;
                    var label = element.label || port_id;
                    var align = element.align || 'TL';
                    var port_width = element.width || DEFAULT_PORT_WIDTH;
                    var port_height = element.height || DEFAULT_PORT_HEIGHT;
                    var classes = element.classes || ['port', 'physical_port'];
                    var parent = element.parent || undefined;
                    var port = create_node(router_id + port_id).router_id(router_id).align(align).label(label).width(port_width).height(port_height).classes(classes).parent(parent).fit(position, node_width, node_height);
                    eles.push(port.toObject());
                });
            }

        });
        return eles;
    };


    iida.appdata.current = "physical"

})();
