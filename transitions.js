/* es-lint-disable */
import anime from 'animejs'
import Rellax from 'rellax'

export const transitions = {
  ListToProject: {
    mode: '',
    css: false,
    leave: (el, done) => {
      const thumbnail = el.querySelector('.thumbnail')
      const linksProject = el.querySelectorAll('.link-project')
      const tl = anime.timeline({
        duration: 500,
        easing: 'easeInOutQuad'
      })

      tl.add({
        targets: linksProject,
        opacity: [1, '0'],
        delay: (el, i, l) => {
          return i * 100
        }
      }, '-=200').add({
        targets: thumbnail,
        translateX: [1, '-51.666666667%']
      }, '-=100').add({
        targets: el,
        backgroundColor: '#FFF1E3',
        complete: done
      })
    },
    enter: (el, done) => {
      setTimeout(() => {
        const titleProject = document.querySelector('.project-title')
        const tl = anime.timeline({
          duration: 500,
          easing: 'easeInOutQuad',
          complete: ()  => {

            done;
          },
          delay: 1000
        })

        console.log(el)
        tl.add({
          targets: titleProject,
          opacity: [0, 1],
          translateY: ['50%', 0],
          complete: ()=>{
            document.querySelector('.container').classList.add('parallax')
          }
        })
      }, 1000)
    }
  },
  projectToHome: {
    mode: 'out-in',
    css: false,
    leave: (el, done) => {
      const tl = anime.timeline({
        duration: 1000,
        easing: 'easeInOutQuad',
        complete: done
      })

      tl.add({
        targets: el,
        translateY: ['0', '-70vh']
      }).add({
        targets: '.panel.first',
        translateY: ['101vh', '0']
      }, '-=800')

      document.querySelector('body').classList.remove('parallax')
    },
    enter: (el, done) => {
      const tl = anime.timeline({
        duration: 800,
        easing: 'easeInOutQuad',
        complete: ()=>{
          /* var rellax = new Rellax('.rellax', {
            center: true
          }); */
          // document.querySelector('.project').classList.add('parallax')
          el.style.transform = '';
          done;
        }
      })

      tl.add({
        targets: '.panel.first',
        translateY: ['0', '-101vh']
      }).add({
        targets: el,
        translateY: ['70vh', '0']
      },'-=700')
    }
  }
}

export default transitions
