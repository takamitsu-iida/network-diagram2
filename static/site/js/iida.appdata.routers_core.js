/* global iida */

(function () {
    iida.appdata = iida.appdata || {};
    iida.appdata.routers = iida.appdata.routers || [];
    iida.appdata.edges = iida.appdata.edges || [];

    // see position.pptx
    var x, y;
    var x_interval = y_interval = 200;
    var routers, edges;

    x = 6;
    y = 3;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "C棟コアルータ#1",
            'label': "C棟コアルータ#1\nNCS-55A1-36H-B\ntac-his-cr103\nloopback:172.16.11.3\nMgmt 10.100.1.244",
            'width': 200,
            'drag_with': ["C棟コアルータ#2", "B棟コアルータ#1", "B棟コアルータ#2"],
            'classes': ['P'],
            'ports': [
                {
                    'id': "Hu0/0/0/0",
                    'label': "Hu0/0/0/0\n.89",
                    'align': ['L', 'T']
                },
                {
                    'id': "Hu0/0/0/16",
                    'label': "Hu0/0/0/16\n.9",
                    'align': ['R', 'T']
                },
                {
                    'id': "Hu0/0/0/27",
                    'label': "Hu0/0/0/27\n.42",
                    'align': ['R', 'C']
                },
                {
                    'id': "Hu0/0/0/22",
                    'label': "Hu0/0/0/22\n.37",
                    'align': ['R', 'B']
                },
                {
                    'id': "Hu0/0/0/1",
                    'label': "Hu0/0/0/1\n.97",
                    'align': ['L', 'C']
                }
            ]
        }
    ];
    Array.prototype.push.apply(iida.appdata.routers, routers);


    x = 6;
    y = 4;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "C棟コアルータ#2",
            'label': "C棟コアルータ#2\nNCS-55A1-36H-B\ntac-his-cr104\nloopback:172.16.11.4\nMgmt 10.100.1.243",
            'drag_with': ["C棟コアルータ#1", "B棟コアルータ#1", "B棟コアルータ#2"],
            'classes': ['P'],
            'ports': [
                {
                    'id': "Hu0/0/0/0",
                    'label': "Hu0/0/0/0\n.94",
                    'align': ['L', 'T']
                },
                {
                    'id': "Hu0/0/0/22",
                    'label': "Hu0/0/0/22\n.38",
                    'align': ['R', 'T']
                },
                {
                    'id': "Hu0/0/0/16",
                    'label': "Hu0/0/0/16\n.13",
                    'align': ['R', 'C']
                },
                {
                    'id': "Hu0/0/0/27",
                    'label': "Hu0/0/0/27\n.46",
                    'align': ['R', 'B']
                },
                {
                    'id': "Hu0/0/0/1",
                    'label': "Hu0/0/0/1\n.101",
                    'align': ['L', 'C']
                }
            ]
        }
    ];
    Array.prototype.push.apply(iida.appdata.routers, routers);


    x = 6;
    y = 6;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "B棟コアルータ#1",
            'label': "B棟コアルータ#1\nNCS-55A1-36H-B\ntab-his-cr201\nloopback:172.16.11.1\nMgmt 10.100.1.246",
            'drag_with': ["C棟コアルータ#1", "C棟コアルータ#2", "B棟コアルータ#2"],
            'classes': ['P'],
            'ports': [
                {
                    'id': "Hu0/0/0/27",
                    'label': "Hu0/0/0/27\n.41",
                    'align': ['R', 'T']
                },
                {
                    'id': "Hu0/0/0/16",
                    'label': "Hu0/0/0/16\n.1",
                    'align': ['R', 'C']
                },
                {
                    'id': "Hu0/0/0/22",
                    'label': "Hu0/0/0/22\n.33",
                    'align': ['R', 'B']
                },
                {
                    'id': "Hu0/0/0/1",
                    'label': "Hu0/0/0/1\n.9",
                    'align': ['L', 'B']
                },
                {
                    'id': "Hu0/0/0/0",
                    'label': "Hu0/0/0/0\n.1",
                    'align': ['L', 'C']
                }
            ]
        }
    ];
    Array.prototype.push.apply(iida.appdata.routers, routers);


    x = 6;
    y = 7;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "B棟コアルータ#2",
            'label': "B棟コアルータ#2\nNCS-55A1-36H-B\ntab-his-cr202\nloopback:172.16.11.2\nMgmt 10.100.1.245",
            'drag_with': ["C棟コアルータ#1", "C棟コアルータ#2", "B棟コアルータ#1"],
            'classes': ['P'],
            'ports': [
                {
                    'id': "Hu0/0/0/22",
                    'label': "Hu0/0/0/22\n.34",
                    'align': ['R', 'T']
                },
                {
                    'id': "Hu0/0/0/27",
                    'label': "Hu0/0/0/27\n.45",
                    'align': ['R', 'C']
                },
                {
                    'id': "Hu0/0/0/16",
                    'label': "Hu0/0/0/16\n.5",
                    'align': ['R', 'B']
                },
                {
                    'id': "Hu0/0/0/1",
                    'label': "Hu0/0/0/1\n.13",
                    'align': ['L', 'B']
                },
                {
                    'id': "Hu0/0/0/0",
                    'label': "Hu0/0/0/0\n.5",
                    'align': ['L', 'C']
                }
            ]
        }
    ];
    Array.prototype.push.apply(iida.appdata.routers, routers);


    edges = [
        {
            'source_router': "C棟コアルータ#1",
            'source_port': "Hu0/0/0/22",
            'target_router': "C棟コアルータ#2",
            'target_port': "Hu0/0/0/22",
            'label': "192.168.19.36/30",
            'weight': 1
        },

        {
            'source_router': "B棟コアルータ#1",
            'source_port': "Hu0/0/0/22",
            'target_router': "B棟コアルータ#2",
            'target_port': "Hu0/0/0/22",
            'label': "192.168.19.32/30",
            'weight': 1
        },

        {
            'source_router': "C棟コアルータ#1",
            'source_port': "Hu0/0/0/27",
            'target_router': "B棟コアルータ#1",
            'target_port': "Hu0/0/0/27",
            'label': "192.168.19.40/30",
            'weight': 1,
            'classes': ["segments_m50"]
        },

        {
            'source_router': "C棟コアルータ#2",
            'source_port': "Hu0/0/0/27",
            'target_router': "B棟コアルータ#2",
            'target_port': "Hu0/0/0/27",
            'label': "192.168.19.44/30",
            'weight': 5,
            'classes': ["segments_m70"]
        }
    ];
    Array.prototype.push.apply(iida.appdata.edges, edges);

})();
