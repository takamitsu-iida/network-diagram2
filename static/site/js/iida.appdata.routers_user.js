/* global iida */

(function () {

    // see position.pptx
    var col, row;

    var routers
    var edges;

    col = 4;
    row = 1;
    routers = [
        {
            'grid': { 'row': row, 'col': col },
            'id': "C棟ユーザ収容ルータ#1",
            'label': "C棟ユーザ収容ルータ#1\nNCS5501\ntac-his-ur527\nloopback:172.16.14.27\nMgmt 10.100.1.86",
            'popper': "SID:20427",
            'classes': ['PE'],
            'dragWith': "C棟ユーザ収容ルータ#2",
            'redundant': 1,
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
                    'id': "G0/0/0/0",
                    'label': "G0/0/0/0\nBundle-E1000",
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


    col = 4;
    row = 2;
    routers = [
        {
            'grid': { 'row': row, 'col': col },
            'id': "C棟ユーザ収容ルータ#2",
            'label': "C棟ユーザ収容ルータ#2\nNCS5501\ntac-his-ur528\nloopback:172.16.14.28\nMgmt 10.100.1.92",
            'popper': "SID:20428",
            'classes': ['PE'],
            'dragWith': "C棟ユーザ収容ルータ#1",
            'redundant': 2,
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


    col = 4;
    row = 3;
    routers = [
        {
            'grid': { 'row': row, 'col': col },
            'id': "C棟ユーザ収容ルータ#3",
            'label': "C棟ユーザ収容ルータ#3\nNCS5501\ntac-his-ur529\nloopback:172.16.14.29\nMgmt 10.100.1.98\n",
            'popper': "SID:20429",
            'classes': ['PE'],
            'dragWith': "C棟ユーザ収容ルータ#4",
            'redundant': 1,
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


    col = 4;
    row = 4;
    routers = [
        {
            'grid': { 'row': row, 'col': col },
            'id': "C棟ユーザ収容ルータ#4",
            'label': "C棟ユーザ収容ルータ#4\nNCS5501\ntac-his-ur530\nloobback:172.16.14.30\nMgmt 10.100.1.104",
            'popper': "SID:20430",
            'classes': ['PE'],
            'dragWith': "C棟ユーザ収容ルータ#3",
            'redundant': 2,
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


    col = 4;
    row = 5;
    routers = [
        {
            'grid': { 'row': row, 'col': col },
            'id': "B棟ユーザ収容ルータ#1",
            'label': "B棟ユーザ収容ルータ#1\nNCS5501\ntab-his-ur517\nloopback:172.16.14.17\nMgmt 10.100.1.44",
            'popper': "SID:20417",
            'classes': ['PE'],
            'dragWith': "B棟ユーザ収容ルータ#2",
            'redundant': 1,
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


    col = 4;
    row = 6;
    routers = [
        {
            'grid': { 'row': row, 'col': col },
            'id': "B棟ユーザ収容ルータ#2",
            'label': "B棟ユーザ収容ルータ#2\nNCS5501\ntab-his-ur518\nloopback:172.16.14.18\nMgmt 10.100.1.45",
            'popper': "SID:20418",
            'classes': ['PE'],
            'dragWith': "B棟ユーザ収容ルータ#1",
            'redundant': 2,
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


    col = 4;
    row = 7;
    routers = [
        {
            'grid': { 'row': row, 'col': col },
            'id': "B棟ユーザ収容ルータ#3",
            'label': "B棟ユーザ収容ルータ#3\nNCS5501\ntab-his-ur519\nloopback:172.16.14.19\nMgmt 10.100.1.50",
            'popper': "SID:20419",
            'classes': ['PE'],
            'dragWith': "B棟ユーザ収容ルータ#4",
            'redundant': 1,
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


    col = 4;
    row = 8;
    routers = [
        {
            'grid': { 'row': row, 'col': col },
            'id': "B棟ユーザ収容ルータ#4",
            'label': "B棟ユーザ収容ルータ#4\nNCS5501\ntab-his-ur520\nloopback:172.16.14.20\nMgmt 10.100.1.51\n",
            'popper': "SID:20420",
            'classes': ['PE'],
            'dragWith': "B棟ユーザ収容ルータ#3",
            'redundant': 2,
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
            'sourceRouter': "C棟ユーザ収容ルータ#1",
            'sourcePort': "Hu0/0/1/5",
            'targetRouter': "C棟ユーザ収容ルータ#1",
            'targetPort': "Hu0/0/1/4",
            'label': ".253",
            'weight': 1,
            'classes': ["segmentsLeft"]
        },

        {
            'sourceRouter': "C棟コアルータ#1",
            'sourcePort': "Hu0/0/0/0",
            'targetRouter': "C棟ユーザ収容ルータ#1",
            'targetPort': "Hu0/0/1/0",
            'label': "192.168.10.88/30",
            'weight': 1
        },

        {
            'sourceRouter': "C棟ユーザ収容ルータ#2",
            'sourcePort': "Hu0/0/1/5",
            'targetRouter': "C棟ユーザ収容ルータ#2",
            'targetPort': "Hu0/0/1/4",
            'label': ".254",
            'weight': 1,
            'classes': ["segmentsRight"]
        },

        {
            'sourceRouter': "C棟ユーザ収容ルータ#1",
            'sourcePort': "Hu0/0/1/2",
            'targetRouter': "C棟ユーザ収容ルータ#2",
            'targetPort': "Hu0/0/1/2",
            'label': "192.168.14.44/30",
            'weight': 1
        },

        {
            'sourceRouter': "C棟コアルータ#2",
            'sourcePort': "Hu0/0/0/0",
            'targetRouter': "C棟ユーザ収容ルータ#2",
            'targetPort': "Hu0/0/1/0",
            'label': "192.168.10.92/30",
            'weight': 5
        },

        {
            'sourceRouter': "C棟ユーザ収容ルータ#3",
            'sourcePort': "Hu0/0/1/0",
            'targetRouter': "C棟コアルータ#1",
            'targetPort': "Hu0/0/0/1",
            'label': "192.168.10.96/30",
            'weight': 1
        },

        {
            'sourceRouter': "C棟ユーザ収容ルータ#3",
            'sourcePort': "Hu0/0/1/2",
            'targetRouter': "C棟ユーザ収容ルータ#4",
            'targetPort': "Hu0/0/1/2",
            'label': "192.168.14.48/30",
            'weight': 1
        },

        {
            'sourceRouter': "C棟ユーザ収容ルータ#4",
            'sourcePort': "Hu0/0/1/0",
            'targetRouter': "C棟コアルータ#2",
            'targetPort': "Hu0/0/0/1",
            'label': "192.168.10.100/30",
            'weight': 1
        },

        {
            'sourceRouter': "B棟ユーザ収容ルータ#1",
            'sourcePort': "Hu0/0/1/0",
            'targetRouter': "B棟コアルータ#1",
            'targetPort': "Hu0/0/0/0",
            'label': "192.168.10.0/30",
            'weight': 1
        },

        {
            'sourceRouter': "B棟ユーザ収容ルータ#1",
            'sourcePort': "Hu0/0/1/2",
            'targetRouter': "B棟ユーザ収容ルータ#2",
            'targetPort': "Hu0/0/1/2",
            'label': "192.168.14.0/30",
            'weight': 1
        },

        {
            'sourceRouter': "B棟ユーザ収容ルータ#2",
            'sourcePort': "Hu0/0/1/0",
            'targetRouter': "B棟コアルータ#2",
            'targetPort': "Hu0/0/0/0",
            'label': "192.168.10.4/30",
            'weight': 5
        },

        {
            'sourceRouter': "B棟ユーザ収容ルータ#3",
            'sourcePort': "Hu0/0/1/0",
            'targetRouter': "B棟コアルータ#1",
            'targetPort': "Hu0/0/0/1",
            'label': "192.168.10.8/30",
            'weight': 1
        },

        {
            'sourceRouter': "B棟ユーザ収容ルータ#3",
            'sourcePort': "Hu0/0/1/2",
            'targetRouter': "B棟ユーザ収容ルータ#4",
            'targetPort': "Hu0/0/1/2",
            'label': "192.168.14.4/30",
            'weight': 1
        },

        {
            'sourceRouter': "B棟ユーザ収容ルータ#4",
            'sourcePort': "Hu0/0/1/0",
            'targetRouter': "B棟コアルータ#2",
            'targetPort': "Hu0/0/0/1",
            'label': "192.168.10.12/30",
            'weight': 1
        }
    ];

    Array.prototype.push.apply(iida.appdata.edges, edges);

})();
