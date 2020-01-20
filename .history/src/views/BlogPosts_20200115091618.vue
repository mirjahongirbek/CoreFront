<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Components</span>
        <h3 class="page-title">Blog Posts</h3>
      </div>
    </div>

    <!-- First Row of Posts -->
    <d-row>
      <d-col
        v-for="(post, idx) in $store.state.projects"
        :key="idx"
        lg="3"
        md="6"
        sm="12"
        class="mb-4"
      >
        <d-card class="card-small card-post card-post--1">
          <div class="card-post__image">
            <d-badge
              pill
              :class="['card-post__category', 'bg-' + post.categoryTheme]"
              >{{ post.category }}</d-badge
            >
            <div class="card-post__author d-flex">
              <a
                href="#"
                class="card-post__author-avatar card-post__author-avatar--small"
                >Written by {{ post.author }}</a
              >
            </div>
          </div>
          <d-card-body>
            <h5 class="card-title">
              <a href="#" class="text-fiord-blue">{{ post.projectName }}</a>
            </h5>
            <p class="card-text d-inline-block mb-3">bpdy</p>
            <span class="text-muted">date</span>
          </d-card-body>
          <d-card-footer>
            <d-button-group>
              <d-button @click="showConfig(post)">dfvdf</d-button>
              <d-button @click="$router.push({ path: '/project/' + post.id })"
                >Go</d-button
              >
            </d-button-group>
            {{ post.id }}</d-card-footer
          >
        </d-card>
      </d-col>
    </d-row>
    {{ isShowConfig }}
    <config-modal
      :show-modal="isShowConfig"
      :config="selectConfig"
      v-model="isShowConfig"
    ></config-modal>
  </d-container>
</template>

<script>
import configModal from "../components/configModal.vue";
export default {
  data() {
    return {
      isShowConfig: false,
      selectConfig: {}
    };
  },
  components: {
    configModal
  },
  methods: {
    showConfig(key) {
      this.$store.getters
        .getProjectConfig(key.projectName, this)
        .then(response => {
          this.selectConfig = response;
          this.isShowConfig = true;
        });
    }
  }
};
</script>
