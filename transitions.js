/* es-lint-disable */
import anime from 'animejs'

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
          complete: done,
          delay: 1000
        })

        console.log('enter')
        tl.add({
          targets: titleProject,
          opacity: [0, 1],
          translateY: ['50%', 0]
        })
      }, 1000)
    }
  },
  projectToHome: {
    mode: 'out-in',
    css: false,
    leave: (el, done) => {
      const tl = anime.timeline({
        duration: 500,
        easing: 'easeInOutQuad',
        complete: done
      })

      tl.add({
        targets: el,
        opacity: 0
      })
    },
    enter: (el, done) => {
      const tl = anime.timeline({
        duration: 500,
        easing: 'easeInOutQuad',
        complete: done
      })

      tl.add({
        targets: el,
        opacity: [0, 1]
      })
    }
  }
}

export default transitions
