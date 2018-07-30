<template>
  <Window title="First window" width="640" height="320" margined v-on:show="show" menu="true" v-on:close="exit">
    <Box>
    <Group stretchy title=" First form " margined width="200" height="200">
      <Box vertical padded>
            <Form label="Form" padded>
              <TextInput label="Name:" v-model="name"/>
              <TextInput label="Phone:" v-model="phone"/>
              <DropdownList stretchy v-bind:items="districts" v-model="item"/>
              <TextInput label="Email:" v-model="email"/>
              <Button @click="Submit">Save</Button>
            </Form>

        <!-- <Button @click="showModal" style="bgcolor:green;">Click me</Button> -->
      </Box>
    </Group>
    </Box>  
  </Window>
</template>

<script>
  import libui from 'libui-node'
  import Vue from 'vuido'
  import WaitWindow from './WaitWindow'
  import crud from '../db/crud'

  export default {
    data() {
      return {
        text: 'Text input',
        name: 'Donald Trump',
        phone:'+1 123 456 6789',
        email:'trump@whitehouse.usa',
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
      // showModal(){
      //   let customer = crud.findByPhone(this.phone);
      //   let ww = new Vue({
      //       render: h=>h('<template><Window v-bind:title="title" width="100" height="100" margined v-on:show="show" v-on:close="exit"><Box><Group stretchy title="Input Widgets" margined width="200" height="200"><Box vertical padded><Text> {{name}}</Text><Button @click="exit" >Close</Button></Box></Group></Box></Window></template>',
      //       {data:{name:customer[0].name}})
      //   });      
      //   // ww.title = customer.name;
      //   console.log(ww.$root._data, customer[0].name);
      //   ww.$mount();
      //   console.log("Click");
      // },
      exit() {
        libui.stopLoop();
      }
    }
  }
</script>