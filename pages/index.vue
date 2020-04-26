<template>
  <div class="container">
    <div class='b-title-home'>
      <h1 class="title"><span class='bold'>Clara</span> Barthod<br/> Malat</h1>
    </div>
    <div class='b-slider-info-home'>
      <div class='e-compteur'>
        <p class="compteur-text"><span class="compteur-current-number">{{ active }}</span>-<span>{{maxValue}}</span></p>
      </div>
      <div class='e-project-info-slider'>
        <p class='project-title end'>{{ active > 0 ? results[active-1].data.titre_du_projet[0].text : ''}}</p>
        <p class="project-date end">Février 2020</p>
      </div>
    </div>
    <div class='b-slider-img'>
      <nuxt-link :to="'/project/'+ results[active-1].uid">
        <carousel :data='results' :max='results.length' :active='active' :maxValue.sync='maxValue'/>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import carousel from '@/components/carousel/carousel'
export default {
  data: () => ({
    active: 1,
    maxValue: 0
  }),
  components: {
    carousel
  },
  async asyncData ({ $prismic, error }) {
    try {
      const document = (await $prismic.api.getSingle('home')).data
      const posts = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'project_post')
      )
      return {
        document,
        posts,
        results: posts.results
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {
    next () {
      setInterval(() => {
        if (this.active === this.maxValue) { this.active = 0 }
        this.active++
      }, 5000)
    }
  },
  mounted () {
    this.next()
  }
}
</script>

<style lang='scss' scoped>
.container {
  overflow: hidden;
  padding: 3.3333333vw;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: [col-1]1fr [col-2]1fr [col-3]1fr [col-4]1fr;
  grid-template-rows: [row-1]1fr [row-2]1fr [row-3]1fr [row-4]1fr;
  column-gap:1.666666667vw;
  row-gap: 1.666666667vw;
  background-color: $background-color;
  .b-title-home{
    grid-row: row-4 / 4;
    font-size: 50px;
    text-transform: uppercase;
    .title>.bold{
      font-family: 'Roboto-bold', 'Roboto', 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      font-style: initial;
    }
    .title{
      font-family: 'Times-Italic', 'Times New Roman', Times, serif;
      font-style: italic;
    }
  }
  .b-slider-info-home{
    display: flex;
    justify-content: space-between;
    grid-column: col-2/2;
    grid-row: row-1/5;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    div{
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      font-size: 25px;
      line-height: 30px;
      p.end{
        text-align:right;
      }
      p.project-title{
        font-weight:bold;
      }
    }
  }
  .b-slider-img{
    background-color: $background-menu;
    grid-column: col-3/col-;
    grid-row: row-1/5;
    margin-top: -3.3333333vw;
    margin-bottom: -3.3333333vw;
    overflow:hidden;
  }
}
</style>
