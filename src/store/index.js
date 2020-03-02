import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import moment from 'moment';
import api from './plugins/api';
import models from "./models"
Vue.use(Vuex);
const url = 'http://172.17.9.248:1600';
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
    projectConfigs: [],
    dashborad: {
      "project": 3,
      "config": 6,
      "myModel": 2,
      "errorModels": 2,
      "modelResult": 2
    },
  },
  getters: {
    addProjectToConfig: (state, getters) => (projectName, myKey, _this) => {
      return new Promise((resolve) => {
        let conf = {
          projectName: projectName,
          myKey: myKey
        }
        _this.$api.post("/Config/AddConfig", conf).then(response => {
          resolve(response.data.result);
        }, err => _this.$store.getters.errorParse(err, _this))
      })
    },
    updateProject: (state, getters) => (model, _this) => {
      return new Promise(resolve => {
        _this.$api.put("/Project/UpdateProject", model).then(response => {
          resolve(response.data.result)
        }, err => getters.errorParse(err, _this))
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
    getDashboard: (state) => (_this) => {
      return new Promise(resolve => {
        _this.$api.get("/admin/Dashboard").then(response => {
          state.dashborad = response.data.result;
          resolve(response.data.result)

        }, err => _this.$store.getters.errorParse(err, _this))
      });
    },
    errorParse: (state) => (err, _this) => {

    },


  },
});
export default store;