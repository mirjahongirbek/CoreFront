<template>
  <d-row>
    <d-col></d-col>
    <d-col lg="10" md="12" sm="12">
      <d-card>
        <d-card-header>
          <button class="item-icon-wrapper" @click="createModel()">
            <i class="material-icons">refresh</i>
            Update
          </button>
        </d-card-header>
        <d-card-body class="d-flex flex-column">
          <div class="quick-post-form">
            <d-row>
              <d-col lg="4">
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

                <div
                  class="form-group"
                  v-if="selectProject.projectConfig.length >= 0"
                >
                  <label>Moda Key</label>
                  <d-form-select v-model="models.modalKey">
                    <option
                      v-for="(key,
                      value) in selectProject.projectConfig.groupBy(
                        m => m.modalKey
                      )"
                      :key="value"
                      :value="key.group"
                    >
                      {{ key.group }}
                    </option>
                  </d-form-select>
                </div>

                <div class="form-group"></div>
                <div class="form-group">
                  <label>Satus Code</label>
                  <d-input
                    class="form-control"
                    v-model="models.statusCode"
                    placeholder="status Code"
                  />
                </div>
              </d-col>
              <d-col lg="8">
                <d-row>
                  <d-col lg="4">
                    <label>Language</label>
                    <v-select
                      :options="$store.state.culters"
                      v-model="tempReq.lang"
                      placeholder="uz"
                    ></v-select>
                  </d-col>
                  <d-col lg="6">
                    <label>Text</label>
                    <d-input v-model="tempReq.text" class="mb-2" />
                  </d-col>
                  <d-col>
                    <label>...................</label>
                    <d-button @click="addNewStr()">Add</d-button></d-col
                  >
                </d-row>
                <d-row v-for="(key, value) in models.myResult" :key="value">
                  <d-col lg="4"> {{ value }} </d-col>
                  <d-col lg="6">
                    <d-input v-model="models.myResult[value]" class="mb-2" />
                  </d-col>
                  <d-col>
                    <d-button
                      outline
                      squared
                      theme="danger"
                      @click="delField(value)"
                      >Del</d-button
                    >
                  </d-col>
                </d-row>
              </d-col>
            </d-row>
          </div>
        </d-card-body>
        <d-card-footer>
          <d-button
            outline
            squared
            theme="success"
            @click="addResult()"
            size="lg"
            >Save</d-button
          >
        </d-card-footer>
      </d-card>
    </d-col>
    <d-col></d-col>
  </d-row>
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
    selectProject: {
      default: {}
    },
    updateMymodal: {
      default: null
    }
  },
  data() {
    return {
      selected: "",
      models: {},
      enabled: false,
      update: false,
      tempReq: {
        lang: "uz",
        text: ""
      }
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
      this.models.statusCode = parseInt(this.models.statusCode);
      if (this.models.id) {
        this.updateModels();
      }
      this.models.projectName = this.selectProject.projectName;
      this.$api.post("/home/AddMyModel", this.models).then(
        response => {
          this.createModel();
          if (response.result) {
            this.$emit("addResult", response.result);
          }
          this.myData.push(response.result);
        },
        err => this.$store.getters.errorResult(err, this)
      );
    },
    updateModels() {
      this.$api.put("/home/UpdateModel", this.models).then(
        response => {
          this.createModel();
          this.$emit("updateModal", this.models);
        },
        err => {
          this.$store.getters.errorResult(err, this);
        }
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
  watch: {
    updateMymodal: function(val) {
      this.models = JSON.parse(JSON.stringify(val));
    }
  },
  mounted() {
    this.createModel();
  }
};
</script>
