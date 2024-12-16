import gsap from 'gsap'

export const sectionPhilosophy = () => {
  const headings = document.querySelectorAll('.our-philosophy_heading')
  const subTexts = document.querySelectorAll('.our-philosophy_small-text')
  const wrapper = document.querySelector('.our-philosophy_wrapper')

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      start: 'top 40%',
    },
  })

  tl.from(headings, {
    opacity: 0,
    rotate: 10,
    y: 50,
    stagger: 0.2,
    duration: 0.6,
    ease: 'power2.out',
  }).from(
    subTexts,
    {
      opacity: 0,
      rotate: 10,
      y: 50,
      stagger: 0.1,
      duration: 0.4,
      ease: 'power2.out',
    },
    '>-0.8'
  )
}
