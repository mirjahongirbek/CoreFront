<template>
  <div>
    <d-card class="card-small">
      <d-card-header class="border-bottom">
        <h6 class="m-0">{{ title }}</h6>
        <div class="block-handle">
          <d-button theme="light" @click="showModal = true">+</d-button>
        </div>
      </d-card-header>

      <d-card-body class="p-0">
        <d-list-group flush class="list-group-small">
          <d-list-group-item
            v-for="(item, idx) in $store.state.projects"
            :key="idx"
            class="d-flex px-3"
          >
            <router-link :to="'/tables/' + item.projectName">
              <span class="text-semibold text-fiord-blue">{{
                item.projectName
              }}</span>
              <span
                class="ml-auto text-right text-semibold text-reagent-gray"
                >{{ item.value }}</span
              >
            </router-link>
            <d-button @click="show('configModal', item.projectName)"
              >SeeConfig</d-button
            >
          </d-list-group-item>
        </d-list-group>
      </d-card-body>

      <d-card-footer class="border-top">
        <d-row>
          <!-- Time Frame -->
          <d-col>
            <d-select size="sm" value="last-week" style="max-width: 130px;">
              <option value="last-week">Last Week</option>
              <option value="today">Today</option>
              <option value="last-month">Last Month</option>
              <option value="last-year">Last Year</option>
            </d-select>
          </d-col>
          <!-- View Full Report -->
          <d-col class="text-right view-report">
            <a href="#">View full report &rarr;</a>
          </d-col>
        </d-row>
      </d-card-footer>
    </d-card>
    <d-modal v-if="showModal" @close="handleClose">
      <d-modal-header>
        <d-modal-title>ProjectName</d-modal-title>
      </d-modal-header>
      <d-modal-body>
        👋 Hello there!
        <d-input v-model="newProjectName" class="mb-2" />
      </d-modal-body>
      <d-modal-footer>
        <d-button>Cancel</d-button>
        <d-button @click="addProject()">Add</d-button>
      </d-modal-footer>
    </d-modal>
    <d-modal v-if="configModal" @close="handleClose">
      <config-d :is-show="configModal" :project-name="projectName"></config-d>
    </d-modal>
  </div>
</template>

<script>
import configD from "../blog/configDraft.vue";
export default {
  name: "ao-top-referrals",
  components: {
    configD
  },
  props: {
    title: {
      type: String,
      default: "Top Referrals"
    },
    referralData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      showModal: false,
      projects: [],
      newProjectName: "",
      projectName: "",
      configModal: false
    };
  },
  methods: {
    show(name, prName) {
      this.projectName = prName;
      this[name] = true;
    },
    addProject() {
      this.$api
        .post("/home/AddProject", { projectName: this.newProjectName })
        .then(
          response => {
            this.$store.state.projects.push(response.result);
          },
          err => {}
        );
    }
  },
  mounted() {
    this.getAllProjects();
  }
};
</script>
