import gsap from 'gsap'

export const sectionBio = () => {
  // Calculate VH & VW in GSAP
  const vh = (coef) => window.innerHeight * (coef / 100)
  const vw = (coef) => window.innerWidth * (coef / 100)

  const animationOnDesktopTablet = () => {
    const sectionHorizontal = document.querySelector('[bio-section-list]')
    const getScrollAmount = () => {
      let sectionHorizontalWidth = sectionHorizontal.scrollWidth
      return -(sectionHorizontalWidth - window.innerWidth)
    }

    const imageTl = gsap.timeline({ paused: true })

    imageTl
      .fromTo(
        '[bio-image]',
        { clipPath: 'inset(50% round 12.1vw)' },
        { clipPath: 'inset(0% round 12.1vw)', ease: 'expo.out', duration: 1 }
      )
      .from(
        '[bio-image-outline]',
        {
          borderColor: '#95634d',
        },
        '<75%'
      )

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[bio-section-trigger]',
        start: 'top 0%',
        end: `+=${getScrollAmount() * -1}`,
        // markers: true,
        pin: true,
        scrub: 1,
        // invalidateOnRefresh: true,
        onEnter: (self) => {
          imageTl.play()
        },
      },
    })

    tl.to(sectionHorizontal, { x: getScrollAmount })

    // Animate Each Section
    const sections = document.querySelectorAll('[bio-section-item]')

    sections.forEach((section, index) => {
      const sectionContent = section.querySelectorAll('.char')
      const sectionLines = section.querySelectorAll('[bio-line]')
      const sectionContentTrigger = section.querySelector('[bio-content-list]')

      const sectionTl = gsap.timeline({
        scrollTrigger: {
          containerAnimation: tl,
          trigger: section,
          start: 'left 0%',
          //   markers: true,
        },
      })

      sectionTl
        .from(sectionLines, {
          scaleX: 0,
          transformOrigin: '0% 50%',
          stagger: { amount: 0.5 },
          ease: 'expo.out',
          duration: 2,
        })
        .from(sectionContent, { y: '100%' }, '<35%')

      const sectionContentScrub = gsap.timeline({
        scrollTrigger: {
          trigger: sectionContentTrigger,
          containerAnimation: tl,
          scrub: true,
          start: `left ${vw(-25)}`,
          end: `right ${vw(125)}`,
          //   markers: true,
        },
      })

      sectionContentScrub.fromTo(
        sectionContent,
        { color: '#824D28' },
        {
          color: '#ffffff',
          stagger: {
            each: 0.01,
          },
        }
      )
    })
  }

  if (window.innerWidth > 767) {
    animationOnDesktopTablet()
  }

  const animationOnMobile = () => {
    const sectionContent = document.querySelectorAll('[bio-section-list] .char')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[bio-section-trigger]',
        start: 'top 70%',
        end: 'bottom 100%',
        // markers: true,
        scrub: 1,
      },
    })

    tl.fromTo(
      '[bio-image]',
      { clipPath: 'inset(50% round 20vw)' },
      { clipPath: 'inset(0% round 20vw)', ease: 'expo.out', duration: 1 }
    )
      .from(
        '[bio-image-outline]',
        {
          borderColor: '#95634d',
        },
        '<75%'
      )
      .fromTo(
        sectionContent,
        { color: '#824D28' },
        {
          color: '#ffffff',
          stagger: {
            each: 0.01,
          },
        }
      )
  }

  if (window.innerWidth < 767) {
    animationOnMobile()
  }
}
