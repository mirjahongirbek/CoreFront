import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import moment from 'moment';
import api from './plugins/api';
import models from "./models"
Vue.use(Vuex);
const url = 'http://172.17.9.105:1600';
const http = axios.create({
  baseURL: url + "/api",
});
Vue.use(api, {
  http,
});
Vue.prototype.$moment = function () {
  return moment;
};
const store = new Vuex.Store({
  state: {
    http,
    url,
    models,
    projects: [],
    culters: [],
    token: '',
    projectConfigs: []
  },
  getters: {
    getProjects: (state, getters) => (_this) => {
      return new Promise(resolve => {
        if (state.projects.length > 0) {
          resolve(state.projects);
        }
        _this.$api.get("/project/GetallProject").then(response => {
          state.projects = response;
          resolve(state.projects);
        }, err => getters.errorParse(err, _this));
      })

    },

    getProjectConfig: (state) => (projectName, _this) => {
      return new Promise(resolve => {
        if (!projectName) return resolve();
        var projectConfig = state.projectConfigs.firstOrDefault(m => m.projectName == projectName);
        if (projectConfig) resolve(projectConfig);
        _this.$api.get("/Config/get?name=" + projectName).then(response => {
          resolve(response.result);
        }, err => {})
      })

    },
    errorParse: (state) => (err, _this) => {

    },


  },
});
export default store;