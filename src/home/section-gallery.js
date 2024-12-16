import gsap from 'gsap'

export const sectionGallery = () => {
  // Scroll to top immediately when page loads
  const topSection = document.getElementById('top')

  //   window.addEventListener('load', () => {
  //     window.scrollTo(0, 0)
  //   })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0 // For older browsers

  // Scroll to top immediately when page loads
  //   gsap.to(document, {
  //     duration: 0,
  //     scrollTo: 0,
  //   })

  if (topSection) {
    console.log('instant', window.screenY)
    //   topSection.scrollIntoView({ behavior: 'instant' })
    // window.location.href = '/testing'
  }

  // Disable scrolling function
  const disableScroll = () => {
    document.body.style.overflow = 'hidden'
  }
  // Enable scrolling function
  const enableScroll = () => {
    document.body.style.overflow = 'auto'
  }

  // Disable scroll immediately
  disableScroll()
  // Run the function after 1 second
  //   setTimeout(disableScroll, 1000)

  const heroTiles = document.querySelectorAll('[hero-loader-image]')
  const heroTilesTl = gsap.timeline({ onComplete: enableScroll })
  heroTilesTl
    .from('[hero-top-text]', { y: '125%', duration: 1 })
    .from(
      '[hero-mid-text]',
      { x: '20%', opacity: 0, stagger: 0.1, duration: 1 },
      0
    )

  heroTiles.forEach((tile) => {
    heroTilesTl.to(tile, {
      opacity: 1,
      delay: 1,
      duration: 1,
    })
  })
  heroTilesTl.to('.home_hero_content', { opacity: 0 })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.home_hero_gallery',
      start: 'top 0%',
      end: '+=5000',
      //   markers: true,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        if (self.progress > 0.00001) {
          if (window.innerWidth > 767) {
            gsap.to('[door-top-text]', { y: '125%' })
            gsap.to('[door-mid-text]', { x: '5%', opacity: 0, stagger: 0.1 })
          }
          if (window.innerWidth < 767) {
            gsap.to('[door-top-text]', { y: '200%' })
            gsap.to('[door-mid-text]', { x: '15%', opacity: 0, stagger: 0.1 })
          }
        } else {
          gsap.to('[door-top-text]', { y: '0%' })
          gsap.to('[door-mid-text]', { x: '0%', opacity: 1, stagger: 0.1 })
        }
      },
    },
  })

  tl.to('[gallery-door-open="left"]', { x: '-100%', ease: 'power3.out' })
    .to('[gallery-door-open="right"]', { x: '100%', ease: 'power3.out' }, '<')
    .from(
      '[gallery-image]',
      { scale: 0, x: 0, y: 0, stagger: { each: 0.2 } },
      '<25%'
    )
  if (window.innerWidth > 767) {
    tl.to('[gallery-image]', { opacity: 0, stagger: { each: 0.2 } }, '<25%').to(
      '[gallery-door-close="left"], [gallery-door-close="right"]',
      { x: '0%', ease: 'power3.out' },
      '<75%'
    )
  }
  if (window.innerWidth < 767) {
    tl.to('[gallery-door-close="left"], [gallery-door-close="right"]', {
      x: '0%',
      ease: 'power3.out',
    })
  }
}
