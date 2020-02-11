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
          <div
            class="card-post__image"
            :style="'background-image:url(' + post.imageUrl + ')'"
          >
            <d-badge
              pill
              :class="['card-post__category', 'bg-' + post.categoryTheme]"
              >{{ post.category }}</d-badge
            >
          </div>
          <d-card-body>
            <h5 class="card-title">
              <a href="#" class="text-fiord-blue"
                >Project Name: {{ post.projectName }}</a
              >
            </h5>
            <p class="card-text d-inline-block mb-3">
              {{ post.projectDescription }}
            </p>
            <span class="text-muted"></span>
          </d-card-body>
          <d-card-footer>
            <d-button-group>
              <d-button @click="$router.push({ path: '/myProject/' + post.id })"
                >Change</d-button
              >
              <d-button @click="showConfig(post)">Config</d-button>
              <d-button @click="$router.push({ path: '/project/' + post.id })"
                >Go Results</d-button
              >
            </d-button-group>
          </d-card-footer>
        </d-card>
      </d-col>
    </d-row>

    <config-modal
      :show-modal="isShowConfig"
      :config="selectConfig"
      v-model="isShowConfig"
    ></config-modal>
    <d-modal v-if="isShowProject" @close="closeModel('isShowProject')">
      <d-modal-header></d-modal-header>
      <d-modal-body>
        <d-card-body>
          <div class="form-group">
            <label> Project Name</label>
            <d-input v-model="newProject.projectName" class="mb-2" />
          </div>
          <div class="form-group">
            <label>Project Description</label>
            <d-input class="mb-2" v-model="newProject.description"></d-input>
          </div>
          <div class="form-group">
            <label>User Name</label>
            <d-input class="mb-2" v-model="newProject.userName"></d-input>
          </div>
          <div class="form-group">
            <label>Password</label>
            <d-input class="mb-2" v-model="newProject.password"></d-input>
          </div>
        </d-card-body>

        <d-modal-footer>
          <d-button-group>
            <d-button @click="closeModel('isShowProject')">Cancel</d-button>
            <d-button @click="updateProject()">Ok</d-button>
          </d-button-group>
        </d-modal-footer>
      </d-modal-body>
    </d-modal>
  </d-container>
</template>

<script>
import configModal from "../components/configModal.vue";
export default {
  data() {
    return {
      isShowConfig: false,
      selectConfig: {},
      isShowProject: false,
      newProject: {}
    };
  },
  components: {
    configModal
  },
  methods: {
    statusResult(key) {
      console.log(key);
      this.$store.getters.getProjectStatus(key.id, this).then(
        response => {
          console.log(response);
        },
        err => this.$store.getters.errorParse(err, this)
      );
    },
    selectProject(project) {
      this.newProject = project;
      this.isShowProject = true;
    },
    updateProject() {
      this.$store.getters.updateProject(this.newProject, this);
    },
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
