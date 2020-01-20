<template>
  <d-card class="card-small h-100">
    <!-- Component Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">{{ title }}</h6>
    </d-card-header>
    <d-card-body class="d-flex flex-column">
      <div class="quick-post-form">
        <!-- Title -->
        <label>ProjectName: {{ projectName }}</label>
        <div class="form-group" v-if="!projectName">
          <d-form-select
            class="form-control"
            v-model="models.projectName"
            :options="options"
          />
        </div>
        <div class="form-group">
          <d-form-select v-model="models.responseStatus">
            <option
              v-for="(key, value) in $store.state.models.statusCore"
              :value="key"
              :key="value"
              >{{ value }}</option
            >
          </d-form-select>
        </div>
        <div class="form-group">
          <v-select
            class="form-control"
            :options="$store.state.culters"
            v-model="models.lang"
            placeholder="uz"
          ></v-select>
        </div>
        <div class="form-group">
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
          {{ models.result.message }}
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
  </d-card>
</template>

<script>
export default {
  name: "new-draft",
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
    culters() {
      let culters = this.$store.state.culters;
      for (var i = 0; i < culters.length; i++) {}
    },
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
      if (!this.update)
        this.$api.post("/home/AddMyModel", this.models).then(
          response => {},
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
  created() {
    if (this.dataModal) {
      this.models = JSON.parse(JSON.stringify(this.dataModal));
      console.log(this.models);
      this.update = true;
    } else this.createModel();
    if (this.projectName) this.models.projectName = this.projectName;
  },
  watch: {
    dataModal: function(val) {
      if (val) {
        this.models = val;
        this.update = true;
      } else {
        this.createModel();
      }
    }
  }
};
</script>
