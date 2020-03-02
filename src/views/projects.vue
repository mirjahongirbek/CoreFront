<template>
  <d-container fluid class="main-content-container px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <br />
        <h3 class="page-title">This Project</h3>
        <br />
      </div>
    </div>
    <d-row>
      <d-col></d-col>
      <d-col lg="10" md="12" sm="12">
        <d-card>
          <d-card-header>
            <button class="item-icon-wrapper" @click="createModel()">
              <i class="material-icons">refresh</i>
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
    <br />
    <d-row>
      <d-col></d-col>
      <d-col lg="10" md="12" sm="12">
        <table class="table">
          <thead>
            <tr>
              <th>Status code</th>
              <th>
                models Status
              </th>
              <th>
                message
              </th>
              <th>
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(key, value) in myDatas" :key="value">
              <td>{{ key.statusCode }}</td>
              <td></td>
              <td>
                <div
                  v-for="(key, value, index) in key.myResult"
                  v-if="index == 0"
                  :key="key"
                >
                  {{ key }}
                </div>
              </td>
              <td>
                <d-button-group>
                  <d-button
                    @click="
                      isDeleteModal = true;
                      selectId = key.id;
                    "
                    >Remove</d-button
                  >
                  <d-button @click="edit(key)">Edit</d-button>
                </d-button-group>
              </td>
            </tr>
          </tbody>
        </table>
      </d-col>
      <d-col></d-col>
    </d-row>
    <!-- <d-modal v-if="showModal" @close="modalClose('showModal')">
      <edit-row
        :project-name="selectProject.projectName"
        :project.sync="selectProject"
        :add-model="addModel"
      ></edit-row>
    </d-modal> -->
    <d-modal v-if="isDeleteModal" @close="modalClose('isDeleteModal')">
      <d-modal-body>
        <d-card-body class="d-flex flex-column">
          <div class="quick-post-form">
            Shure Delete
          </div>
        </d-card-body>
        <d-modal-footer>
          <d-button @click="remove()">Delete</d-button>
        </d-modal-footer>
      </d-modal-body>
    </d-modal>
  </d-container>
</template>
<script>
// import editRow from "../components/project/editRow.vue";
export default {
  components: {
    // editRow
  },
  data() {
    return {
      query: {
        id: "",
        offset: 0,
        limit: 150
      },
      tempReq: {
        lang: "uz",
        text: ""
      },
      models: {},
      myData: [],
      showModal: false,
      selectProject: {},
      selectId: "",
      isDeleteModal: false
    };
  },
  methods: {
    delField(key) {
      delete this.models.myResult[key];
    },
    addResult() {
      this.models.statusCode = parseInt(this.models.statusCode);
      if (this.models.id) {
        this.updateModels();
      }
      this.models.projectName = this.selectProject.projectName;

      this.$api.post("/home/AddMyModel", this.models).then(
        response => {
          this.createModel();
          this.myData.push(response.result);
        },
        err => this.$store.getters.errorResult(err, this)
      );
    },
    updateModels() {
      this.$api.put("/home/UpdateModel", this.models).then(
        response => {
          this.createModel();
        },
        err => {
          this.$store.getters.errorResult(err, this);
        }
      );
    },
    replaceModel(model) {
      for (let i = 0; i < this.myData.length; i++) {}
    },
    addNewStr() {
      if (!this.tempReq.lang) {
        alert("lang is Req");
        return;
      }
      let temp = JSON.parse(JSON.stringify(this.tempReq));
      this.models.myResult[temp.lang] = temp.text;
      this.tempReq.lang = "uz";
      this.tempReq.text = "";
    },
    remove() {
      this.$api.delete("/home/Delete?id=" + this.selectId).then(
        response => {
          for (let i = 0; i < this.myData.length; i++) {
            if (this.myData[i].id == this.selectId) {
              this.myData.splice(i, 1);
              break;
            }
          }
        },
        err => this.$store.getters.errorParse(err, this)
      );
    },
    addModel(model) {
      this.myData.push(model);
    },
    modalClose(name) {
      this[name] = false;
    },
    edit(key) {
      this.models = JSON.parse(JSON.stringify(key));
      // this.showModal = true;
    },
    getData() {
      this.$api.post("/admin/MonitorBy", this.query).then(
        response => {
          this.myData = response.result;
        },
        err => this.$store.getters.errorParse(err, this)
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
    let id = this.$route.params.id;
    this.id = id;
    this.query.id = id;
    let selectProject = this.$store.state.projects.firstOrDefault(
      m => m.id == this.id
    );
    this.createModel();
    this.selectProject = selectProject;
    this.getData();
  },
  computed: {
    myDatas() {
      return this.myData.reverse();
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
  }
};
</script>
