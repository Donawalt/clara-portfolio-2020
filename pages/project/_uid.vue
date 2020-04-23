<template>
    <div class='container'>
        <!-- {{ $prismic.asText(document['project-banner'][0].title_of_the_project) }} -->
        <section class='b-project-header'>
            <div class='banner' :style="{ backgroundImage: `url(${document['project-banner'][0].project_image_banner.url})` }">
            </div>
            <h1 class='project-title'>
                {{ $prismic.asText(document['project-banner'][0].title_of_the_project) }}
            </h1>
        </section>
        <section class='b-project-description'>
            <div class='description'>
                <h2>Introduction</h2>
                <p><!--{{ $prismic.asText(document['project-banner'][0].description_du_projet) }}-->FROM ITS INCEPTION, ROLLS-ROYCE HAS BEEN A SPECTACULAR MASTER OF CRAFT. FROM FAMOUS MOTORCARS TO SPECTACULAR AIRPLANES. AND TODAY, THEY CONTINUE TO USE THEIR EXPERTISE TO CONCEIVE BEAUTIFUL OBJECTS SUCH AS THE ARTFUL CHAMPAGNE CHEST. "A TRIUMPH OF DESIGN AND PRECISION ENGINEERING”. MY ROLE WAS TO CONCEIVE AN ART DIRECTION THAT WOULD ALLOW THE CHAMPAGNE CHEST TO SHINE IN ALL ITS GLORY. TO ACHIEVE THIS, I JUXTAPOSED THE INTRICATE LUXURY OF THE CHAMPAGNE CHEST AGAINST A MINIMALIST AND HARSH ENVIRONMENT.</p>
            </div>
        </section>
        <section class='b-project-body'></section>
        <section class='b-project-footer'>
            <hr class='hr-top'/>
            <div class='next-project'>
                <p class="title">
                    Séries photographiques 007
                </p>
                <div class='next-link-container'>
                    <img class='next-project-thumbnail'>
                    <p>NEXT</p>
                </div>
            </div>
            <hr class='hr-bottom'/>
        </section>
    </div>
</template>

<script>
/* eslint-disable */
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

<style lang="scss">
.container{
    width: 100w;
    min-height: 100vh;
    background-color: $background-color;
    section {
        padding: 3.3333333vw;
        display: grid;
        grid-template-columns: [col-1]1fr [col-2]1fr [col-3]1fr [col-4]1fr;
        grid-template-rows: [row-1]1fr [row-2]1fr [row-3]1fr [row-4]1fr;
        column-gap:1.666666667vw;
        row-gap: 1.666666667vw;
        min-height: 100vh;
        &.b-project-header{
            .banner{
                background-color: $background-menu;
                grid-column: col-2 /col-4;
                grid-row: row-2 / row-4;
                position: relative;
                overflow: hidden;
                background-position: center;
                // background-attachment: fixed;
                background-size: cover;
                background-repeat: none;
            }
            .project-title{
                grid-column: col-2 /col-4;
                grid-row: row-4 / row-;
                text-align: center;
                font-size: 50px;
                font-family: 'Times New Roman', Times, serif;
                font-weight: bold;
                text-transform: uppercase;
            }
        }
        &.b-project-description{
            .description{
                grid-column: col-1 /col-5;
                grid-row: row-2 / row-4;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                h2{
                    font-family: 'Roboto', 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                    font-size: 18px;
                    text-transform: uppercase;
                    text-align: center;
                    margin-bottom: 32px;
                }
                p{
                    font-size: 25px;
                    text-transform: uppercase;
                    font-family: 'Times New Roman', Times, serif;
                    font-weight: bold;
                    text-align: center;
                    padding-left:  12.5%;
                    padding-right: 12.5%;
                }
            }
        }
       // &.b-project-body{

        //}
        &.b-project-footer{
            .hr-top, .hr-bottom{
                grid-column: col-2 /col-4;
                border: none;
            }
            .hr-top{
                border-bottom: solid 4px black ;
            }
            .next-project{
                grid-column: col-1 /col-;
                grid-row: row-2 / row-4;
                display: flex;
                justify-content: space-between;
                .title{
                    font-family: 'Roboto', Arial, Helvetica, sans-serif;
                    font-weight: bold;
                    text-transform: uppercase;
                    font-size: 100px;
                    color: transparent;
                    -webkit-text-stroke: 2px black;
                    display: flex;
                    align-items: center;
                }
                .next-link-container{
                    height: 22vw;
                    width: 22vw;
                    border-radius: 200px;
                    text-align: center;
                    position: relative;
                    img{
                         background-color: $background-menu;
                         height: 22vw;
                         width: 22vw;
                         border-radius: 200px;
                         overflow: hidden;
                    }
                    p{
                        position: absolute;
                        transform: translate(-50%, -50%);
                        top:50%;
                        left:50%;
                        font-size: 60px;
                        font-family: 'Times', 'Times New Roman', Times, serif;
                        color: white;
                        mix-blend-mode: difference;
                    }
                }
            }
            .hr-bottom{
                border-top: solid 4px black;
                grid-row: row-4/row-4;
            }
        }
    }
}
</style>