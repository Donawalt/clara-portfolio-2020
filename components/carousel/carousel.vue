<template>
    <div id='container-1'>
        <template v-for="(slide, index) in data">
                <img :class=" index+1 === active ? 'active' : 'hidden'"  :key="index" :src='slide.data.image_mis_en_avant.url' />
        </template>
        <div id='b-slider-view'>
          <p>Voir le projet </p>
        </div>
    </div>
</template>

<script>
export default {
  props: ['data', 'max', 'active', 'maxValue'],
  beforeMount () {
    this.$emit('update:maxValue', this.max)
  }
}
</script>

<style lang="scss" scoped>
    #container-1{
        position: relative;
        width: 100%;
        height:100%;
        &:hover{
            background-color: red;
            #b-slider-view{
                transform: translateY(0%);
                transition:500ms;
            }
        }
    }
    img{
        min-height: 100vh;
        min-width: 25vw;
        max-width: 50vw;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        @media screen and (orientation: portrait){
            min-width: 100vw;
            min-height: 100vh;
            height: auto;
            max-height: 150vh ;
        }
    }
    #b-slider-view{
      position: absolute;
      bottom: 0;
      height: 70px;
      width: 100%;
      background: rgb(0,0,0);
      background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,212,255,0) 100%);
      color: white;
      z-index: 110;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translateY(100%);
      transition: 500ms;
    }
    .active{
        z-index: 100;
        animation: appear 700ms ease-out;
    }
    .hidden{
        z-index: 50;
        animation: hidden 1600ms ease-in-out;
    }

    @keyframes hidden {
        from{
            transform: translate(-50%,-50%);
            display: block;
        }
        to{
            transform: translate(150%,-50%);
            display: none;
        }
    }

    @keyframes appear {
        from{
            transform: translate(-150%,-50%);
            display: block;
        }
        to{
            transform: translate(-50%,-50%);
            display: block;
        }
    }
</style>
