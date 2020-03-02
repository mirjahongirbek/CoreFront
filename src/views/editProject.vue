<template>
  <d-container fluid class="main-content-container px-4">
    <br /><br /><br />
    <d-row>
      <d-col cols="12" md="1" lg="2"></d-col>
      <d-col cols="12" md="10" lg="8">
        <d-card>
          <d-card-header
            >Edit Project
            <d-button
              @click="
                confIndex = -1;
                showModal = true;
              "
              >+</d-button
            >
          </d-card-header>
          <d-card-img
            @click="showFileModal()"
            style="width: 100%"
            :src="project.imageUrl"
          />
          <input
            id="changeFile"
            v-on:change="changeFile()"
            type="file"
            ref="file"
          />
          <d-card-body :title="project.projectName">
            <d-form>
              <label>Project Name</label>
              <d-input v-model="project.projectName"></d-input>
              <label>Project Description</label>
              <d-input v-model="project.projectDescription"></d-input>
              <br />
              <label>isCheckUser</label>
              <d-checkbox inline v-model="enabled" toggle
                >Enable Rockets
                <span v-if="enabled">- 🚀🚀 Rockets enabled! 🚀🚀</span>
              </d-checkbox>
              <d-form inline>
                <label class="sr-only" for="f1_Username">Username</label>
                <d-input
                  id="f1_Username"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  placeholder="Username"
                />
                <label class="sr-only" for="f1_Password">Password</label>
                <d-input
                  id="f2_Password"
                  class="mr-2"
                  type="password"
                  placeholder="Password"
                />
              </d-form>
            </d-form>
            <br /><br />

            <d-list-group>
              <d-list-group-item
                v-for="key in project.projectConfig"
                :key="key"
              >
                <d-form inline>
                  <label for="f1_Username">Key</label>
                  <d-input
                    id="f1_Username"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    placeholder="Key"
                    v-model="key.key"
                    disabled
                  />
                  <label for="f1_Password">Value</label>
                  <d-input
                    id="f2_Password"
                    v-model="key.value"
                    class="mr-2"
                    disabled
                    placeholder="Value"
                  />
                  <label for="modalKey">Modal Key</label>
                  <d-input
                    id="modalKey"
                    v-model="key.modalKey"
                    disabled
                    class="mr-2"
                    placeholder="Modal Key"
                  />
                </d-form>
              </d-list-group-item>
            </d-list-group>
          </d-card-body>
          <d-card-footer
            ><d-button-group>
              <d-button>Cancel</d-button>
              <d-button> .</d-button>
              <d-button @click="updateProject()">Save</d-button>
            </d-button-group></d-card-footer
          >
        </d-card>
      </d-col>
      <d-col cols="12" md="1" lg="2"></d-col>
    </d-row>
    <d-modal v-if="showModal">
      <d-modal-header>
        <d-modal-title>Header</d-modal-title>
      </d-modal-header>
      <d-modal-body>
        <d-form>
          <br />
          <label for="f1_Username">Key</label>
          <d-form-select v-model="projectConf.key" :options="keyOtions" />
          <br />
          <label for="f1_Password">Value</label>
          <d-input
            id="f2_Password"
            class="mr-2"
            v-model="projectConf.value"
            placeholder="Value"
          /><br />
          <label>Modal Key</label>
          <d-input
            id="modalKey"
            v-model="projectConf.modalKey"
            class="mr-2"
            placeholder="Modal Key"
          />
        </d-form>
        <br />
        <d-btn @click="saveInfo()">Save</d-btn>
      </d-modal-body>
    </d-modal>
  </d-container>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      keyOtions: [{ value: "ip", text: "Po IpAddress" }],
      showModal: false,
      project: {},
      confIndex: -1,
      projectConf: {}
    };
  },
  methods: {
    updateProject() {
      this.$store.getters.updateProject(this.project, this).then(response => {
        console.log(response);
      });
    },
    changeFile() {
      let file = this.$refs.file.files[0];
      var req = new FormData();
      req.append("id", this.id);
      req.append("file", file);
      this.$api.post("/project/AddImage", req).then(
        response => {
          alert("success");
        },
        err => this.$store.getters.errorParse(err, this)
      );
    },
    showFileModal() {
      let inp = document.getElementById("changeFile");
      inp.click();
    },
    saveInfo() {
      this.showModal = false;
      if (this.confIndex < 0) {
        this.project.projectConfig.push(this.projectConf);
        this.showModal = false;
        return;
      }
      this.project.projectConfig[this.confIndex] = JSON.parse(
        JSON.stringify(this.projectConf)
      );
    }
  },
  mounted() {
    let id = this.$route.params.id;
    this.id = id;
    this.$store.getters.getProjects(this).then(projects => {
      this.project = projects.firstOrDefault(m => m.id == id);
    });
  }
};
</script>
