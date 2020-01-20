<template>
  <div>
    <d-modal v-if="showModal" @close="handleClose">
      <d-modal-header>
        <d-modal-title>Header</d-modal-title>
      </d-modal-header>
      <d-modal-body>
        <div>
          <v-jsoneditor
            v-model="config.config"
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
  components: {
    VJsoneditor
  },
  props: {
    showModal: {
      default: false
    },
    config: {}
  },
  methods: {
    save() {
      console.log(this.config);
      this.$api.put("/config/Update", this.config).then(
        response => {
          console.log(response);
        },
        err => {}
      );
    },
    handleClose(e) {
      this.showModal = false;
      console.log(e);
      this.$emit("input", false);
    }
  }
};
</script>
