import gsap from 'gsap'

export const sectionGallery = () => {
  // Disable scrolling function
  const disableScroll = () => {
    document.body.style.overflow = 'hidden'
  }
  // Enable scrolling function
  const enableScroll = () => {
    document.body.style.overflow = 'auto'
  }

  // Disable scroll immediately
  // if (window.innerWidth > 767) {
  disableScroll()
  // }

  const heroTiles = document.querySelectorAll('[hero-loader-image]')
  const heroTilesTl = gsap.timeline({
    onComplete: () => {
      enableScroll()

      // if (window.innerWidth > 767) {
      gsap.to(window, { duration: 2.5, scrollTo: 1200, ease: 'power2.out' })
      // }
    },
  })

  // if (window.innerWidth > 767) {
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
      delay: 0.3,
      duration: 0.4,
    })
  })
  heroTilesTl.to('.home_hero_content', { opacity: 0 })
  // }

  // if (window.innerWidth < 767) {
  // heroTilesTl
  //   .from('[door-top-text]', { y: '200%', duration: 1 })
  //   .from(
  //     '[door-mid-text]',
  //     { x: '20%', opacity: 0, stagger: 0.1, duration: 1 },
  //     0
  //   )
  // }

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

          gsap.to('.navbar', {
            y: '0%',
            duration: 0.5,
            ease: 'power3.out',
            clearProps: 'transform',
            overwrite: true,
          })
        } else {
          gsap.to('[door-top-text]', { y: '0%' })
          gsap.to('[door-mid-text]', { x: '0%', opacity: 1, stagger: 0.1 })

          gsap.to('.navbar', {
            y: '-110%',
            duration: 1,
            ease: 'power3.out',
            overwrite: true,
          })
        }
      },
      onToggle: (self) => {
        // Hide Navbar in this section
        if (self.isActive) {
          gsap.to('[nav-text]', {
            // y: '-110%',
            color: '#ffffff',
            duration: 1,
            ease: 'power3.out',
            overwrite: true,
          })
        } else {
          gsap.to('[nav-text]', {
            // y: '0%',
            duration: 0.5,
            ease: 'power3.out',
            clearProps: 'color',
            overwrite: true,
          })
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
  // if (window.innerWidth > 767) {
  tl.to('[gallery-image]', { opacity: 0, stagger: { each: 0.2 } }, '<25%').to(
    '[gallery-door-close="left"], [gallery-door-close="right"]',
    { x: '0%', ease: 'power3.out' },
    '<75%'
  )
  // }
  if (window.innerWidth < 767) {
    // tl.to('[gallery-door-close="left"], [gallery-door-close="right"]', {
    //   x: '0%',
    //   ease: 'power3.out',
    // })
  }
}
