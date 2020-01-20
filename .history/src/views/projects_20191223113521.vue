<template>
  <d-container fluid class="main-content-container px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Components</span>
        <h3 class="page-title">Blog Posts</h3>
        <d-button @click="showModal = true">Primary</d-button>
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
                  <d-button @click="isDeleteModal = true">Remove</d-button>
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
      <edit-row :project-name="selectProject.projectName"></edit-row>
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
        <d-button @click="remove()">selectId</d-button>
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
      selectId: ""
    };
  },
  methods: {
    remove() {
      console.log(this.selectId);
    },
    modalClose() {
      this.showModal = false;
    },
    edit(key) {
      console.log(key);
      this.showModal = true;
    },
    getData() {
      this.$api.post("/admin/MonitorBy", this.query).then(
        response => {
          console.log(response);
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
