<template>
    <div class="container">
    </div>
</template>

<style lang="scss" scoped>
    .container{
        overflow: hidden;
        padding: 3.3333333vw;
        width: 100vw;
        height: 100vh;
        display: grid;
        grid-template-columns: [col-1]1fr [col-2]1fr [col-3]1fr [col-4]1fr;
        grid-template-rows: [row-1]1fr [row-2]1fr [row-3]1fr [row-4]1fr;
        column-gap:1.666666667vw;
        row-gap: 1.666666667vw;
        background-color: $background-menu;
    }
</style>
