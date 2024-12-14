console.log('Hello from Home folder')

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sectionBio } from './section-bio'

window.addEventListener('DOMContentLoaded', (event) => {
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

  gsap.registerPlugin(ScrollTrigger)

  /** Run all the functions below for each sections */
  sectionBio()

  // Add the resize event listener to clear and re-run the ScrollTrigger
  window.addEventListener('resize', () => {
    // Clear the previous ScrollTrigger
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true))

    // Re-run the animationTl function to set up the new ScrollTrigger
    sectionBio()
  })
})
