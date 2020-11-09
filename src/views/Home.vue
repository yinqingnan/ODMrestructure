<template>
  <div class="home">
    <Header />
    <div class="sHome">
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
<style lang="less">
.home {
  width: 100%;
  height: 100%;
}
.sHome {
  height: calc(100% - 74px);
}
</style>
