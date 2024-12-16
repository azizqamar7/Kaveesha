import gsap from 'gsap'

/** Section Journel Animates */
export const sectionJournelScroll = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '[section-journel-long]',
      // markers: true,
      start: 'top 0%',
      end: 'bottom bottom',
      scrub: 1,
      // pin: true,
      onUpdate: (self) => {
        console.log(self.progress)
        if (self.progress > 0.8) {
          console.log('Run')
          gsap.to('[pan-content]', { opacity: 1 })
        } else {
          gsap.to('[pan-content]', { opacity: 0 })
        }
      },
    },
  })

  tl.set('[large-text-wrap]', { pointerEvents: 'none' })
    .set('[pan-content]', { opacity: 0 })
    .to('[large-text]', { x: '-100%' }, 0)
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
  //   .from('[pan-content]', { opacity: 0 }, '<75%')
}
