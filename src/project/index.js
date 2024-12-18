console.log('Project page')

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

window.addEventListener('DOMContentLoaded', (event) => {
  gsap.registerPlugin(ScrollTrigger)

  // GSAP has loaded up
  gsap.set('.page-wrapper', {
    opacity: 1,
  })

  /** Split Type */
  let typeSplit

  function runSplitType() {
    typeSplit = new SplitType('[text-split]', {
      types: 'lines, words, chars',
      tagName: 'span',
    })
  }

  runSplitType()

  //Run the code when window width changes
  let windowWidth = window.innerWidth
  window.addEventListener('resize', function () {
    if (windowWidth !== window.innerWidth) {
      windowWidth = window.innerWidth
      typeSplit.revert()
      runSplitType()
    }
  })

  /** Split Type */

  const horizontalScroll = () => {
    const sectionHorizontal = document.querySelector(
      '.project_horizontal_wrapper'
    )
    const getScrollAmount = () => {
      let sectionHorizontalWidth = sectionHorizontal.scrollWidth
      return -(sectionHorizontalWidth - window.innerWidth)
    }

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section_project',
        start: 'top 0%',
        end: `+=${getScrollAmount() * -1}`,
        // markers: true,
        scrub: 1,
        pin: true,
      },
    })

    mainTl.to(sectionHorizontal, { x: getScrollAmount, ease: 'none' })

    // Animate on Load
    const onloadTl = gsap.timeline()

    onloadTl
      .fromTo(
        '.main_image.is-hero',
        { clipPath: 'inset(0% 100% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power3.out', duration: 2 }
      )
      .from(
        '.main_image.is-hero img, .project_description_image.is-1 img',
        { scale: 1.2, duration: 5, ease: 'power3.out' },
        '<'
      )
      .fromTo(
        '.project_description_image.is-1',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power3.out', duration: 2 },
        '<'
      )

    const clipImages = document.querySelectorAll('[animate-clip-image]')

    clipImages.forEach((image, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: image,
          containerAnimation: mainTl,
          start: 'left 75%',
          //   end: 'bottom 50%',
          markers: true,
        },
      })

      tl.fromTo(
        image,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', ease: 'power3.out', duration: 2 }
      ).from(
        image.querySelector('img'),
        { scale: 1.2, duration: 5, ease: 'power3.out' },
        '<'
      )
    })
  }

  if (window.innerWidth > 991) {
    horizontalScroll()
  }
})
