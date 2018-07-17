import libui from 'libui-node';
import Vue from 'vuido';
import Vuex from 'vuex';

Vue.use(Vuex);

import MainWindow from './ui/MainWindow';

const store = new Vuex.Store({
  state: {
    customer : 'OZ',
    counter: 10,
    error:0
  },
  getters:{
    counter: state=>state.counter,
    customer: state=>state.customer,
    error:  state=>state.error
  },
  mutations:{
    setcustomer: (state,customer)=>{
      console.log(state);
      state.customer=customer;
    },
    seterror: (state,error)=>{
      console.log(state);
      state.error=error;
    }

  }
});

const window = new Vue( {
  render: h => h( MainWindow ),
  store: store
} );

window.$mount();

libui.startLoop();
