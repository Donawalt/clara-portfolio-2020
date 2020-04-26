<template>
    <div id='container-1'>
        <template v-for="(slide, index) in data">
                <img :class=" index+1 === active ? 'active' : 'hidden'"  :key="index" :src='slide.data.image_mis_en_avant.url' />
        </template>
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
    }
    img{
        width: 50vw;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .active{
        z-index: 100;
        animation: appear 500ms ease-in-out;
    }
    .hidden{
        z-index: 50;
        animation: hidden 1500ms ease-in-out;
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
