<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Components</span>
        <h3 class="page-title">Blog Posts</h3>
      </div>
    </div>

    <!-- First Row of Posts -->
    <d-row>
      <d-col
        v-for="(post, idx) in $store.state.projects"
        :key="idx"
        lg="3"
        md="6"
        sm="12"
        class="mb-4"
      >
        <d-card class="card-small card-post card-post--1">
          <div class="card-post__image">
            <d-badge
              pill
              :class="['card-post__category', 'bg-' + post.categoryTheme]"
              >{{ post.category }}</d-badge
            >
            <div class="card-post__author d-flex">
              <a
                href="#"
                class="card-post__author-avatar card-post__author-avatar--small"
                >Written by {{ post.author }}</a
              >
            </div>
          </div>
          <d-card-body>
            <h5 class="card-title">
              <a href="#" class="text-fiord-blue">{{ post.projectName }}</a>
            </h5>
            <p class="card-text d-inline-block mb-3">bpdy</p>
            <span class="text-muted">date</span>
          </d-card-body>
          <d-card-footer>
            <d-button-group>
              <d-button @click="showConfig(post)">dfvdf</d-button>
              <d-button @click="$router.push({ path: '/project/' + post.id })"
                >Go</d-button
              >
            </d-button-group>
            {{ post.id }}</d-card-footer
          >
        </d-card>
      </d-col>
    </d-row>

    <!-- Second Row of Posts -->
    <!--  <d-row>
      <d-col
        v-for="(post, idx) in PostsListTwo"
        :key="idx"
        lg="6"
        sm="12"
        class="mb-4"
      >
        <d-card class="card-small card-post card-post--aside card-post--1">
          <div
            class="card-post__image"
            :style="{
              backgroundImage: 'url(\'' + post.backgroundImage + '\')'
            }"
          >
            <d-badge
              pill
              :class="['card-post__category', 'bg-' + post.categoryTheme]"
              >{{ post.category }}</d-badge
            >
            <div class="card-post__author d-flex">
              <a
                href="#"
                class="card-post__author-avatar card-post__author-avatar--small"
                :style="{
                  backgroundImage: 'url(\'' + post.authorAvatar + '\')'
                }"
                >Written by Anna Ken</a
              >
            </div>
          </div>
          <d-card-body>
            <h5 class="card-title">
              <a class="text-fiord-blue" href="#">{{ post.title }}</a>
            </h5>
            <p class="card-text d-inline-block mb-3">{{ post.body }}</p>
            <span class="text-muted">{{ post.date }}</span>
          </d-card-body>
        </d-card>
      </d-col>
    </d-row> -->

    <!-- Third Row of Posts -->
    <!--   <d-row>
      <d-col v-for="(post, idx) in PostsListThree" :key="idx" lg="4">
        <d-card class="card-small card-post mb-4">
          <d-card-body>
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text text-muted">{{ post.body }}</p>
          </d-card-body>
          <d-card-footer class="border-top d-flex">
            <div class="card-post__author d-flex">
              <a
                href="#"
                class="card-post__author-avatar card-post__author-avatar--small"
                :style="{
                  backgroundImage: 'url(\'' + post.authorAvatar + '\')'
                }"
                >Written by James Khan</a
              >
              <div class="d-flex flex-column justify-content-center ml-3">
                <span class="card-post__author-name">{{ post.author }}</span>
                <small class="text-muted">{{ post.date }}</small>
              </div>
            </div>
            <div class="my-auto ml-auto">
              <d-button size="sm" class="btn-white">
                <i class="far fa-bookmark mr-1"></i> Bookmark
              </d-button>
            </div>
          </d-card-footer>
        </d-card>
      </d-col>
    </d-row> -->

    <!-- Fourth Row of Posts -->
    <!-- <d-row>
      <d-col
        v-for="(post, idx) in PostsListFour"
        :key="idx"
        lg="3"
        md="6"
        sm="12"
        class="mb-4"
      >
        <d-card class="card-small card-post h-10">
          <div
            class="card-post__image"
            :style="{
              backgroundImage: 'url(\'' + post.backgroundImage + '\')'
            }"
          ></div>
          <d-card-body>
            <h5 class="card-title">
              <a class="text-fiord-blue" href="#">{{ post.title }}</a>
            </h5>
            <p class="card-text">{{ post.body }}</p>
          </d-card-body>
          <d-card-footer class="text-muted border-top py-3">
            <span class="d-inline-block"
              >By
              <a class="text-fiord-blue" :href="post.authorUrl">{{
                post.author
              }}</a>
              in
              <a class="text-fiord-blue" :href="post.categoryUrl">{{
                post.category
              }}</a></span
            >
          </d-card-footer>
        </d-card>
      </d-col>
    </d-row> -->
  </d-container>
</template>

<script>
import configModal from "../components/configModal.vue";
export default {
  data() {
    return {};
  },
  components: {
    configModal
  },
  methods: {
    showConfig(key) {
      this.$store.getters
        .getProjectConfig(key.projectName, this)
        .then(response => {
          console.log(response);
        });
    }
  }
};
</script>
