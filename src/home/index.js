console.log('Hello from Home folder')

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { sectionBio } from './section-bio'
import { sectionGallery } from './section-gallery'
import { sectionJournelScroll } from './section-journal'
import { sectionDraggable } from './section-draggable'
import { Draggable } from 'gsap/Draggable'
import { sectionDiscover } from './section-discover'
import { sectionPhilosophy } from './section-philosophy'
import { sectionWork } from './section-work'
import { sectionFooter } from './section-footer'

window.addEventListener('DOMContentLoaded', (event) => {
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

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Draggable)

  /** Run all the functions below for each sections */
  sectionGallery()

  sectionBio()

  sectionDiscover()

  sectionPhilosophy()

  sectionWork()

  sectionJournelScroll()

  sectionDraggable()

  sectionFooter()

  // Add the resize event listener to clear and re-run the ScrollTrigger
  window.addEventListener('resize', () => {
    // Clear the previous ScrollTrigger
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true))

    // Re-run the animationTl function to set up the new ScrollTrigger
    sectionGallery()

    sectionBio()

    sectionDiscover()

    sectionPhilosophy()

    sectionWork()

    sectionJournelScroll()

    sectionDraggable()

    sectionFooter()
  })
})
