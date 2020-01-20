<template>
  <d-card class="card-small h-100">
    <!-- Component Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">{{ title }}</h6>
    </d-card-header>
    <d-card-body class="d-flex flex-column">
      <div class="quick-post-form">
        <label>{{config}}</label>
        <label>ProjectName: {{projectName}}</label>
        <div class="form-group">
          <v-jsoneditor v-model="config.config" :plus="false" height="400px" @error="onError" />
        </div>
        <div class="form-group">
          <d-button class="btn-accent" @click="addResult()">Create Draft</d-button>
        </div>
      </div>
    </d-card-body>
  </d-card>
</template>
<script>
import VJsoneditor from "v-jsoneditor/src/index";
export default {
  name: "config-Draft",
  components: {
    VJsoneditor
  },
  props: {
    show: {
      type: Boolean
    },
    projectName: {
      type: String,
      default: null
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      json: {
        hello: "vue"
      },
      selected: "",
      models: {},
      enabled: false,
      update: false,
      config: {}
    };
  },
  methods: {
    addResult() {
      console.log(this.config);
      this.$api.put("/config/Update", this.config).then(
        response => {
          console.log(response);
        },
        err => this.$store.getters.erroParse(err, this)
      );
    },
    onJsonChange(e) {
      console.log(e);
    },
    getConfig() {
      this.$store.getters
        .getProjectConfig(this.projectName, this)
        .then(resolve => {
          console.log(resolve);
          this.config = resolve;
        });
    }
  },
  created() {
    this.getConfig();
  },
  watch: {
    isShow: function(val) {
      if (val) {
        this.getConfig();
      }
    }
  }
};
</script>