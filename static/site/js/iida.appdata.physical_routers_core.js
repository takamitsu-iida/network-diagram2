/* global iida */

(function () {
    iida.appdata.physical_routers = iida.appdata.physical_routers || [];

    var x, y;
    var x_interval = y_interval = 200;
    var routers;

    x = 6;
    y = 3;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "C棟コアルータ#1",
            'label': "C棟コアルータ#1\nNCS-55A1-36H-B\ntac-his-cr103\nloopback:172.16.11.3\nMgmt 10.100.1.244",
            'width': 200,
            'drag_with': ["C棟コアルータ#2", "B棟コアルータ#1", "B棟コアルータ#2"],
            'classes': ['router', 'physical_router', 'P'],
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
                    'id': "Hu0/0/0/27Connector",
                    'classes': ['physical_connector'],
                    'align': ['OR', 'C']
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
            ],
        },
    ];
    Array.prototype.push.apply(iida.appdata.physical_routers, routers);

    y = 4;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "C棟コアルータ#2",
            'label': "C棟コアルータ#2\nNCS-55A1-36H-B\ntac-his-cr104\nloopback:172.16.11.4\nMgmt 10.100.1.243",
            'drag_with': ["C棟コアルータ#1", "B棟コアルータ#1", "B棟コアルータ#2"],
            'classes': ['router', 'physical_router', 'P'],
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
                    'id': "Hu0/0/0/27Connector",
                    'classes': ['physical_connector'],
                    'align': ['ORR', 'B']
                },
                {
                    'id': "Hu0/0/0/1",
                    'label': "Hu0/0/0/1\n.101",
                    'align': ['L', 'C']
                }
            ]
        },

        {
            'source': "C棟コアルータ#1Hu0/0/0/22",
            'target': "C棟コアルータ#2Hu0/0/0/22",
            'label': "192.168.19.36/30"
        },
    ];
    Array.prototype.push.apply(iida.appdata.physical_routers, routers);

    y = 6;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "B棟コアルータ#1",
            'label': "B棟コアルータ#1\nNCS-55A1-36H-B\ntab-his-cr201\nloopback:172.16.11.1\nMgmt 10.100.1.246",
            'drag_with': ["B棟コアルータ#2", "C棟コアルータ#1", "C棟コアルータ#2"],
            'classes': ['router', 'physical_router', 'P'],
            'ports': [
                {
                    'id': "Hu0/0/0/27",
                    'label': "Hu0/0/0/27\n.41",
                    'align': ['R', 'T']
                },
                {
                    'id': "Hu0/0/0/27Connector",
                    'classes': ['physical_connector'],
                    'align': ['OR', 'T']
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
                },
            ]
        },
    ];
    Array.prototype.push.apply(iida.appdata.physical_routers, routers);

    y = 7;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "B棟コアルータ#2",
            'label': "B棟コアルータ#2\nNCS-55A1-36H-B\ntab-his-cr202\nloopback:172.16.11.2\nMgmt 10.100.1.245",
            'drag_with': ["B棟コアルータ#1", "C棟コアルータ#1", "C棟コアルータ#2"],
            'classes': ['router', 'physical_router', 'P'],
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
                    'id': "Hu0/0/0/27Connector",
                    'classes': ['physical_connector'],
                    'align': ['ORR', 'C']
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
                },
            ]
        },

        {
            'source': "B棟コアルータ#1Hu0/0/0/22",
            'target': "B棟コアルータ#2Hu0/0/0/22",
            'label': "192.168.19.32/30"
        },

        {
            'source': "C棟コアルータ#1Hu0/0/0/27",
            'target': "C棟コアルータ#1Hu0/0/0/27Connector"
        },
        {
            'source': "C棟コアルータ#1Hu0/0/0/27Connector",
            'target': "B棟コアルータ#1Hu0/0/0/27Connector",
            'label': "192.168.19.40/30"
        },
        {
            'source': "B棟コアルータ#1Hu0/0/0/27Connector",
            'target': "B棟コアルータ#1Hu0/0/0/27"
        },

        {
            'source': "C棟コアルータ#2Hu0/0/0/27",
            'target': "C棟コアルータ#2Hu0/0/0/27Connector"
        },
        {
            'source': "C棟コアルータ#2Hu0/0/0/27Connector",
            'target': "B棟コアルータ#2Hu0/0/0/27Connector",
            'label': "192.168.19.44/30"
        },
        {
            'source': "B棟コアルータ#2Hu0/0/0/27Connector",
            'target': "B棟コアルータ#2Hu0/0/0/27"
        }

    ];
    Array.prototype.push.apply(iida.appdata.physical_routers, routers);

})();
