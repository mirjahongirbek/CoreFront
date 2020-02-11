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
    updateProject: (state, getters) => (model, _this) => {
      return new Promise(resolve => {
        _this.$api.put("/Project/UpdateProject", model).then(response => {

        }, err => getters.errorParse(err, this))
      })
    },
    getProjects: (state, getters) => (_this) => {
      return new Promise(resolve => {
        if (state.projects.length > 0) {
          resolve(state.projects);
        }
        _this.$api.get("/project/GetallProject").then(response => {
          state.projects = response;
          for (let i = 0; i < state.projects.length; i++) {
            if (!state.projects[i].imageUrl) {
              state.projects[i].imageUrl = '/img/default.png'
            }
          }
          resolve(state.projects);
        }, err => getters.errorParse(err, _this));
      })
    },

    getProjectStatus: (state) => (id, _this) => {
      console.log(id);
      return new Promise(resolve => {
        _this.$api.get("/project/ProjectStatus?id=" + id).then(response => {
          console.log(response);

        }, err => _this.$store.getters.errorParse(err, _this))
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