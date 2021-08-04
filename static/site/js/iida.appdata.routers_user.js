/* global iida */

(function () {
    iida.appdata = iida.appdata || {};
    iida.appdata.routers = iida.appdata.routers || [];
    iida.appdata.edges = iida.appdata.edges || [];

    // see position.pptx
    var x, y;
    var x_interval = y_interval = 200;
    var routers, edges;

    x = 4;
    y = 1;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "C棟ユーザ収容ルータ#1",
            'label': "C棟ユーザ収容ルータ#1\nNCS5501\ntac-his-ur527\nloopback:172.16.14.27\nMgmt 10.100.1.86",
            'classes': ['PE'],
            'drag_with': "C棟ユーザ収容ルータ#2",
            'ports': [
                {
                    'id': "Hu0/0/1/0",
                    'label': "Hu0/0/0/1/0\n.90",
                    'align': ['R', 'C']
                },
                {
                    'id': "Hu0/0/1/2",
                    'label': "Hu0/0/1/2\n.45",
                    'align': ['R', 'B']
                },
                {
                    'id': "Gi0/0/0/0",
                    'label': "Gi0/0/0/0\nBundle-E1000",
                    'align': ['L', 'C']
                },
                {
                    'id': "Hu0/0/1/4",
                    'label': "Hu0/0/1/4",
                    'align': ['L', 'T']
                },
                {
                    'id': "Hu0/0/1/5",
                    'label': "Hu0/0/1/5\n.253",
                    'align': ['C', 'T']
                }
            ]
        }
    ];
    Array.prototype.push.apply(iida.appdata.routers, routers);


    x = 4;
    y = 2;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "C棟ユーザ収容ルータ#2",
            'label': "C棟ユーザ収容ルータ#2\nNCS5501\ntac-his-ur528\nloopback:172.16.14.28\nMgmt 10.100.1.92",
            'classes': ['PE'],
            'drag_with': "C棟ユーザ収容ルータ#1",
            'ports': [
                {
                    'id': "Hu0/0/1/2",
                    'label': "Hu0/0/1/2\n.46",
                    'align': ['R', 'T']
                },
                {
                    'id': "Hu0/0/1/0",
                    'label': "Hu0/0/1/0\n.93",
                    'align': ['R', 'C']
                },
                {
                    'id': "Hu0/0/1/5",
                    'label': "Hu0/0/1/5\n.254",
                    'align': ['C', 'B']
                },
                {
                    'id': "Hu0/0/1/4",
                    'align': ['L', 'B']
                },
                {
                    'id': "G0/0/0/0",
                    'label': "G0/0/0/0\nBundle-E1000",
                    'align': ['L', 'C']
                }
            ]
        }
    ];
    Array.prototype.push.apply(iida.appdata.routers, routers);


    x = 4;
    y = 3;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "C棟ユーザ収容ルータ#3",
            'label': "C棟ユーザ収容ルータ#3\nNCS5501\ntac-his-ur529\nloopback:172.16.14.29\nMgmt 10.100.1.98\n",
            'classes': ['PE'],
            'drag_with': "C棟ユーザ収容ルータ#4",
            'ports': [
                {
                    'id': "Hu0/0/1/0",
                    'label': "Hu0/0/1/0\n.98",
                    'align': ['R', 'C']
                },
                {
                    'id': "Hu0/0/1/2",
                    'label': "Hu0/0/1/2\n.49",
                    'align': ['R', 'B']
                },
                {
                    'id': "G0/0/0/0",
                    'label': "G0/0/0/0\nBundle-E1000",
                    'align': ['L', 'C']
                }
            ]
        }
    ];
    Array.prototype.push.apply(iida.appdata.routers, routers);


    x = 4;
    y = 4;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "C棟ユーザ収容ルータ#4",
            'label': "C棟ユーザ収容ルータ#4\nNCS5501\ntac-his-ur530\nloobback:172.16.14.30\nMgmt 10.100.1.104",
            'classes': ['PE'],
            'drag_with': "C棟ユーザ収容ルータ#3",
            'ports': [
                {
                    'id': "Hu0/0/1/2",
                    'label': "Hu0/0/1/2\n.50",
                    'align': ['R', 'T']
                },
                {
                    'id': "Hu0/0/1/0",
                    'label': "Hu0/0/1/0\n.102",
                    'align': ['R', 'C']
                },
                {
                    'id': "G0/0/0/0",
                    'label': "G0/0/0/0\nBundle-E1000",
                    'align': ['L', 'C']
                }
            ]
        }
    ];
    Array.prototype.push.apply(iida.appdata.routers, routers);


    x = 4;
    y = 6;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "B棟ユーザ収容ルータ#1",
            'label': "B棟ユーザ収容ルータ#1\nNCS5501\ntab-his-ur517\nloopback:172.16.14.17\nMgmt 10.100.1.44",
            'classes': ['PE'],
            'drag_with': "B棟ユーザ収容ルータ#2",
            'ports': [
                {
                    'id': "Hu0/0/1/0",
                    'label': "Hu0/0/1/0\n.2",
                    'align': ['R', 'C']
                },
                {
                    'id': "Hu0/0/1/2",
                    'label': "Hu0/0/1/2\n.1",
                    'align': ['R', 'B']
                },
                {
                    'id': "G0/0/0/0",
                    'label': "G0/0/0/0\nBundle-E1000",
                    'align': ['L', 'C']
                }
            ]
        }
    ];
    Array.prototype.push.apply(iida.appdata.routers, routers);


    x = 4;
    y = 7;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "B棟ユーザ収容ルータ#2",
            'label': "B棟ユーザ収容ルータ#2\nNCS5501\ntab-his-ur518\nloopback:172.16.14.18\nMgmt 10.100.1.45",
            'classes': ['PE'],
            'drag_with': "B棟ユーザ収容ルータ#1",
            'ports': [
                {
                    'id': "Hu0/0/1/2",
                    'label': "Hu0/0/1/2\n.2",
                    'align': ['R', 'T']
                },
                {
                    'id': "Hu0/0/1/0",
                    'label': "Hu0/0/1/0\n.6",
                    'align': ['R', 'C']
                },
                {
                    'id': "G0/0/0/0",
                    'label': "G0/0/0/0\nBundle-E1000",
                    'align': ['L', 'C']
                }
            ]
        }
    ];
    Array.prototype.push.apply(iida.appdata.routers, routers);


    x = 4;
    y = 8;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "B棟ユーザ収容ルータ#3",
            'label': "B棟ユーザ収容ルータ#3\nNCS5501\ntab-his-ur519\nloopback:172.16.14.19\nMgmt 10.100.1.50",
            'classes': ['PE'],
            'drag_with': "B棟ユーザ収容ルータ#4",
            'ports': [
                {
                    'id': "Hu0/0/1/0",
                    'label': "Hu0/0/1/0\n.10",
                    'align': ['R', 'C']
                },
                {
                    'id': "Hu0/0/1/2",
                    'label': "Hu0/0/1/2\n.5",
                    'align': ['R', 'B']
                },
                {
                    'id': "G0/0/0/0",
                    'label': "G0/0/0/0\nBundle-E1000",
                    'align': ['L', 'C']
                }
            ]
        }
    ];
    Array.prototype.push.apply(iida.appdata.routers, routers);


    x = 4;
    y = 9;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "B棟ユーザ収容ルータ#4",
            'label': "B棟ユーザ収容ルータ#4\nNCS5501\ntab-his-ur520\nloopback:172.16.14.20\nMgmt 10.100.1.51\n",
            'classes': ['PE'],
            'drag_with': "B棟ユーザ収容ルータ#3",
            'ports': [
                {
                    'id': "Hu0/0/1/2",
                    'label': "Hu0/0/1/2\n.6",
                    'align': ['R', 'T']
                },
                {
                    'id': "Hu0/0/1/0",
                    'label': "Hu0/0/1/0\n.14",
                    'align': ['R', 'C']
                },
                {
                    'id': "G0/0/0/0",
                    'label': "G0/0/0/0\nBundle-E1000",
                    'align': ['L', 'C']
                }
            ]
        }
    ];
    Array.prototype.push.apply(iida.appdata.routers, routers);


    edges = [
        {
            'source_router': "C棟ユーザ収容ルータ#1",
            'source_port': "Hu0/0/1/5",
            'target_router': "C棟ユーザ収容ルータ#1",
            'target_port': "Hu0/0/1/4",
            'label': ".253",
            'weight': 1,
            'classes': ["segments_p50"]
        },

        {
            'source_router': "C棟コアルータ#1",
            'source_port': "Hu0/0/0/0",
            'target_router': "C棟ユーザ収容ルータ#1",
            'target_port': "Hu0/0/1/0",
            'label': "192.168.10.88/30",
            'weight': 1
        },

        {
            'source_router': "C棟ユーザ収容ルータ#2",
            'source_port': "Hu0/0/1/5",
            'target_router': "C棟ユーザ収容ルータ#2",
            'target_port': "Hu0/0/1/4",
            'label': ".254",
            'weight': 1,
            'classes': ["segments_m50"]
        },

        {
            'source_router': "C棟ユーザ収容ルータ#1",
            'source_port': "Hu0/0/1/2",
            'target_router': "C棟ユーザ収容ルータ#2",
            'target_port': "Hu0/0/1/2",
            'label': "192.168.14.44/30",
            'weight': 1
        },

        {
            'source_router': "C棟コアルータ#2",
            'source_port': "Hu0/0/0/0",
            'target_router': "C棟ユーザ収容ルータ#2",
            'target_port': "Hu0/0/1/0",
            'label': "192.168.10.92/30",
            'weight': 5
        },

        {
            'source_router': "C棟ユーザ収容ルータ#3",
            'source_port': "Hu0/0/1/0",
            'target_router': "C棟コアルータ#1",
            'target_port': "Hu0/0/0/1",
            'label': "192.168.10.96/30",
            'weight': 1
        },

        {
            'source_router': "C棟ユーザ収容ルータ#3",
            'source_port': "Hu0/0/1/2",
            'target_router': "C棟ユーザ収容ルータ#4",
            'target_port': "Hu0/0/1/2",
            'label': "192.168.14.48/30",
            'weight': 1
        },

        {
            'source_router': "C棟ユーザ収容ルータ#4",
            'source_port': "Hu0/0/1/0",
            'target_router': "C棟コアルータ#2",
            'target_port': "Hu0/0/0/1",
            'label': "192.168.10.100/30",
            'weight': 1
        },

        {
            'source_router': "B棟ユーザ収容ルータ#1",
            'source_port': "Hu0/0/1/0",
            'target_router': "B棟コアルータ#1",
            'target_port': "Hu0/0/0/0",
            'label': "192.168.10.0/30",
            'weight': 1
        },

        {
            'source_router': "B棟ユーザ収容ルータ#1",
            'source_port': "Hu0/0/1/2",
            'target_router': "B棟ユーザ収容ルータ#2",
            'target_port': "Hu0/0/1/2",
            'label': "192.168.14.0/30",
            'weight': 1
        },

        {
            'source_router': "B棟ユーザ収容ルータ#2",
            'source_port': "Hu0/0/1/0",
            'target_router': "B棟コアルータ#2",
            'target_port': "Hu0/0/0/0",
            'label': "192.168.10.4/30",
            'weight': 5
        },

        {
            'source_router': "B棟ユーザ収容ルータ#3",
            'source_port': "Hu0/0/1/0",
            'target_router': "B棟コアルータ#1",
            'target_port': "Hu0/0/0/1",
            'label': "192.168.10.8/30",
            'weight': 1
        },

        {
            'source_router': "B棟ユーザ収容ルータ#3",
            'source_port': "Hu0/0/1/2",
            'target_router': "B棟ユーザ収容ルータ#4",
            'target_port': "Hu0/0/1/2",
            'label': "192.168.14.4/30",
            'weight': 1
        },

        {
            'source_router': "B棟ユーザ収容ルータ#4",
            'source_port': "Hu0/0/1/0",
            'target_router': "B棟コアルータ#2",
            'target_port': "Hu0/0/0/1",
            'label': "192.168.10.12/30",
            'weight': 1
        }
    ];

    Array.prototype.push.apply(iida.appdata.edges, edges);

})();
