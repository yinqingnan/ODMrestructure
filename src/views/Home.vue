<template>
  <div class="home">
    <Header />
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "../Layout/Header";
export default {
  name: "Home",
  components: {
    Header
  }
};
</script>
<style lang="less"></style>
