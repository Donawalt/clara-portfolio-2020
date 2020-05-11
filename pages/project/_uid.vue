<template>
  <div class="container">
    <!-- {{ $prismic.asText(document['project-banner'][0].title_of_the_project) }} -->
    <section class="b-project-header">
      <div class="banner" :style="{ backgroundImage: `url(${document.image_mis_en_avant.url})` }"></div>
      <h1 class="project-title">{{ $prismic.asText(document.titre_du_projet) }}</h1>
    </section>
    <section class="b-project-description">
      <div class="description">
        <h2>Introduction</h2>
        <p>{{ $prismic.asText(document.description_de_mon_projet) }}</p>
      </div>
    </section>
    <section class="b-project-body" v-for="(slice, index) in document.body" :key="'slice-' + index">
      <template v-if="slice.slice_type === 'deux_image'">
        <template v-if="slice.primary.size_img === true">
          <section class="deux right">
            <span class="left-image rellax" data-rellax-speed="-2">
              <prismic-image :field="slice.primary.left_img"></prismic-image>
            </span>
            <span class="right-image rellax" data-rellax-speed="4">
              <prismic-image :field="slice.primary.right_img"></prismic-image>
            </span>
          </section>
        </template>
        <template v-if="slice.primary.size_img != true">
          <section class="deux left">
            <span class="left-image rellax" data-rellax-speed="4">
              <prismic-image :field="slice.primary.left_img"></prismic-image>
            </span>
            <span class="right-image rellax" data-rellax-speed="-2">
              <prismic-image :field="slice.primary.right_img"></prismic-image>
            </span>
          </section>
        </template>
      </template>
      <template v-if="slice.slice_type === 'fullscreen_image_'">
        <prismic-image class="img-full" :field="slice.primary.img_full" />
      </template>
      <template v-if="slice.slice_type === 'tryptique_image'">
        <div class="img-tri">
          <span>
            <prismic-image :field="slice.primary.left_img" :class="'rellax'"/>
            <prismic-image :field="slice.primary.center_img" :class="'rellax'" data-rellax-speed="2"/>
            <prismic-image :field="slice.primary.right_img" :class="'rellax'"/>
          </span>
        </div>
      </template>
      <template v-if="slice.slice_type === 'image_unique_'">
        <div class="image-unique">
          <prismic-image :field="slice.primary.image" :class="'rellax'" data-rellax-speed="1"/>
        </div>
      </template>
      <template v-if="slice.slice_type === 'video_'">
        <prismic-embed class="embed-video" :field="slice.primary.liens_video" :class="'rellax'"/>
      </template>
    </section>
    <section class="b-project-footer">
      <hr class="hr-top" />
      <template v-for="(project, index) in results">
        <div class="next-project" v-if="project.uid === paramUID" v-bind:key="index">
          <p class="title">
            <template
              v-if="posts.results[index+1]"
            >{{ results[index+1].data.titre_du_projet[0].text }}</template>
            <template v-else-if="posts.results[0]">{{ results[0].data.titre_du_projet[0].text }}</template>
          </p>
          <div class="next-link-container">
            <template v-if="posts.results[index+1]">
              <img
                class="next-project-thumbnail"
                :src="results[index+1].data.image_mis_en_avant.url"
              />
              <p>
                <nuxt-link :to="'/project/' + results[index+1].uid">NEXT</nuxt-link>
              </p>
            </template>
            <template v-else-if="posts.results[0]">
              <img class="next-project-thumbnail" :src="results[0].data.image_mis_en_avant.url" />
              <p>
                <nuxt-link :to="'/project/' + results[0].uid">NEXT</nuxt-link>
              </p>
            </template>
          </div>
        </div>
      </template>
      <hr class="hr-bottom" />
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import transitions from '@/transitions.js'
import Rellax from 'rellax';
import anime from "animejs";
export default {
  async asyncData({ params, $prismic, error }) {
    try {
      const document = (await $prismic.api.getByUID("project_post", params.uid))
        .data;
      const posts = await $prismic.api.query(
        $prismic.predicates.at("document.type", "project_post")
      );
      const paramUID = params.uid;
      console.log(document);
      console.log(posts);
      return {
        document,
        posts,
        results: posts.results,
        paramUID
      };
    } catch (e) {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
  transition(to, from) {
    if(from) { return from.name === 'project' ? '' : transitions.projectToHome}
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  min-height: 100vh;
  background-color: $background-color;
  section {
    padding: 3.3333333vw;
    display: grid;
    grid-template-columns: [col-1]1fr [col-2]1fr [col-3]1fr [col-4]1fr;
    grid-template-rows: [row-1]1fr [row-2]1fr [row-3]1fr [row-4]1fr;
    column-gap: 1.666666667vw;
    row-gap: 1.666666667vw;
    min-height: 100vh;
    &.b-project-header {
      .banner {
        background-color: $background-menu;
        grid-column: col-2 / col-4;
        grid-row: row-2 / row-4;
        position: relative;
        overflow: hidden;
        background-position: center;
        // background-attachment: fixed;
        background-size: cover;
        background-repeat: none;
      }
      .project-title {
        grid-column: col-2 / col-4;
        grid-row: row-4 / row-4;
        text-align: center;
        font-size: 50px;
        font-family: "Times New Roman", Times, serif;
        font-weight: bold;
        text-transform: uppercase;
      }
    }
    &.b-project-description {
      .description {
        grid-column: col-1 / col-5;
        grid-row: row-2 / row-4;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h2 {
          font-family: "Roboto", "Franklin Gothic Medium", "Arial Narrow", Arial,
            sans-serif;
          font-size: 18px;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 32px;
        }
        p {
          font-size: 25px;
          text-transform: uppercase;
          font-family: "Times New Roman", Times, serif;
          font-weight: bold;
          text-align: center;
          padding-left: 12.5%;
          padding-right: 12.5%;
        }
      }
    }
    &.b-project-body {
      display: block;
      padding: 0px;
      position: relative;
      .img-full {
        width: 100vw;
      }
      .embed-video {
        width: 100%;
        padding: 3.3333333vw;
        height: 100vh;
        width: 100vw;
        & > iframe {
          width: 100%;
          height: 100%;
        }
      }
      .img-tri {
        height: 100vw;
        width: 100vw;

        img {
          width: 22.083333333vw;
          margin: 1.666666667vw;
        }
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .image-unique {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        img {
          height: 50vh; 
          @media screen and (orientation: portrait) {
            height: auto;
            width: 50vw;
          }
        }
      }
      .deux {
        padding: 3.3333333vw;
        display: grid;
        grid-template-columns: [col-1]1fr [col-2]1fr [col-3]1fr [col-4]1fr;
        grid-template-rows: none;
        row-gap: 0px;
        column-gap: 1.666666667vw;
        min-height: 100vh;
        &.right {
          .right-image {
            img {
              width: 22.083333333vw;
            }
          }
        }
        &.left {
          .left-image {
            img {
              width: 22.083333333vw;
            }
          }
        }
        img {
          width: 100%;
        }
        span {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .left-image {
          grid-column: col-1/col-3;
          grid-row: 1/2;
        }
        .right-image {
          grid-column: col-3/col-;
          grid-row: 1/2;
        }
      }
    }
    &.b-project-footer {
      .hr-top,
      .hr-bottom {
        grid-column: col-2 / col-4;
        border: none;
      }
      .hr-top {
        border-bottom: solid 4px black;
      }
      .next-project {
        grid-column: col-1 / col-;
        grid-row: row-2 / row-4;
        display: flex;
        justify-content: space-between;
        .title {
          font-family: "Roboto", Arial, Helvetica, sans-serif;
          font-weight: bold;
          text-transform: uppercase;
          font-size: 100px;
          color: transparent;
          -webkit-text-stroke: 2px black;
          display: flex;
          align-items: center;
        }
        .next-link-container {
          height: 22vw;
          width: 22vw;
          border-radius: 200px;
          text-align: center;
          position: relative;
          transition: 500ms;
          filter: grayscale(1);
          &:hover {
            transition: 500ms;
            filter: grayscale(0);
            img,
            p > a {
              transition: 300ms;
              transform: scale(1.1);
            }
          }
          img {
            background-color: $background-menu;
            height: 22vw;
            width: 22vw;
            border-radius: 200px;
            overflow: hidden;
            transition: 300ms;
          }
          p {
            position: absolute;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
            font-size: 60px;
            font-family: "Times", "Times New Roman", Times, serif;
            color: white;
            mix-blend-mode: difference;
            a {
              color: white;
              text-decoration: none;
            }
          }
        }
      }
      .hr-bottom {
        border-top: solid 4px black;
        grid-row: row-4/row-4;
      }
    }
  }
}
</style>

<style lang='scss'>
.embed-video {
  width: 100%;
  padding: 3.3333333vw;
  height: 100vh;
  width: 100vw;
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>