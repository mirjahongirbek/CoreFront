<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
export default {
  methods: {
    getAllCulter() {
      let culters = localStorage.getItem("allCulters");
      if (culters) {
        this.$store.state.culters = JSON.parse(culters);
        return;
      }
      this.$api.get("/home/GetCulters").then(
        response => {
          console.log(response.result);
          localStorage.setItem("allCulters", JSON.stringify(response.result));
        },
        err => {}
      );
    }
  },
  mounted() {
    this.getAllCulter();
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout || "default"}-layout`;
    }
  }
};
</script>
