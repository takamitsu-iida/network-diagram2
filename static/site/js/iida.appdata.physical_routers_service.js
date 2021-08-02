/* global iida */

(function () {
    iida.appdata.physical_routers = iida.appdata.physical_routers || [];

    var x, y;
    var x_interval = y_interval = 200;
    var routers;

    x = 8;
    y = 2;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "C棟サービス収容ルータ#1",
            'label': "C棟サービス収容ルータ#1\nASR 9901\ntac-his-sr103\nloopback:172.16.13.3\nMgmt 10.100.1.240",
            'classes': ['router', 'physical_router', 'PE'],
            'drag_with': ["C棟サービス収容ルータ#2"],
            'ports': [
                {
                    'id': "Hu0/0/0/20",
                    'label': "Hu0/0/0/0/20\n.10",
                    'align': ['L', 'C']
                },
                {
                    'id': "Hu0/0/0/21",
                    'label': "Hu0/0/0/0/21\n.5",
                    'align': ['L', 'B']
                },
                {
                    'id': "G0/0/0/8",
                    'label': "G0/0/0/8",
                    'align': ['R', 'T']
                },
                {
                    'id': "G0/0/0/9",
                    'label': "G0/0/0/9",
                    'align': ['R', 'T2']
                },
                {
                    'id': "G0/0/0/10",
                    'label': "G0/0/0/10",
                    'align': ['R', 'C']
                },
                {
                    'id': "G0/0/0/10Connector",
                    'classes': ['physical_connector'],
                    'align': ['OR', 'C'],
                    'parent': "C棟サービス収容ルータ#1#2Bundle-Ether1010"
                },

            ]
        },

        {
            'source': "C棟サービス収容ルータ#1Hu0/0/0/20",
            'target': "C棟コアルータ#1Hu0/0/0/16",
            'label': "192.168.16.8/30"
        },

        {
            'source': "C棟サービス収容ルータ#1G0/0/0/10",
            'target': "C棟サービス収容ルータ#1G0/0/0/10Connector"
        },

        {
            '__COMMENT__': "ポートを網掛けするためのparent",
            'id': "C棟サービス収容ルータ#1#2Bundle-Ether1010",
            'label': "Bundle-Ether1010",
            'classes': ['bundle_ether']
        },
    ];
    Array.prototype.push.apply(iida.appdata.physical_routers, routers);

    y = 3;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "C棟サービス収容ルータ#2",
            'label': "C棟サービス収容ルータ#2\nASR 9901\ntac-his-sr104\nloopback:172.16.13.4\nMgmt 10.100.1.239",
            'classes': ['router', 'physical_router', 'PE'],
            'drag_with': ["C棟サービス収容ルータ#1"],
            'ports': [
                {
                    'id': "Hu0/0/0/21",
                    'label': "Hu0/0/0/0/21\n.6",
                    'align': ['L', 'T']
                },
                {
                    'id': "Hu0/0/0/20",
                    'label': "Hu0/0/0/0/20\n.14",
                    'align': ['L', 'C']
                },
                {
                    'id': "G0/0/0/8",
                    'label': "G0/0/0/8",
                    'align': ['R', 'T']
                },
                {
                    'id': "G0/0/0/9",
                    'label': "G0/0/0/9",
                    'align': ['R', 'T2']
                },
                {
                    'id': "G0/0/0/10",
                    'label': "G0/0/0/10",
                    'align': ['R', 'C']
                },
                {
                    'id': "G0/0/0/10Connector",
                    'classes': ['physical_connector'],
                    'align': ['OR', 'C'],
                    'parent': "C棟サービス収容ルータ#1#2Bundle-Ether1010"
                },


            ]
        },

        {
            'source': "C棟サービス収容ルータ#2Hu0/0/0/20",
            'target': "C棟コアルータ#2Hu0/0/0/16",
            'label': "192.168.16.12/30"
        },

        {
            'source': "C棟サービス収容ルータ#2Hu0/0/0/21",
            'target': "C棟サービス収容ルータ#1Hu0/0/0/21",
            'label': "192.168.18.4/30"
        },

        {
            'source': "C棟サービス収容ルータ#2G0/0/0/10",
            'target': "C棟サービス収容ルータ#2G0/0/0/10Connector",
        },

    ];
    Array.prototype.push.apply(iida.appdata.physical_routers, routers);


    y = 7;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "B棟サービス収容ルータ#1",
            'label': "B棟サービス収容ルータ#1\nASR 9901\ntab-his-sr201\nloopback:172.16.13.1\nMgmt 10.100.1.242",
            'classes': ['router', 'physical_router', 'PE'],
            'drag_with': ["B棟サービス収容ルータ#2"],
            'ports': [
                {
                    'id': "Hu0/0/0/21",
                    'label': "Hu0/0/0/0/21\n.1",
                    'align': ['L', 'B']
                },

                {
                    'id': "Hu0/0/0/20",
                    'label': "Hu0/0/0/0/20\n.2",
                    'align': ['L', 'C']
                },

                {
                    'id': "G0/0/0/8",
                    'label': "G0/0/0/8\n.137",
                    'align': ['R', 'T']
                },

                {
                    'id': "G0/0/0/9",
                    'label': "G0/0/0/9",
                    'align': ['R', 'C']
                },

                {
                    'id': "G0/0/0/9Connector",
                    'classes': ['physical_connector'],
                    'align': ['OR', 'C'],
                    'parent': "B棟サービス収容ルータ#1#2Bundle-Ether1009"
                },
            ]
        },

        {
            '__COMMENT__': "ポートを網掛けするためのparent",
            'id': "B棟サービス収容ルータ#1#2Bundle-Ether1009",
            'label': "Bundle-Ether1009",
            'classes': ['bundle_ether']
        },

        {
            'source': "B棟サービス収容ルータ#1Hu0/0/0/20",
            'target': "B棟コアルータ#1Hu0/0/0/16",
            'label': "192.168.16.0/30"
        },

        {
            'source': "B棟サービス収容ルータ#1G0/0/0/9",
            'target': "B棟サービス収容ルータ#1G0/0/0/9Connector",
        }
    ];
    Array.prototype.push.apply(iida.appdata.physical_routers, routers);


    y = 8;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "B棟サービス収容ルータ#2",
            'label': "B棟サービス収容ルータ#2\nASR 9901\ntab-his-sr202\nloopback:172.16.13.2\nMgmt 10.100.1.241",
            'classes': ['router', 'physical_router', 'PE'],
            'drag_with': ["B棟サービス収容ルータ#1"],
            'ports': [
                {
                    'id': "Hu0/0/0/21",
                    'label': "Hu0/0/0/0/21\n.2",
                    'align': ['L', 'T']
                },

                {
                    'id': "Hu0/0/0/20",
                    'label': "Hu0/0/0/0/20\n.6",
                    'align': ['L', 'C']
                },

                {
                    'id': "G0/0/0/8",
                    'label': "G0/0/0/8\n.141",
                    'align': ['R', 'T']
                },

                {
                    'id': "G0/0/0/9",
                    'label': "G0/0/0/9",
                    'align': ['R', 'C']
                },

                {
                    'id': "G0/0/0/9Connector",
                    'classes': ['physical_connector'],
                    'align': ['OR', 'C'],
                    'parent': "B棟サービス収容ルータ#1#2Bundle-Ether1009"
                },
            ]
        },

        {
            'source': "B棟サービス収容ルータ#2Hu0/0/0/21",
            'target': "B棟サービス収容ルータ#1Hu0/0/0/21",
            'label': "192.168.18.0/30"
        },

        {
            'source': "B棟サービス収容ルータ#2Hu0/0/0/20",
            'target': "B棟コアルータ#2Hu0/0/0/16",
            'label': "192.168.16.4/30"
        },

        {
            'source': "B棟サービス収容ルータ#2G0/0/0/9",
            'target': "B棟サービス収容ルータ#2G0/0/0/9Connector"
        },

    ];
    Array.prototype.push.apply(iida.appdata.physical_routers, routers);


})();
