/* global iida */

(function () {

  // 'width', 'height' and 'preserveAspectRatio' are mandatory attributes in <svg>
  // preserveAspectRatio="xMidYMid meet" width="100" height="100"

  // from https://heroicons.dev/
  let svgCloud = '<svg preserveAspectRatio="xMidYMid meet" width="100" height="100" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>';
  svgCloud = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg>' + svgCloud;
  svgCloud = 'data:image/svg+xml;utf-8,' + svgCloud;
  iida.appdata.svgCloud = encodeURI(svgCloud);

  let svgRouter = '<svg preserveAspectRatio="xMidYMid meet" width="100" height="100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 41" fill="#fff" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round"><use xlink:href="#A" x=".5" y=".5"/><symbol id="A" overflow="visible"><use xlink:href="#C" stroke="none" fill="#0e6f9c"/><use xlink:href="#C" stroke="#fff" stroke-linejoin="miter" fill="none" stroke-width=".788"/><use xlink:href="#D" stroke="none" fill="#0e6f9c"/><use xlink:href="#D" stroke="#fff" stroke-linejoin="miter" fill="none" stroke-width=".788"/><path d="M22.448 7.081l2.363 3.544-9.056 1.969 1.969-1.575L3.942 8.656 7.486 5.9l13.388 2.362 1.575-1.181zm12.994 8.662L33.473 12.2l8.269-1.969-1.181 1.575 13.388 2.362-3.15 2.363-13.781-2.363-1.575 1.575zM30.717 5.113l9.056-2.362.394 3.544-2.363-.394-4.331 3.938-4.331-.787 4.331-3.544-2.756-.394zM26.78 19.288l-8.662 1.575-.394-4.331 2.756.787 4.725-4.331 4.331.787-5.119 4.725 2.362.788z" stroke="none"/></symbol><defs ><path id="C" d="M58.274 11.419c0 6.3-12.994 11.419-29.137 11.419S0 17.719 0 11.419v16.537c0 6.3 12.994 11.419 29.137 11.419s29.137-5.119 29.137-11.419z"/><path id="D" d="M29.137 22.837c16.144 0 29.137-5.119 29.137-11.419S45.281 0 29.137 0 0 5.119 0 11.419s12.994 11.419 29.137 11.419z"/></defs></svg>';
  svgRouter = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg>' + svgRouter;
  svgRouter = 'data:image/svg+xml;utf-8,' + svgRouter;
  iida.appdata.svgRouter = encodeURI(svgRouter);

})();
