<template>
  <div>
    <d-modal-body>
      <d-card-body class="d-flex flex-column">
        <div class="quick-post-form">
          <!-- Title -->
          <label>ProjectName: {{ projectName }}</label>
          <div class="form-group">
            <label>Http Status</label>
            <d-form-select v-model="models.responseStatus">
              <option
                v-for="(key, value) in $store.state.models.statusCore"
                :value="key"
                :key="value"
                >{{ value }}</option
              >
            </d-form-select>
          </div>
          <div class="form-group" v-if="project.projectConfig.length >= 0">
            <label>Moda Key</label>
            <d-form-select v-model="models.modalKey">
              <option
                v-for="(key, value) in project.projectConfig"
                :key="value"
                :value="key.modalKey"
              >
                {{ key.modalKey }}
              </option>
            </d-form-select>
          </div>
          <div class="form-group">
            <label>Language</label>
            <v-select
              class="form-control"
              :options="$store.state.culters"
              v-model="models.lang"
              placeholder="uz"
            ></v-select>
          </div>
          <div class="form-group">
            <label>Satus Code</label>
            <d-input
              class="form-control"
              v-model="models.statusCode"
              placeholder="status Code"
            />
          </div>
          <div class="form-group">
            <label>Switch is error</label>
            <d-checkbox inline v-model="enabled" toggle>
              <span v-if="!enabled">- 🚀🚀 Success Result! 🚀🚀</span>
            </d-checkbox>
          </div>

          <div class="form-group">
            <label>Result Message</label>

            <textarea
              plaintext="true"
              class="form-control"
              :disabled="enabled"
              v-model="models.result.message"
              aria-placeholder="Result message"
            ></textarea>
          </div>
          <div class="form-group">
            <label>Error Message</label>
            <textarea
              v-model="models.errorResult.message"
              :disabled="!enabled"
              class="form-control"
            ></textarea>
          </div>
          <div class="form-group">
            <d-button class="btn-accent" @click="addResult()"
              >Create Draft</d-button
            >
          </div>
        </div>
      </d-card-body>
    </d-modal-body>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "New Draft"
    },
    dataModal: {
      type: Object,
      default: null
    },
    projectName: {
      type: String,
      default: null
    },
    project: {
      default: {}
    }
  },
  data() {
    return {
      selected: "",
      models: {},
      enabled: false,
      update: false
    };
  },
  computed: {
    options() {
      let projects = this.$store.state.projects;
      let result = [];
      for (let i = 0; i < projects.length; i++) {
        result.push({
          value: projects[i].projectName,
          text: projects[i].projectName
        });
      }
      return result;
    }
  },
  methods: {
    addResult() {
      this.models.projectName = this.projectName;
      if (!this.update)
        this.$api.post("/home/AddMyModel", this.models).then(
          response => {
            this.$emit("addModel", response.data.result);
          },
          err => this.$store.getters.errorResult(err, this)
        );
      else this.update();
    },
    update() {
      this.$api.put("/home/UpdateModel", this.models).then(
        response => {
          console.log(resposne);
        },
        err => this.$store.getters.errorResult(err, this)
      );
    },
    createModel() {
      this.models = JSON.parse(JSON.stringify(this.$store.state.models.model));
      this.models.errorResult = JSON.parse(
        JSON.stringify(this.$store.state.models.errorResult)
      );
      this.models.result = JSON.parse(
        JSON.stringify(this.$store.state.models.result)
      );
    }
  },
  mounted() {
    this.createModel();
  }
};
</script>
