/* global iida */

(function () {
    iida.appdata = iida.appdata || {};
    iida.appdata.routers = iida.appdata.routers || [];
    iida.appdata.edges = iida.appdata.edges || [];

    // see position.pptx
    var x, y;
    var x_interval = y_interval = 200;
    var routers, edges;

    x = 8;
    y = 2;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "C棟サービス収容ルータ#1",
            'label': "C棟サービス収容ルータ#1\nASR 9901\ntac-his-sr103\nloopback:172.16.13.3\nMgmt 10.100.1.240",
            'classes': ['router', 'PE'],
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
                    'classes': ['connector'],
                    'align': ['OR', 'C'],
                    'parent': "C棟サービス収容ルータ#1#2Bundle-Ether1010"
                },

            ]
        },


        {
            '__COMMENT__': "ポートを網掛けするためのparent",
            'id': "C棟サービス収容ルータ#1#2Bundle-Ether1010",
            'label': "Bundle-Ether1010",
            'classes': ['bundle_ether']
        },
    ];
    Array.prototype.push.apply(iida.appdata.routers, routers);

    x = 8;
    y = 3;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "C棟サービス収容ルータ#2",
            'label': "C棟サービス収容ルータ#2\nASR 9901\ntac-his-sr104\nloopback:172.16.13.4\nMgmt 10.100.1.239",
            'classes': ['router', 'PE'],
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
                    'classes': ['connector'],
                    'align': ['OR', 'C'],
                    'parent': "C棟サービス収容ルータ#1#2Bundle-Ether1010"
                },


            ]
        },


    ];
    Array.prototype.push.apply(iida.appdata.routers, routers);


    x = 8;
    y = 7;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "B棟サービス収容ルータ#1",
            'label': "B棟サービス収容ルータ#1\nASR 9901\ntab-his-sr201\nloopback:172.16.13.1\nMgmt 10.100.1.242",
            'classes': ['router', 'PE'],
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
                    'classes': ['connector'],
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

    ];
    Array.prototype.push.apply(iida.appdata.routers, routers);


    x = 8;
    y = 8;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "B棟サービス収容ルータ#2",
            'label': "B棟サービス収容ルータ#2\nASR 9901\ntab-his-sr202\nloopback:172.16.13.2\nMgmt 10.100.1.241",
            'classes': ['router', 'PE'],
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
                    'classes': ['connector'],
                    'align': ['OR', 'C'],
                    'parent': "B棟サービス収容ルータ#1#2Bundle-Ether1009"
                },
            ]
        },

    ];
    Array.prototype.push.apply(iida.appdata.routers, routers);


    edges = [
        {
            'source_router': "C棟サービス収容ルータ#1",
            'source_port': "Hu0/0/0/20",
            'target_router': "C棟コアルータ#1",
            'target_port': "Hu0/0/0/16",
            'label': "192.168.16.8/30",
            'weight': 1
        },

        {
            'source_router': "C棟サービス収容ルータ#1",
            'source_port': "G0/0/0/10",
            'target_router': "C棟サービス収容ルータ#1",
            'target_port': "G0/0/0/10Connector",
        },

        {
            'source_router': "C棟サービス収容ルータ#2",
            'source_port': "Hu0/0/0/20",
            'target_router': "C棟コアルータ#2",
            'target_port': "Hu0/0/0/16",
            'label': "192.168.16.12/30",
            'weight': 5
        },

        {
            'source_router': "C棟サービス収容ルータ#2",
            'source_port': "Hu0/0/0/21",
            'target_router': "C棟サービス収容ルータ#1",
            'target_port': "Hu0/0/0/21",
            'label': "192.168.18.4/30",
            'weight': 1
        },

        {
            'source_router': "C棟サービス収容ルータ#2",
            'source_port': "G0/0/0/10",
            'target_router': "C棟サービス収容ルータ#2",
            'target_port': "G0/0/0/10Connector",
        },

        {
            'source_router': "B棟サービス収容ルータ#1",
            'source_port': "Hu0/0/0/20",
            'target_router': "B棟コアルータ#1",
            'target_port': "Hu0/0/0/16",
            'label': "192.168.16.0/30",
            'weight': 1
        },

        {
            'source_router': "B棟サービス収容ルータ#1",
            'source_port': "G0/0/0/9",
            'target_router': "B棟サービス収容ルータ#1",
            'target_port': "G0/0/0/9Connector",
        },

        {
            'source_router': "B棟サービス収容ルータ#2",
            'source_port': "Hu0/0/0/21",
            'target_router': "B棟サービス収容ルータ#1",
            'target_port': "Hu0/0/0/21",
            'label': "192.168.18.0/30",
            'weight': 1
        },

        {
            'source_router': "B棟サービス収容ルータ#2",
            'source_port': "Hu0/0/0/20",
            'target_router': "B棟コアルータ#2",
            'target_port': "Hu0/0/0/16",
            'label': "192.168.16.4/30",
            'weight': 5
        },

        {
            'source_router': "B棟サービス収容ルータ#2",
            'source_port': "G0/0/0/9",
            'target_router': "B棟サービス収容ルータ#2",
            'target_port': "G0/0/0/9Connector",
        },
    ];

    Array.prototype.push.apply(iida.appdata.edges, edges);

})();
