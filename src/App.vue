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
          localStorage.setItem("allCulters", JSON.stringify(response.result));
        },
        err => this.$store.getters.errorParse(err, this)
      );
    }
  },
  mounted() {
    this.getAllCulter();
    this.$store.getters.getProjects(this);
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout || "default"}-layout`;
    }
  }
};
</script>
