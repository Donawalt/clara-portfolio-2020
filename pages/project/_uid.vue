<template>
    <div class='conatainer'>
        {{ $prismic.asText(document['project-banner'][0].title_of_the_project) }}
    </div>
</template>

<script>
export default {
    async asyncData ({ params, $prismic, error }) {
    try {
        const document = (await $prismic.api.getByUID('project_post', params.uid)).data
        console.log(document);
        return {
            document
        }
    } catch (e) {
        error({ statusCode: 404, message: 'Page not found' })
    }
    }
}
</script>

<style lang="sass" scoped>

</style>