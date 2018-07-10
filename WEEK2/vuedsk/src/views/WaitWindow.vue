<template>
  <Window v-bind:title="title" width="500" height="300" margined v-on:show="show" v-on:close="exit">
    <Box>
      <Group v-for='(val,ind) in arr' title="Input Widgets" margined width="200">
        <Box horizontal padded >
          <Text width="100"> {{cust}}</Text>
          <Text width="200"> {{name}}</Text>
          <Button @click="edit" >Edit</Button>
        </Box>
      </Group>
      <Group margined width="200" height="20">
        <Box horizontal stretchy padded>
          <Button @click="add" >Add</Button>
          <Button @click="exit" >Exit</Button>
        </Box>
      </Group>
    </Box>  
  </Window>
</template>

<script>
  import wlibui from 'libui-node'
  // import Vue from 'vuido'
  // import Vuex from 'vuex'
  
  // Vue.use(Vuex);
  
  export default {
    data() {
      return {
        name: 'Text input',
        title: 'Wait Window',
        cust: 'customer',
        arr: []
      };
    },
    computed: {
      customer: function (){
        return this.$store.state.counter;
      }
    },
    methods: {
      ToggleBorder(){
        console.log(this.$root.$el.childNodes[0].childNodes[0].attributes.title);
        this.$root.$el.childNodes[0].childNodes[0].attributes.title="Is it work?";
      },
      show(){
        // console.log(this.$root.$el.attributes);
      },
      edit() {
        console.log('Edit click');
      },
      add() {
        this.cust=this.$store.state.customer[0].name;
        console.log(this.cust);
        this.arr.push(this.arr.length);
      },
      exit() {
        this.$root.$destroy()
      }
    }
  }
</script>