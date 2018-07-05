<template>
  <Window width="1000" height="480" margined v-on:show="show" menu="true" v-on:close="exit">
    <Box>
    <Group stretchy title="Input Widgets" margined width="200" height="200">
      <Box vertical padded>
            <Form label="Form" padded>
              <TextInput label="First name:" v-model="name"/>
              <TextInput label="Phone:" v-model="phone"/>
              <DropdownList stretchy v-bind:items="districts" v-model="item"/>
              <TextInput label="Email:" v-model="email"/>
              <!-- <Spinbox label="Age:" min="1" max="99"/> -->
              <Button @click="Submit">Submit</Button>
            </Form>

        <Button @click="showModal" style="bgcolor:green;">Click me</Button>
      </Box>
    </Group>
    </Box>  
  </Window>
</template>

<script>
  import libui from 'libui-node'
  import Vue from 'vuido'
  import WaitWindow from './WaitWindow'

  export default {
    data() {
      return {
        text: 'Text input',
        name: 'Vasia',
        phone:'',
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
        item: 25,
        email:''
      };
    },
    computed: {
    },
    methods: {
      Submit(){
        console.log(this.districts[this.item]);
      },
      show(){
        console.log("Main window");
      },
      showModal(){
        let ww = new Vue({
            render: h=>h(WaitWindow)
        });      
        ww.$mount();
        console.log("Click");
      },
      exit() {
        libui.stopLoop();
      }
    }
  }
</script>