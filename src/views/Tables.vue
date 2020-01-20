<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Data Tables</h3>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <d-button @click="show('editModal')">Add</d-button>
      </div>
    </div>
    <!-- Default Light Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom">
            <h6 class="m-0">Active Users</h6>
          </div>
          <div class="card-body p-0 pb-3 text-center">
            <table class="table mb-0">
              <thead class="bg-light">
                <tr>
                  <th scope="col" class="border-0">#</th>
                  <th scope="col" class="border-0">status Code</th>
                  <th scope="col" class="border-0">Function Name</th>
                  <th scope="col" class="border-0">Language</th>
                  <th scope="col" class="border-0">Error Message</th>
                  <th scope="col" class="border-0">Result Message</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(key, value) in list" :key="value">
                  <td>
                    <d-button-group size="small">
                      <d-button @click="show('editModal', key)">Edit</d-button>
                      <d-button @click="show('removeModal', key)">Remove</d-button>
                    </d-button-group>
                  </td>
                  <td>{{key.statusCode}}</td>
                  <td>{{key.functionName}}</td>
                  <td>{{key.lang}}</td>
                  <td>{{key.errorResult.message}}</td>
                  <td>{{key.result.message}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <d-modal v-if="editModal" @close="close('editModal')">
      <new-draft :data-modal.sync="selectItem" :project-name="id"></new-draft>
    </d-modal>
  </div>
</template>
<script>
import NewDraft from "../components/blog/NewDraft";
export default {
  data() {
    return {
      id: "",
      model: {},
      list: [],
      selectItem: null,
      editModal: false,
      removeModal: false
    };
  },
  components: {
    NewDraft
  },
  methods: {
    handleClose(e) {
      console.log(e);
    },
    show(name, model) {
      this[name] = true;
      if (model) {
        this.selectItem = model;
      } else {
        this.selectItem = null;
      }
    },
    close(name) {
      this[name] = false;
    },
    getModels() {
      this.$api.post("/home/GetbyProject", this.model).then(
        response => {
          this.list = response.result;
        },
        err => this.$store.getters.errorParse(err, this)
      );
    }
  },
  mounted() {
    let id = this.$route.params.id;
    this.id = id;
    this.model = JSON.parse(JSON.stringify(this.$store.state.models.model));
    this.model.offset = 0;
    this.model.projectName = id;
    this.model.lang = "full";
    this.model.limit = 20;
    this.getModels();
  }
};
</script>
