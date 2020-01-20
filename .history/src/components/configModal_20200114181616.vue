<template>
  <div>
    <d-modal v-if="showModal" @close="handleClose">
      <d-modal-header>
        <d-modal-title>Header</d-modal-title>
      </d-modal-header>
      <d-modal-body> </d-modal-body>
    </d-modal>
  </div>
</template>
<script>
export default {
  props: {
    showModal: {
      default: false
    }
  }
};
</script>
