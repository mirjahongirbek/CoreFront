<template>
  <div>
    <d-modal v-if="showModal" @close="handleClose">
      <d-modal-header>
        <d-modal-title>Header</d-modal-title>
      </d-modal-header>
      <d-modal-body>
        <div>
          <labe>ProjectKey</labe>
          <d-form-select v-model="selectKey">
            <option v-for="(key, value) in project.projectConfig" :key="value">
              {{ key.modalKey }}
            </option>
          </d-form-select>
        </div>
        <br />
        <div>
          <v-jsoneditor
            v-model="selectConfig.config"
            :plus="false"
            height="400px"
            @error="onError"
          />
        </div>
        <d-modal-footer>
          <d-button>Cancel</d-button>
          <d-button @click="save()">Save</d-button>
        </d-modal-footer>
      </d-modal-body>
    </d-modal>
  </div>
</template>
<script>
import VJsoneditor from "v-jsoneditor/src/index";
export default {
  data() {
    return {
      selectConfig: {},
      selectKey: ""
    };
  },
  components: {
    VJsoneditor
  },
  props: {
    showModal: {
      default: false
    },
    project: {
      default: {}
    },
    config: {}
  },
  methods: {
    save() {
      this.$api.put("/config/Update", this.config).then(
        response => {
          console.log(response);
        },
        err => this.$store.getters.errorParse(err, this)
      );
    },
    handleClose(e) {
      //  this.showModal = false;
      this.$emit("input", false);
    }
  },
  watch: {
    selectKey: function(val) {
      let item = this.config.firstOrDefault(m => m.myKey == val);
      if (item) {
        this.selectConfig = item;
        return;
      }
      this.$store.getters
        .addProjectToConfig(this.project.projectName, val, this)
        .then(response => {
          this.selectConfig = response;
        });
    },
    showModal: function(val) {
      if (val) {
        let conf = this.project.projectConfig[0].modalKey;
        this.selectKey = conf;
      }
    }
  }
};
</script>
