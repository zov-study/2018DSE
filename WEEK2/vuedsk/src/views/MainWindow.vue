<template>
  <Window v-bind:title='title' width="1000" height="480" margined v-on:show="show" menu="true" v-on:close="exit">
    <Box>
    <Group stretchy title="Input Widgets" margined width="200" height="200">
      <Box vertical padded>
            <Form label="Form" padded>
              <TextInput label="First name:" v-model="name"/>
              <TextInput label="Phone:" v-model="phone"/>
              <DropdownList stretchy v-bind:items="districts" v-model="item"/>
              <TextInput label="Email:" v-model="email"/>
              <TextInput label="Counter:" v-model="counter"/>
              <!-- <Spinbox label="Age:" min="1" max="99"/> -->
              <Button @click="Submit">Submit</Button>
            </Form>

        <Button @click="showModal" style="bgcolor:green;">Click me</Button>
        <Button @click="showTemplate" style="bgcolor:green;">Show Template</Button>
      </Box>
    </Group>
    </Box>  
  </Window>
</template>

<script>
  import libui from 'libui-node'
  import Vue from 'vuido'
  import Vuex from 'vuex';
  import WaitWindow from './WaitWindow'
  import crud from '../db/crud'
  
  Vue.use(Vuex);

  export default {
    data() {
      return {
        title:'Main window',
        text: 'Text input',
        name: 'Vasia',
        phone:'464646464',
        email:'asd@bsd.com',
        districts: ['Arch Hill',
                  'Auckland CBD',
                  'Avondale',
                  'Blockhouse Bay',
                  'Balmoral',
                  'Eden Terrace',
                  'Eden Valley',
                  'Ellerslie',
                  'Epsom',
                  'Freemans Bay',
                  'Glendowie',
                  'Glen Innes',
                  'Grafton',
                  'Greenlane',
                  'Greenwoods Corner',
                  'Grey Lynn',
                  'Herne Bay',
                  'Hillsborough',
                  'Kingsland',
                  'Kohimarama',
                  'Lynfield',
                  'Meadowbank',
                  'Mission Bay',
                  'Morningside',
                  'Mount Albert',
                  'Mount Eden',
                  'Mount Roskill',
                  'Mount Wellington',
                  'Newmarket',
                  'Newton',
                  'New Windsor',
                  'Onehunga',
                  'One Tree Hill',
                  'Orakei',
                  'Oranga',
                  'Owairaka',
                  'Panmure',
                  'Parnell',
                  'Penrose',
                  'Point England',
                  'Point Chevalier',
                  'Ponsonby',
                  'Remuera',
                  'Royal Oak',
                  'Saint Heliers',
                  'Saint Johns',
                  'Saint Marys Bay',
                  'Sandringham',
                  'Stonefields',
                  'Tamaki',
                  'Te Papapa',
                  'Three Kings',
                  'Waikowhai',
                  'Waterview',
                  'Western Springs',
                  'Westfield',
                  'Westmere'],
        item: 25
      };
    },
    computed: {
          counter: function() {
            return this.$store.state.counter
          }
    },
    methods: {
      Submit(){
        let customer = {
            name: this.name,
            phone: this.phone,
            district:this.districts[this.item],
            email: this.email,
            date: Date.now()
        };
        crud.newCustomer(customer);
      },
      show(){
        console.log("Main window");
      },
      showModal(){
        this.$store.commit('setcustomer', crud.findByPhone(this.phone));
        let ww = new Vue({
            render: h=>h(WaitWindow),
            store: this.$store
        });      
        ww.$mount();
        console.log("Click");
      },
      showTemplate(){
        console.log(this.$store.state.counter);
      },
      exit() {
        libui.stopLoop();
      }
    }
  }
</script>