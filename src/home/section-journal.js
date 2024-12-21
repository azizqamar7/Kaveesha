import gsap from 'gsap'

/** Section Journel Animates */
export const sectionJournelScroll = () => {
  const dragPan = document.querySelector('[pan-drag]')

  let bottomMarker = 'bottom 0%'
  if (window.innerWidth < 991) {
    bottomMarker = 'bottom 100%'
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '[section-journel-long]',
      // markers: true,
      start: 'top 0%',
      end: bottomMarker,
      scrub: 1,
      // pin: true,
      onUpdate: (self) => {
        // console.log(self.progress)
        if (window.innerWidth > 991) {
          if (self.progress > 0.8) {
            // console.log('Run')
            gsap.to('[pan-content]', { opacity: 1 })
          } else {
            gsap.to('[pan-content]', { opacity: 0 })
          }
        }
        if (!self.isActive) {
          gsap.to(dragPan, { x: '-25%', y: '-25%' })
        }
      },
    },
  })

  tl.set('[large-text-wrap]', { pointerEvents: 'none' }).set('[pan-content]', {
    opacity: 0,
  })
  if (window.innerWidth > 991) {
    tl.to('[large-text]', { x: '-100%' }, 0)
      .fromTo(
        '[pan-mask]',
        {
          clipPath: 'inset(calc(70% - 20vw) calc(70% - 20vw) round 0.75rem)',
          ease: 'power1.out',
        },
        {
          clipPath: 'inset(calc(0% - 0vw) calc(0% - 0vw) round 0.75rem)',
        },
        '<'
      )
      .to({}, { duration: 0.5 }, '<20%')
  }
  if (window.innerWidth < 991) {
    tl.fromTo(
      '[large-text] .char',
      { color: '#989898' },
      { color: '#000000', stagger: 0.2 },
      0
    )
      .fromTo(
        '[pan-mask]',
        {
          clipPath: 'inset(calc(70% - 20vw) calc(70% - 20vw) round 0.75rem)',
          ease: 'power1.out',
        },
        {
          clipPath: 'inset(calc(0% - 0vw) calc(0% - 0vw) round 0.75rem)',
          duration: 25,
        },
        '<'
      )
      .to('[large-text]', { opacity: 0, delay: 1 })
      .from('[pan-content]', { opacity: 0 })
      .from('.pan-drag-list', { opacity: 0, y: '0.5%' })
      .to({}, { duration: 5 })
  }
}
