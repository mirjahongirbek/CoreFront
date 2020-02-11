export default function () {
  return [{
    title: 'Blog Dashboard',
    to: {
      name: 'blog-overview',
    },
    htmlBefore: '<i class="material-icons">edit</i>',
    htmlAfter: '',
  }, {
    title: 'Blog Posts',
    htmlBefore: '<i class="material-icons">vertical_split</i>',
    to: {
      name: 'blog-posts',
    },
  }];
}