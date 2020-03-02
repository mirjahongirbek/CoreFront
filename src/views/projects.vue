<template>
  <d-container fluid class="main-content-container px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <br />
        <h3 class="page-title">This Project</h3>
        <br />
      </div>
    </div>
    <edit-row
      :selectProject="selectProject"
      v-bind:update-mymodal="models"
      @update-modal="updateModal"
      @add-project="addModal"
    ></edit-row>

    <br />
    <d-row>
      <d-col></d-col>
      <d-col lg="10" md="12" sm="12">
        <table class="table">
          <thead>
            <tr>
              <th>Status code</th>

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
import editRow from "../components/project/editRow.vue";
export default {
  components: {
    editRow
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
    addModal(model) {
      this.models.push(model);
    },
    updateModal(model) {
      for (let i = 0; i < this.models.length; i++) {
        if (this.models[i].id == model.id) {
          this.models[i] = model;
        }
      }
    },
    delField(key) {
      delete this.models.myResult[key];
    },
    // addResult() {
    //   this.models.statusCode = parseInt(this.models.statusCode);
    //   if (this.models.id) {
    //     this.updateModels();
    //   }
    //   this.models.projectName = this.selectProject.projectName;

    //   this.$api.post("/home/AddMyModel", this.models).then(
    //     response => {
    //       this.createModel();
    //       this.myData.push(response.result);
    //     },
    //     err => this.$store.getters.errorResult(err, this)
    //   );
    // },
    // updateModels() {
    //   this.$api.put("/home/UpdateModel", this.models).then(
    //     response => {
    //       this.createModel();
    //     },
    //     err => {
    //       this.$store.getters.errorResult(err, this);
    //     }
    //   );
    // },
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
    }
  },

  created() {
    let id = this.$route.params.id;
    this.id = id;
    this.query.id = id;
    let selectProject = this.$store.state.projects.firstOrDefault(
      m => m.id == this.id
    );

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
