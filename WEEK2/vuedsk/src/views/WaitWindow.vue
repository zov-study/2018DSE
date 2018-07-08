<template>
  <Window v-bind:title="title" width="500" height="300" margined v-on:show="show" v-on:close="exit">
    <Box>
      <Group v-for='(val,ind) in arr' title="Input Widgets" margined width="200">
        <Box horizontal padded >
          <Text width="100"> {{val+1}}</Text>
          <Text width="200"> {{name}}</Text>
          <Button @click="edit" >Edit</Button>
        </Box>
      </Group>
        <Box horizontal padded>
          <Button @click="add" >Add</Button>
          <Button @click="exit" >Exit</Button>
        </Box>
    </Box>  
  </Window>
</template>

<script>
  import wlibui from 'libui-node'

  export default {
    data() {
      return {
        name: 'Text input',
        title: 'Wait Window',
        arr: []
      };
    },
    computed: {
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
        console.log(this.arr.length);
        this.arr.push(this.arr.length);
      },
      exit() {
        this.$root.$destroy()
      }
    }
  }
</script>