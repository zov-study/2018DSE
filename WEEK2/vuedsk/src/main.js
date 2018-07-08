import libui from 'libui-node';
import Vue from 'vuido';

import MainWindow from './views/MainWindow';

const window = new Vue( {
  render: h => h( MainWindow )
} );

window.$mount();

libui.startLoop();
