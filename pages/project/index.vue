<template>
  <div class="container">
    <div class="content">
        <div class='thumbnail_container'>
            <div class='thumbnail' :style="urlIndex" ></div>
        </div>
        <ul v-for="(project, index) in results" v-bind:key="index">
            <li v-on:mouseover="updateImage(index, results)">
                <nuxt-link :to="'/project/' + project.uid">
                    <span class='number-project'>00{{ index + 1  }} </span><span class='title-project'>{{ project.data.titre_du_projet[0].text }}</span>
                </nuxt-link>
            </li>
        </ul>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    urlIndex: ''
  }),
  async asyncData ({ $prismic, error }) {
    try {
      const posts = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'project_post')
      )
      return {
        posts,
        results: posts.results
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {
    updateImage: function (index, results) {
      console.log(results)
      this.urlIndex = `background-image: url(${results[index].data.image_mis_en_avant.url})`;
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 3.3333333vw;
  width: 100vw;
  min-height: 100vh;
  background-color: $background-menu;
  .content{
      padding-top: 50vh;
      padding-bottom: 50vh;
      li{
          margin-bottom: 40px;
      }
      a{
          text-decoration: none;
      }
      .number-project{
          display: inline-block;
          transform: translateY(-400%);
          font-weight: bold;
          color: #FFF1E3;
          margin-right: 20px;
      }
      .title-project{
          font-size: 110px;
          font-family: 'Roboto-italic', 'Roboto', Arial, Helvetica, sans-serif;
          font-weight: bold;
          text-transform: uppercase;
          color: transparent;
          mix-blend-mode: difference;
           -webkit-text-stroke: 1px white ;
           transition: 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
          &:hover{
              font-style: italic;
              color: white;
              transition: 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
      }
  }
  .thumbnail_container{
    position: fixed;
    top:0;
    left:0;
    overflow: hidden;
    padding: 3.3333333vw;
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: [col-1]1fr [col-2]1fr [col-3]1fr [col-4]1fr;
    grid-template-rows: [row-1]1fr [row-2]1fr [row-3]1fr [row-4]1fr;
    column-gap:1.666666667vw;
    row-gap: 1.666666667vw;
    .thumbnail{
        background-color: $background-menu;
        background-position: center;
        background-size: cover;
        grid-column: col-3/ col- ;
        grid-row: row-2/row-4;
    }
  }
}
</style>
