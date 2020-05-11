<template>
  <div id="splash">
    <div class="panel"></div>
    <div class="panel">
      <p class="main-logo">
        <img class="logo" src="~assets/images/CLARA BARTHOD MALAT.min.svg" />
      </p>
    </div>
  </div>
</template>
<script>
import anime from "animejs";

export default {
  mounted: () => {
    const promiseT = new Promise((resolve, reject) => {
      requestAnimationFrame(() => {
        let tl = anime.timeline({
          duration: 4000,
          complete: () => {
            switch (document.readyState) {
              case "interactive":
                window.addEventListener("load", tl => {
                  console.log("loaded things");
                  resolve();
                });
                break;
            
                case "complete":
                    resolve();
            }
          }
        });

        tl.add({
          targets: "#splash .main-logo .logo",
          opacity: [0, 1],
          scale: [400, 1],
          translateY: ["50%", 0], 
          easing: 'easeOutQuint'
        });
      });
    });

    promiseT.then(() => {
      requestAnimationFrame(() => {
        let tl1 = anime.timeline({
          duration: 2000
        });

        tl1.add({
            targets: '#splash .main-logo .logo', 
            opacity: [1, 0], 
            easing: 'easeInOutQuad',
        }).add({
          targets: ".panel",
          translateY: [0, "-101vh"],
          delay: anime.stagger(300, {direction: 'reverse'}),
          easing: 'easeOutQuint'
        }).add({
            targets: '.container', 
            opacity: [0, 1],
            easing: 'easeInQuint'
        }, "-=2000")
      });
    });
  }
};
</script>

<style lang="scss" scoped>
#splash {
  height: 100vh;
  width: 100vw;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 8000;
  .panel {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    position: absolute;
    background-color: $background-color;
    overflow: hidden;
    &:nth-child(1) {
      background-color: $background-menu;
    }
    .logo {
      mix-blend-mode: difference;
      opacity: 0;
    }
  }
}
</style> 