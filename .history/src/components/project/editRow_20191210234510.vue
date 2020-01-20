<template>
  <div>
    <d-modal-header>
      Edit
    </d-modal-header>
    <d-modal-body>
      <d-card>
        <d-card-body class="d-flex flex-column">
          <div class="quick-post-form">
            <!-- Title -->
            <label>ProjectName: {{ projectName }}</label>
            <div class="form-group" v-if="!projectName">
              <d-form-select
                class="form-control"
                v-model="models.projectName"
                :options="options"
              />
            </div>
            <div class="form-group">
              <d-form-select v-model="models.responseStatus">
                <option
                  v-for="(key, value) in $store.state.models.statusCore"
                  :value="key"
                  :key="value"
                  >{{ value }}</option
                >
              </d-form-select>
            </div>
            <div class="form-group">
              <v-select
                class="form-control"
                :options="$store.state.culters"
                v-model="models.lang"
                placeholder="uz"
              ></v-select>
            </div>
            <div class="form-group">
              <d-input
                class="form-control"
                v-model="models.statusCode"
                placeholder="status Code"
              />
            </div>
            <div class="form-group">
              <label>Switch is error</label>
              <d-checkbox inline v-model="enabled" toggle>
                <span v-if="!enabled">- 🚀🚀 Success Result! 🚀🚀</span>
              </d-checkbox>
            </div>
            <div class="form-group">
              <label>Result Message</label>
              {{ models.result.message }}
              <textarea
                plaintext="true"
                class="form-control"
                :disabled="enabled"
                v-model="models.result.message"
                aria-placeholder="Result message"
              ></textarea>
            </div>
            <div class="form-group">
              <label>Error Message</label>
              <textarea
                v-model="models.errorResult.message"
                :disabled="!enabled"
                class="form-control"
              ></textarea>
            </div>
            <div class="form-group">
              <d-button class="btn-accent" @click="addResult()"
                >Create Draft</d-button
              >
            </div>
          </div>
        </d-card-body>
      </d-card>
    </d-modal-body>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  computed: {}
};
</script>
