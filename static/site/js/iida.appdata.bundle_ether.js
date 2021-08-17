/* global iida */

(function () {
  iida.appdata.bundleEthers = [
    {
      id: 'C棟ユーザPE#1#2_BE1000',
      label: 'Bundle-Ether1000',
      ports: [
        'C棟ユーザ収容ルータ#1Te0/0/0/0',
        'C棟ユーザ収容ルータ#1Hu0/0/1/4',
        'C棟ユーザ収容ルータ#2Te0/0/0/0',
        'C棟ユーザ収容ルータ#2Hu0/0/1/4',
      ],
    },

    {
      id: 'C棟ユーザPE#3#4_BE1000',
      label: 'Bundle-Ether1000',
      ports: ['C棟ユーザ収容ルータ#3Te0/0/0/0', 'C棟ユーザ収容ルータ#4Te0/0/0/0'],
    },

    {
      id: 'B棟ユーザPE#1#2_BE1000',
      label: 'Bundle-Ether1000',
      ports: ['B棟ユーザ収容ルータ#1Te0/0/0/0', 'B棟ユーザ収容ルータ#2Te0/0/0/0'],
    },

    {
      id: 'B棟ユーザPE#3#4_BE1000',
      label: 'Bundle-Ether1000',
      ports: ['B棟ユーザ収容ルータ#3Te0/0/0/0', 'B棟ユーザ収容ルータ#4Te0/0/0/0'],
    },

    {
      id: 'C棟サービスPE#1#2_BE1010',
      label: 'Bundle-Ether1010',
      ports: ['C棟サービス収容ルータ#1G0/0/0/10', 'C棟サービス収容ルータ#2G0/0/0/10'],
    },

    {
      id: 'B棟サービスPE#1#2_BE1009',
      label: 'Bundle-Ether1009',
      ports: ['B棟サービス収容ルータ#1G0/0/0/9', 'B棟サービス収容ルータ#2G0/0/0/9'],
    },
  ];
})();
