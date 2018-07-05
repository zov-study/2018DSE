<template>
  <Window v-bind:title="title" width="100" height="100" margined v-on:show="show" v-on:close="exit">
    <Box>
    <Group stretchy title="Input Widgets" margined width="200" height="200">
      <Box vertical padded>
        <Text> {{text}}</Text>
        <Button @click="ToggleBorder" value="QQQQ"></Button>
      </Box>
    </Group>
    </Box>  
  </Window>
</template>

<script>
  import wlibui from 'libui-node'

  export default {
    data() {
      return {
        text: 'Text input',
        title: 'Wait Window',
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
        console.log(this.$root.$el.attributes);
      },
      exit() {
        this.$root.$destroy()
      }
    }
  }
</script>