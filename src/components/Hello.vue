<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="onClick">hello</button>
    <el-button>hello</el-button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({

  })
  export default class Hello extends Vue {
    msg = 'world';

    onClick() {
      console.log(this.msg);
    }
  }
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
