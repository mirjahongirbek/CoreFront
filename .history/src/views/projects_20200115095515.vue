<template>
  <d-container fluid class="main-content-container px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <br />
        <h3 class="page-title">This Project</h3>
        <br />
        <d-button @click="showModal = true">Add New Result</d-button>
      </div>
    </div>
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
            <tr v-for="(key, value) in myData" :key="value">
              <td>{{ key.statusCode }}</td>
              <td></td>
              <td>
                <div v-if="key.responseStatus == 200">
                  {{ key.result.message }}
                </div>
                <div v-else>
                  {{ key.errorResult.message }}
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
    <d-modal v-if="showModal" @close="modalClose('showModal')">
      <edit-row
        :project-name="selectProject.projectName"
        :add-model="addModel"
      ></edit-row>
    </d-modal>
    <d-modal v-if="isDeleteModal" @close="modalClose('isDeleteModal')">
      <d-modal-body>
        <d-card>
          <d-card-body class="d-flex flex-column">
            <div class="quick-post-form">
              Shoure Delete
            </div>
          </d-card-body>
        </d-card>
        <d-button @click="remove()">Delete</d-button>
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
        limit: 40
      },
      myData: [],
      showModal: false,
      selectProject: {},
      selectId: "",
      isDeleteModal: false
    };
  },
  methods: {
    remove() {
      this.$api.delete("/home/Delete?id=" + this.selectId).then(
        response => {
          console.log(response);
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
      this.showModal = true;
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
  mounted() {
    let id = this.$route.params.id;
    this.id = id;
    this.query.id = id;
    let selectProject = this.$store.state.projects.firstOrDefault(
      m => m.id == this.id
    );
    this.selectProject = selectProject;

    this.getData();
  }
};
</script>
