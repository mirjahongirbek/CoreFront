<template>
  <d-navbar-nav class="border-left flex-row">
    <li class="nav-item border-right dropdown notifications">
      <a
        class="nav-link nav-link-icon text-center"
        @click="isShowProject = true"
      >
        <div class="nav-link-icon__wrapper">
          <i class="material-icons ">add</i>
        </div>
      </a>
      <!--   <a class="nav-link nav-link-icon text-center" v-d-toggle.notifications>
        <div class="nav-link-icon__wrapper">
          <i class="material-icons">&#xE7F4;</i>
          <d-badge pill theme="danger">2</d-badge>
        </div>
      </a> -->
      <d-collapse id="notifications" class="dropdown-menu dropdown-menu-small">
        <d-dropdown-item>
          <div class="notification__icon-wrapper">
            <div class="notification__icon">
              <i class="material-icons">&#xE6E1;</i>
            </div>
          </div>
          <div class="notification__content">
            <span class="notification__category">Analytics</span>
            <p>
              Your website’s active users count increased by
              <span class="text-success text-semibold">28%</span> in the last
              week. Great job!
            </p>
          </div>
        </d-dropdown-item>
        <d-dropdown-item href="#">
          <div class="notification__icon-wrapper">
            <div class="notification__icon">
              <i class="material-icons">&#xE8D1;</i>
            </div>
          </div>
          <div class="notification__content">
            <span class="notification__category">Sales</span>
            <p>
              Last week your store’s sales count decreased by
              <span class="text-danger text-semibold">5.52%</span>. It could
              have been worse!
            </p>
          </div>
        </d-dropdown-item>
        <d-dropdown-item class="notification__all text-center"
          >View all Notifications</d-dropdown-item
        >
      </d-collapse>
    </li>
    <li class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle text-nowrap px-3"
        v-d-toggle.user-actions
      >
        <img
          class="user-avatar rounded-circle mr-2"
          src="@/assets/images/avatars/0.jpg"
          alt="User Avatar"
        />
        <span class="d-none d-md-inline-block">Sierra Brooks</span>
      </a>
      <d-collapse id="user-actions" class="dropdown-menu dropdown-menu-small">
        <d-dropdown-item
          ><i class="material-icons">&#xE7FD;</i> Profile</d-dropdown-item
        >
        <d-dropdown-item
          ><i class="material-icons">&#xE8B8;</i> Edit Profile</d-dropdown-item
        >
        <d-dropdown-item
          ><i class="material-icons">&#xE2C7;</i> Files</d-dropdown-item
        >
        <d-dropdown-item
          ><i class="material-icons">&#xE896;</i> Transactions</d-dropdown-item
        >
        <d-dropdown-divider />
        <d-dropdown-item href="#" class="text-danger">
          <i class="material-icons text-danger">&#xE879;</i> Logout
        </d-dropdown-item>
      </d-collapse>
    </li>
    <d-modal v-if="isShowProject">
      <d-modal-header></d-modal-header>
      <d-modal-body>
        <d-card-body>
          <div class="form-group">
            <label> Project Name</label>
            <d-input v-model="newProject.projectName" class="mb-2" />
          </div>
          <div class="form-group">
            <label>Project Description</label>
            <d-input class="mb-2" v-model="newProject.description"></d-input>
          </div>
        </d-card-body>

        <d-modal-footer>
          <d-button-group>
            <d-button >Cancel</d-button>
            <d-button @click="addProject()">Ok</d-button>
          </d-button-group>
        </d-modal-footer>
      </d-modal-body>
    </d-modal>
  </d-navbar-nav>
</template>
<script>
export default {
  data() {
    return {
      isShowProject: false,
      newProject: {
        id: "",
        projectName: "",
        description: ""
      }
    };
  },
  methods: {

addProject(){
  this.$api.post("/project/addProject", this.newProject).then(response=>{
console.log();

  }, err=>this.$store.getters.errorParse(err, this));
}

  },
  mounted() {}
};
</script>
<style>
.nav-link:hover {
  cursor: pointer;
}
</style>
