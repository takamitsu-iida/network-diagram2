/* global iida */

(function () {

    DEFAULT_ROUTER_WIDTH = iida.appdata.DEFAULT_ROUTER_WIDTH;  // 200
    DEFAULT_ROUTER_HEIGHT = iida.appdata.DEFAULT_ROUTER_HEIGHT;  // 120
    DEFAULT_PORT_WIDTH = iida.appdata.DEFAULT_PORT_WIDTH;  // 60
    DEFAULT_PORT_HEIGHT = iida.appdata.DEFAULT_PORT_HEIGHT;  // 20

    var create_node = function () {

        // for router node
        var _id;
        var _label = "";
        var _popper = "";
        var _grid = { 'row': 1, 'col': 1 };
        var _classes = [];
        var _node_type = "router";  // "router" or "port" or "root_port"
        var _width = DEFAULT_ROUTER_WIDTH;
        var _height = DEFAULT_ROUTER_HEIGHT;
        var _drag_with = [];
        var _redundant = 1;
        var _grabbable = true;  // only router is grabbable
        var _ports = [];

        // for port node
        var _router_id = undefined;
        var _align = ['C', 'C'];  // Center, Center
        var _offset_x = 0;  // Center of the router
        var _offset_y = 0;  // Center of the router

        function exports() {
            return this;
        };

        exports.toObject = function () {
            var data = {};

            // for router and port common parameters
            data['id'] = _id;
            data['node_type'] = _node_type;
            data['label'] = _label;
            data['popper'] = _popper;
            data['width'] = _width;
            data['height'] = _height;
            data['drag_with'] = _drag_with;
            data['redundant'] = _redundant;
            data['grid'] = _grid;
            data['ports'] = _ports;

            // for port only parameters
            if (_router_id) {
                data['router_id'] = _router_id;
                data['align'] = _align;
                data['offset_x'] = _offset_x;
                data['offset_y'] = _offset_y;
                _grabbable = false;
            }

            return {
                'data': data,
                'classes': _classes,
                'grabbable': _grabbable
            };
        }

        exports.id = function (_) {
            if (!arguments.length) { return _id; }
            if (_) { _id = _; }
            return this;
        };

        exports.node_type = function (_) {
            if (!arguments.length) { return _node_type; }
            if (_) {
                _node_type = _;
                _classes = [_node_type];
            }
            return this;
        };

        exports.label = function (_) {
            if (!arguments.length) { return _label; }
            if (_) { _label = _; }
            return this;
        };

        exports.popper = function (_) {
            if (!arguments.length) { return _popper; }
            if (_) { _popper = _; }
            return this;
        };

        exports.grid = function (_) {
            if (!arguments.length) { return _grid; }
            if (_) { _grid = _; }
            return this;
        };

        exports.ports = function (_) {
            if (!arguments.length) { return _ports; }
            if (_) { _ports = _; }
            return this;
        };

        exports.width = function (_) {
            if (!arguments.length) { return _width; }
            if (_) { _width = _; }
            return this;
        };

        exports.height = function (_) {
            if (!arguments.length) { return _height; }
            if (_) { _height = _; }
            return this;
        };

        exports.classes = function (_) {
            if (!arguments.length) { return _classes; }
            if (_) {
                if (typeof (_) === 'string') {
                    _ = _.split(",");
                }
                Array.prototype.push.apply(_classes, _);
                _classes = _classes.filter((elem, index, self) => self.indexOf(elem) === index);
            }
            return this;
        };

        exports.drag_with = function (_) {
            if (!arguments.length) { return _drag_with; }
            if (_) {
                if (typeof (_) === "string") {
                    _drag_with = [_];
                } else {
                    _drag_with = _;
                }
            }
            return this;
        };

        exports.redundant = function (_) {
            if (!arguments.length) { return _redundant; }
            if (_) { _redundant = _; }
            return this;
        };

        // for port node
        exports.router_id = function (_) {
            if (!arguments.length) { return _router_id; }
            if (_) { _router_id = _; }
            return this;
        };

        // for port node
        exports.align = function (_) {
            if (!arguments.length) { return _align; }
            if (_) { _align = _; }
            return this;
        };

        exports.offset = function (router_width, router_height, port_width, port_height) {
            var rw = router_width / 2;
            var rh = router_height / 2;
            var pw = port_width / 2;
            var ph = port_height / 2;

            switch (_align[0]) {
                case 'L':  // Left
                    _offset_x = -1 * (rw - pw);
                    break;
                case 'C':  // Center
                    _offset_x = 0;
                    break;
                case 'R':  // Right
                    _offset_x = rw - pw;
                    break;
            }

            switch (_align[1]) {
                case 'T':  // Top
                    _offset_y = -1 * (rh - ph);
                    break;
                case 'T2':  // 2nd Top
                    _offset_y = -1 * (rh - ph) + port_height;
                    break;
                case 'C':  // Center
                    _offset_y = 0;
                    break;
                case 'B':  // Bottom
                    _offset_y = rh - ph;
                    break;
            }

            return this;
        };

        exports.fit = function (router_position) {
            _position = { x: router_position.x + _offset_x, y: router_position.y + _offset_y }
            return this;
        };

        return exports;
    };


    var create_edge = function () {
        var _id;
        var _edge_type = "port_port";  // "port_port" or "router_port"
        var _label = "";
        var _popper = "";
        var _source;
        var _source_router;
        var _source_port;
        var _target;
        var _target_router;
        var _target_port;
        var _weight = 1;
        var _classes = [];

        function exports() {
            return this;
        };

        exports.toObject = function () {
            var data = {
                'id': _id,
                'edge_type': _edge_type,
                'source': _source,
                'source_router': _source_router,
                'source_port': _source_port,
                'target': _target,
                'target_router': _target_router,
                'target_port': _target_port,
                'label': _label,
                'popper': _popper,
                'weight': _weight
            };
            return {
                'data': data,
                'classes': _classes
            }
        }

        exports.id = function (_) {
            if (!arguments.length) { return _id; }
            if (_) { _id = _; }
            return this;
        };

        exports.edge_type = function (_) {
            if (!arguments.length) { return _edge_type; }
            if (_) {
                _edge_type = _;
                _classes = [_edge_type];
            }
            return this;
        };

        exports.source = function (_) {
            if (!arguments.length) { return _source; }
            if (_) { _source = _; }
            return this;
        };

        exports.source_router = function (_) {
            if (!arguments.length) { return _source_router; }
            if (_) { _source_router = _; }
            return this;
        };

        exports.source_port = function (_) {
            if (!arguments.length) { return _source_port; }
            if (_) { _source_port = _; }
            return this;
        };

        exports.target = function (_) {
            if (!arguments.length) { return _target; }
            if (_) { _target = _; }
            return this;
        };

        exports.target_router = function (_) {
            if (!arguments.length) { return _target_router; }
            if (_) { _target_router = _; }
            return this;
        };

        exports.target_port = function (_) {
            if (!arguments.length) { return _target_port; }
            if (_) { _target_port = _; }
            return this;
        };

        exports.label = function (_) {
            if (!arguments.length) { return _label; }
            if (_) { _label = _; }
            return this;
        };

        exports.popper = function (_) {
            if (!arguments.length) { return _popper; }
            if (_) { _popper = _; }
            return this;
        };

        exports.weight = function (_) {
            if (!arguments.length) { return _weight; }
            if (_) { _weight = _; }
            return this;
        };

        exports.classes = function (_) {
            if (!arguments.length) { return _classes; }
            if (_) {
                if (typeof (_) === 'string') {
                    _ = _.split(",");
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
    var create_elements = function (routers, edges) {
        var eles = {
            'nodes': [],
            'edges': []
        };

        // create router and port node
        routers.forEach(router => {

            var grid = router.grid || {};
            var router_id = router.id;
            var label = router.label || "";
            var popper = router.popper || "";
            var router_width = router.width || DEFAULT_ROUTER_WIDTH;
            var router_height = router.height || DEFAULT_ROUTER_HEIGHT;
            var classes = router.classes || [];
            var drag_with = router.drag_with || [];
            var redundant = router.redundant || 1;
            var ports = router.ports || [];

            var n = create_node()
                .id(router_id)
                .node_type('router')
                .grid(grid)
                .label(label)
                .popper(popper)
                .ports(ports)
                .width(router_width)
                .height(router_height)
                .classes(classes)
                .drag_with(drag_with)
                .redundant(redundant);

            eles.nodes.push(n.toObject());

            // create hidden root_port node
            var root_port_id = "_" + router_id;  // IMPORTANT: root_port_id is defined as "_" + router_id
            var n = create_node()
                .id(root_port_id)
                .node_type('root_port')  // root_port type is hidden port
                .router_id(router_id)
                .width(10)
                .height(10);
            eles.nodes.push(n.toObject());

            // create port node
            ports.forEach(port => {
                var pid = port.id;
                var port_id = router_id + pid;
                var label = port.label || pid;
                var align = port.align || ['C', 'C'];
                var port_width = port.width || DEFAULT_PORT_WIDTH;
                var port_height = port.height || DEFAULT_PORT_HEIGHT;
                var classes = port.classes || [];

                var n = create_node()
                    .id(port_id)
                    .node_type('port')
                    .router_id(router_id)
                    .align(align)
                    .label(label)
                    .width(port_width)
                    .height(port_height)
                    .classes(classes)
                    .offset(router_width, router_height, port_width, port_height);

                eles.nodes.push(n.toObject());

                // create internal hidden root_edge from root_port to this port
                var edge_id = root_port_id + port_id;  // is equal to _router_id router_id pid
                var e = create_edge()
                    .id(edge_id)
                    .edge_type("router_port")  // router_port type is hidden edge
                    .source(root_port_id)
                    .target(port_id)
                    .weight(0);
                eles.edges.push(e.toObject());
            });

        });

        // create edge
        edges.forEach(edge => {
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
            var source = source_router + source_port;
            if (!eles.nodes.filter(({ data }) => data.id === source)) {
                console.log("ERROR: failed to create edge, source port not found.")
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
            var target = target_router + target_port;
            if (!eles.nodes.filter(({ data }) => data.id === target)) {
                console.log("ERROR: failed to create edge, target port not found.")
                return;
            }

            var edge_id = source + target;
            var label = edge.label || "";
            var popper = edge.popper || "";
            var weight = edge.weight || 1;
            var classes = edge.classes || [];

            var e = create_edge()
                .id(edge_id)
                .edge_type("port_port")  // port_port is the default edge type
                .source(source)
                .source_router(source_router)
                .source_port(source_port)
                .target(target)
                .target_router(target_router)
                .target_port(target_port)
                .label(label)
                .classes(classes)
                .weight(weight);

            eles.edges.push(e.toObject());
        });

        return eles;
    };

    //
    // create topology model from iida.appdata.elements
    //
    var create_topology_elements = function (elements) {
        var eles = {
            'nodes': [],
            'edges': []
        };

        // copy router nodes
        elements.nodes.forEach(node => {
            if (node.classes.includes('router')) {
                var new_node = JSON.parse(JSON.stringify(node));  // deep copy
                eles.nodes.push(new_node);
            }
        });

        elements.edges.forEach(edge => {
            var source_router = edge.data.source_router;
            var target_router = edge.data.target_router;
            if (source_router === target_router) {
                return;
            }
            var new_edge = JSON.parse(JSON.stringify(edge));  // deep copy

            // fix the source and target to router node
            new_edge.data.source = source_router;
            new_edge.data.target = target_router;
            eles.edges.push(new_edge);
        });

        return eles;
    };

    var elements = create_elements(iida.appdata.routers, iida.appdata.edges);


    var create_detail_topology_elements = function (elements) {
        var eles = {
            'nodes': [],
            'edges': []
        };



    }





    iida.appdata.elements = elements;
    iida.appdata.topology_elements = create_topology_elements(elements);

})();
