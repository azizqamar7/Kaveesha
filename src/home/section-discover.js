import gsap from 'gsap'

export const sectionDiscover = () => {
  // Home Discover Items Parallax
  function homeDiscoverParallax() {
    const items = document.querySelectorAll('.home-discover_item')

    if (items.length > 0) {
      items.forEach((item) => {
        const isSmaller = item.hasAttribute('smaller')
        const initialY = isSmaller ? 200 : 100
        const finalY = isSmaller ? -240 : -120

        gsap.fromTo(
          item,
          { y: initialY },
          {
            y: finalY,
            duration: isSmaller ? 8 : 8.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 100%',
              end: 'top 0%',
              scrub: true,
            },
          }
        )
      })
    }
  }

  //   homeDiscoverParallax()

  // Home Discover Stagger Animation (for 767px and below)
  function homeDiscoverStaggerAnimation() {
    const discoverWrapper = document.querySelector('.home-discover_items-wrap')
    const heading = document.querySelector('.home-discover_heading')
    const items = document.querySelectorAll('.home-discover_item')

    const discoverTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: discoverWrapper,
        start: 'top 70%',
        end: 'bottom bottom',
      },
    })

    discoverTimeline.fromTo(
      heading,
      { opacity: 0, rotation: 18 },
      { opacity: 1, rotation: 0, duration: 0.6, ease: 'power2.out' }
    )

    discoverTimeline.fromTo(
      items,
      { opacity: 0, y: '2rem' },
      {
        opacity: 1,
        y: '0rem',
        stagger: 0.2,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: discoverWrapper,
          start: 'top 70%',
          end: 'bottom bottom',
          scrub: true, // Enable scrub for the items
        },
      },
      '-=0.3'
    )
  }

  //   homeDiscoverStaggerAnimation()

  // Home Discover Link Circle Rotation
  function homeDiscoverCircleRotation() {
    gsap.to('.home-discover_link-svg', {
      rotation: 360,
      duration: 12,
      repeat: -1,
      ease: 'linear',
      transformOrigin: 'center center',
    })

    gsap.to('.home-discover_link-arrow', {
      rotation: -360,
      duration: 12,
      repeat: -1,
      ease: 'linear',
      transformOrigin: 'center center',
    })
  }

  homeDiscoverCircleRotation()

  if (window.innerWidth > 768) {
    homeDiscoverParallax()
  }
  if (window.innerWidth < 767) {
    homeDiscoverStaggerAnimation()
  }
}
