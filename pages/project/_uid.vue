<template>
    
</template>

<script>
export default {
    async asyncData ({ $prismic, error }) {
    try {
        const document = (await $prismic.api.getByUID('project_post', params.uid)).data
        return {
            document
        }
    } catch (e) {
        error({ statusCode: 404, message: 'Page not found' })
    }
}
</script>

<style lang="sass" scoped>

</style>