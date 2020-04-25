<template>
    <header>
        <template v-if='$route.path === "/"'>
            <div id='b-menu-container' class="b-menu-container" :class="{ 'active' : isOpen }" @click.prevent="toggle">
                <template v-if='isOpen'>
                    <slot>
                        <img src="~assets/images/Menu-active.svg">
                    </slot>
                </template>
                <template v-else>
                    <slot>
                        <img src="~assets/images/Menu.svg">
                    </slot>
                </template>
            </div>
        </template>
        <template v-else-if="$route.path !== '/'">
            <div id='b-menu-container' class="b-menu-container" :class="{ 'active' : isOpen }" @click.prevent="toggle">
                <template v-if='isOpen'>
                    <slot>
                        <img src="~assets/images/Menu-active.svg">
                    </slot>
                </template>
                <template v-else>
                    <slot>
                        <img src="~assets/images/Menu.svg">
                    </slot>
                </template>
            </div>
            <div class="b-title-container">
                <p class="title-site"><nuxt-link to='/'><img src="~assets/images/CLARA BARTHOD MALAT.svg"></nuxt-link></p>
            </div>
            <div class="b-index-container">
                <template v-if="$route.path !== '/project' & $route.path !== '/project/'">
                    <nuxt-link to='/project'><img src="~assets/images/Index.svg"></nuxt-link>
                </template>
                <template v-if="$route.path === '/project' || $route.path === '/project/'">
                    <img @click="$router.go(-1)" src="~assets/images/Index.svg"/>
                </template>
            </div>
        </template>
    </header>
</template>

<script>
/* eslint-disable */
export default {
    computed: {
        isOpen(){
            return this.$store.state.isNavOpen
        }
    },
    methods: {
        toggle() {
            return this.$store.commit('toggle')
        }
    }
}
</script>

<style lang='scss'>
    header{
        position: fixed;
        top:0;
        margin-top: 3.3333333vw;
        width: 100vw;
        padding-left: 3.3333333vw;
        padding-right: 3.3333333vw;
        display: grid;
        grid-template-columns: [col-1]1fr [col-2]2fr [col-3]1fr ;
        column-gap:1.666666667vw;
        z-index: 1000;
        mix-blend-mode: difference;
        a,p,span{
            color:white;
        }
        .b-title-container{
            grid-column: col-2/2;
            text-align: center;
        }
        .b-index-container{
            display: flex;
            justify-content: flex-end;
        }
    }
</style>
