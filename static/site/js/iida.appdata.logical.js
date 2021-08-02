/* global iida */

(function () {

    var DEFAULT_NODE_WIDTH = 80;
    var DEFAULT_NODE_HEIGHT = 80;

    var create_node = function (id) {

        var _id = id;
        var _label = id;
        var _position = { x: 0, y: 0 };
        var _classes = [];
        var _width = DEFAULT_NODE_WIDTH;
        var _height = DEFAULT_NODE_HEIGHT;

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
            data['initial_position'] = Object.assign({}, _position);  // store initial position to revert to preset position

            return {
                'data': data,
                'position': _position,
                'classes': _classes
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
            // replace _classes
            _classes = _;
            return this;
        };


        return exports;
    };


    var create_edge = function (id) {
        var _id = id;
        var _source;
        var _target;
        var _label = "";
        var _weight = 1;
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
                    'label': _label,
                    'weight': _weight
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
            // append classes
            Array.prototype.push.apply(_classes, _);
            _classes = _classes.filter((elem, index, self) => self.indexOf(elem) === index);
            return this;
        };

        return exports;
    };

    //
    // iida.appdata.logical_routers配列から足りないデータを補完してcytoscape.js用のデータを作成する
    // 同時にiida.appdata.logical_router_ids配列を作る
    var create_elements = function () {
        iida.appdata.logical_router_ids = [];
        var eles = []
        iida.appdata.logical_routers.forEach(element => {
            if (element.source && element.target) {
                // edge
                var source = element.source;
                var target = element.target;
                var label = element.label || "";
                var weight = element.weight || 1;
                var classes = element.classes || [];
                var edge = create_edge(source + target).source(source).target(target).label(label).weight(weight).classes(classes);
                eles.push(edge.toObject());
            } else {
                var position = element.position || { x: 0, y: 0 };
                var router_id = element.id;
                var label = element.label || '';
                var node_width = element.width || DEFAULT_NODE_WIDTH;
                var node_height = element.height || DEFAULT_NODE_HEIGHT;
                // if classes is defined, use it
                // if not defined, use these classes as default
                var classes = element.classes || ['router', 'logical_router'];
                var router_node = create_node(router_id).position(position).label(label).width(node_width).height(node_height).classes(classes);
                eles.push(router_node.toObject());

                iida.appdata.logical_router_ids.push(router_id);
            }

        });
        return eles;
    };

    iida.appdata.logical_elements = create_elements();

    iida.appdata.current = "logical"


    //
    // fcose option
    // https://github.com/iVis-at-Bilkent/cytoscape.js-fcose
    //
    iida.appdata.logical_fcose_option = {
        name: "fcose",
        quality: "proof",  // "default",
        randomize: false,  // true,
        animate: true,
        animationDuration: 1000,
        animationEasing: "ease",
        fit: false,  // default is true
        padding: 30,

        // Separation amount between nodes
        nodeSeparation: 150,

        // Ideal edge (non nested) length
        idealEdgeLength: edge => 150,

        // Fix desired nodes to predefined positions
        // [{nodeId: 'n1', position: {x: 100, y: 200}}, {...}]
        fixedNodeConstraint: undefined,

        // Align desired nodes in vertical/horizontal direction
        // {vertical: [['n1', 'n2'], [...]], horizontal: [['n2', 'n4'], [...]]}
        alignmentConstraint: {
            'vertical': [
                ["C棟コアルータ#1", "C棟コアルータ#2"],
                ["B棟コアルータ#1", "B棟コアルータ#2"],
                ["C棟ユーザ収容ルータ#1", "C棟ユーザ収容ルータ#2", "C棟ユーザ収容ルータ#3", "C棟ユーザ収容ルータ#4"],
                ["B棟ユーザ収容ルータ#1", "B棟ユーザ収容ルータ#2", "B棟ユーザ収容ルータ#3", "B棟ユーザ収容ルータ#4"],
                ["B棟サービス収容ルータ#1", "B棟サービス収容ルータ#2"],
                ["C棟サービス収容ルータ#1", "C棟サービス収容ルータ#2"] ],
        },

        // Place two nodes relatively in vertical/horizontal direction
        // [{top: 'n1', bottom: 'n2', gap: 100}, {left: 'n3', right: 'n4', gap: 75}, {...}]
        relativePlacementConstraint: [
            {'left': "C棟ユーザ収容ルータ#1", 'right': "C棟コアルータ#1", 'gap': 300 },
            {'left': "C棟コアルータ#1", 'right': "C棟サービス収容ルータ#1", 'gap': 300 },
            {'left': "B棟ユーザ収容ルータ#1", 'right': "B棟コアルータ#1", 'gap': 300 },
            {'left': "B棟コアルータ#1", 'right': "B棟サービス収容ルータ#1", 'gap': 300 },
            {'top': "C棟コアルータ#1", 'bottom': "C棟コアルータ#2", 'gap': 300},
            {'top': "C棟コアルータ#2", 'bottom': "B棟コアルータ#1", 'gap': 500},
            {'top': "B棟コアルータ#1", 'bottom': "B棟コアルータ#2", 'gap': 300},
        ],

    };

})();
