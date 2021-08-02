/* global iida */

(function () {

    iida.appdata.logical_routers = iida.appdata.logical_routers || [];

    var x, y;
    var x_interval = y_interval = 200;
    var routers;

    x = 4;
    y = 2;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "C棟コアルータ#1",
            'label': "C棟コアルータ#1\nNCS-55A1-36H-B\ntac-his-cr103\nloopback:172.16.11.3\nMgmt 10.100.1.244",
            'classes': ['router', 'logical_router', 'P']
        },
    ];
    Array.prototype.push.apply(iida.appdata.logical_routers, routers);


    x = 4;
    y = 3;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "C棟コアルータ#2",
            'label': "C棟コアルータ#2\nNCS-55A1-36H-B\ntac-his-cr104\nloopback:172.16.11.4\nMgmt 10.100.1.243",
            'classes': ['router', 'logical_router', 'P']
        },

        {
            'source': "C棟コアルータ#1",
            'target': "C棟コアルータ#2",
            'label': "192.168.19.36/30",
            'weight': 1
        },
    ];
    Array.prototype.push.apply(iida.appdata.logical_routers, routers);


    x = 5;
    y = 6;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "B棟コアルータ#1",
            'label': "B棟コアルータ#1\nNCS-55A1-36H-B\ntab-his-cr201\nloopback:172.16.11.1\nMgmt 10.100.1.246",
            'classes': ['router', 'logical_router', 'P']
        },
    ];
    Array.prototype.push.apply(iida.appdata.logical_routers, routers);


    x = 5;
    y = 7;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "B棟コアルータ#2",
            'label': "B棟コアルータ#2\nNCS-55A1-36H-B\ntab-his-cr202\nloopback:172.16.11.2\nMgmt 10.100.1.245",
            'classes': ['router', 'logical_router', 'P']
        },

        {
            'source': "B棟コアルータ#1",
            'target': "B棟コアルータ#2",
            'label': "192.168.19.32/30",
            'weight': 1
        },

        {
            'source': "C棟コアルータ#1",
            'target': "B棟コアルータ#1",
            'label': "192.168.19.40/30",
            'weight': 1
        },

        {
            'source': "C棟コアルータ#2",
            'target': "B棟コアルータ#2",
            'label': "192.168.19.44/30",
            'weight': 5
        },
    ];
    Array.prototype.push.apply(iida.appdata.logical_routers, routers);


    x = 2;
    y = 1;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "C棟ユーザ収容ルータ#1",
            'label': "C棟ユーザ収容ルータ#1\nNCS5501\ntac-his-ur527\nloopback:172.16.14.27\nMgmt 10.100.1.86",
            'classes': ['router', 'logical_router', 'PE']
        },
    ];
    Array.prototype.push.apply(iida.appdata.logical_routers, routers);


    x = 2;
    y = 2;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "C棟ユーザ収容ルータ#2",
            'label': "C棟ユーザ収容ルータ#2\nNCS5501\ntac-his-ur528\nloopback:172.16.14.28\nMgmt 10.100.1.92",
            'classes': ['router', 'logical_router', 'PE']
        },

        {
            'source': "C棟ユーザ収容ルータ#1",
            'target': "C棟ユーザ収容ルータ#1",
            'classes': ["loop"],
            'weight': 1
        },

        {
            'source': "C棟ユーザ収容ルータ#2",
            'target': "C棟ユーザ収容ルータ#2",
            'classes': ["loop"],
            'weight': 1
        },

        {
            'source': "C棟ユーザ収容ルータ#1",
            'target': "C棟ユーザ収容ルータ#2",
            'label': "192.168.14.44/30",
            'weight': 1
        },

        {
            'source': "C棟コアルータ#1",
            'target': "C棟ユーザ収容ルータ#1",
            'label': "192.168.10.88/30",
            'weight': 1
        },

        {
            'source': "C棟コアルータ#2",
            'target': "C棟ユーザ収容ルータ#2",
            'label': "192.168.10.92/30",
            'weight': 5
        },
    ];
    Array.prototype.push.apply(iida.appdata.logical_routers, routers);


    x = 2;
    y = 3;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "C棟ユーザ収容ルータ#3",
            'label': "C棟ユーザ収容ルータ#3\nNCS5501\ntac-his-ur529\nloopback:172.16.14.29\nMgmt 10.100.1.98\n",
            'classes': ['router', 'logical_router', 'PE']
        },
    ];
    Array.prototype.push.apply(iida.appdata.logical_routers, routers);


    x = 2;
    y = 4;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "C棟ユーザ収容ルータ#4",
            'label': "C棟ユーザ収容ルータ#4\nNCS5501\ntac-his-ur530\nloobback:172.16.14.30\nMgmt 10.100.1.104",
            'classes': ['router', 'logical_router', 'PE']
        },

        {
            'source': "C棟ユーザ収容ルータ#3",
            'target': "C棟ユーザ収容ルータ#4",
            'label': "192.168.14.48/30",
            'weight': 1
        },

        {
            'source': "C棟ユーザ収容ルータ#3",
            'target': "C棟コアルータ#1",
            'label': "192.168.10.96/30",
            'weight': 1
        },

        {
            'source': "C棟ユーザ収容ルータ#4",
            'target': "C棟コアルータ#2",
            'label': "192.168.10.100/30",
            'weight': 5
        },
    ];
    Array.prototype.push.apply(iida.appdata.logical_routers, routers);


    x = 3;
    y = 5;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "B棟ユーザ収容ルータ#1",
            'label': "B棟ユーザ収容ルータ#1\nNCS5501\ntab-his-ur517\nloopback:172.16.14.17\nMgmt 10.100.1.44",
            'classes': ['router', 'logical_router', 'PE']
        },
    ];
    Array.prototype.push.apply(iida.appdata.logical_routers, routers);


    x = 3;
    y = 6;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "B棟ユーザ収容ルータ#2",
            'label': "B棟ユーザ収容ルータ#2\nNCS5501\ntab-his-ur518\nloopback:172.16.14.18\nMgmt 10.100.1.45",
            'classes': ['router', 'logical_router', 'PE']
        },

        {
            'source': "B棟ユーザ収容ルータ#1",
            'target': "B棟ユーザ収容ルータ#2",
            'label': "192.168.14.0/30",
            'weight': 1
        },

        {
            'source': "B棟ユーザ収容ルータ#1",
            'target': "B棟コアルータ#1",
            'label': "192.168.10.0/30",
            'weight': 1
        },

        {
            'source': "B棟ユーザ収容ルータ#2",
            'target': "B棟コアルータ#2",
            'label': "192.168.10.4/30",
            'weight': 5
        },
    ];
    Array.prototype.push.apply(iida.appdata.logical_routers, routers);


    x = 3;
    y = 7;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "B棟ユーザ収容ルータ#3",
            'label': "B棟ユーザ収容ルータ#3\nNCS5501\ntab-his-ur519\nloopback:172.16.14.19\nMgmt 10.100.1.50",
            'classes': ['router', 'logical_router', 'PE']
        },
    ];
    Array.prototype.push.apply(iida.appdata.logical_routers, routers);


    x = 3;
    y = 8;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "B棟ユーザ収容ルータ#4",
            'label': "B棟ユーザ収容ルータ#4\nNCS5501\ntab-his-ur520\nloopback:172.16.14.20\nMgmt 10.100.1.51\n",
            'classes': ['router', 'logical_router', 'PE']
        },

        {
            'source': "B棟ユーザ収容ルータ#3",
            'target': "B棟ユーザ収容ルータ#4",
            'label': "192.168.14.4/30",
            'weight': 1
        },

        {
            'source': "B棟ユーザ収容ルータ#3",
            'target': "B棟コアルータ#1",
            'label': "192.168.10.8/30",
            'weight': 1
        },

        {
            'source': "B棟ユーザ収容ルータ#4",
            'target': "B棟コアルータ#2",
            'label': "192.168.10.12/30",
            'weight': 5
        },

    ];
    Array.prototype.push.apply(iida.appdata.logical_routers, routers);


    x = 6;
    y = 2;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "C棟サービス収容ルータ#1",
            'label': "C棟サービス収容ルータ#1\nASR 9901\ntac-his-sr103\nloopback:172.16.13.3\nMgmt 10.100.1.240",
            'classes': ['router', 'logical_router', 'PE']
        },

        {
            'source': "C棟サービス収容ルータ#1",
            'target': "C棟コアルータ#1",
            'label': "192.168.16.8/30",
            'weight': 1
        },
    ];
    Array.prototype.push.apply(iida.appdata.logical_routers, routers);


    x = 6;
    y = 3;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "C棟サービス収容ルータ#2",
            'label': "C棟サービス収容ルータ#2\nASR 9901\ntac-his-sr104\nloopback:172.16.13.4\nMgmt 10.100.1.239",
            'classes': ['router', 'logical_router', 'PE']
        },

        {
            'source': "C棟サービス収容ルータ#2",
            'target': "C棟コアルータ#2",
            'label': "192.168.16.12/30",
            'weight': 5
        },

        {
            'source': "C棟サービス収容ルータ#2",
            'target': "C棟サービス収容ルータ#1",
            'label': "192.168.18.4/30",
            'weight': 1
        },
    ];
    Array.prototype.push.apply(iida.appdata.logical_routers, routers);


    x = 7;
    y = 6;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "B棟サービス収容ルータ#1",
            'label': "B棟サービス収容ルータ#1\nASR 9901\ntab-his-sr201\nloopback:172.16.13.1\nMgmt 10.100.1.242",
            'classes': ['router', 'logical_router', 'PE']
        },

        {
            'source': "B棟サービス収容ルータ#1",
            'target': "B棟コアルータ#1",
            'label': "192.168.16.0/30",
            'weight': 1
        },
    ];
    Array.prototype.push.apply(iida.appdata.logical_routers, routers);


    x = 7;
    y = 7;
    routers = [
        {
            'position': { 'x': x * x_interval, 'y': y * y_interval },
            'id': "B棟サービス収容ルータ#2",
            'label': "B棟サービス収容ルータ#2\nASR 9901\ntab-his-sr202\nloopback:172.16.13.2\nMgmt 10.100.1.241",
            'classes': ['router', 'logical_router', 'PE']
        },

        {
            'source': "B棟サービス収容ルータ#2",
            'target': "B棟コアルータ#2",
            'label': "192.168.16.4/30",
            'weight': 5
        },

        {
            'source': "B棟サービス収容ルータ#2",
            'target': "B棟サービス収容ルータ#1",
            'label': "192.168.18.0/30",
            'weight': 1
        }
    ];
    Array.prototype.push.apply(iida.appdata.logical_routers, routers);

})();
