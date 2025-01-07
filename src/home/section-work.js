import gsap from 'gsap'

export const sectionWork = () => {
  // Work Items Stagger Animation
  function workItemsStagger() {
    const workHeading = document.querySelector('.work_heading')
    const workItems = document.querySelectorAll('.work_item')

    gsap.from(workHeading, {
      scrollTrigger: {
        trigger: '.work_grid',
        start: 'top 80%',
      },
      opacity: 0,
      rotate: 10,
      y: 50,
      duration: 0.6,
      ease: 'power2.out',
    })

    workItems.forEach((item) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: '20%',
        duration: 0.6,
        ease: 'power2.out',
      })
    })
  }

  workItemsStagger()

  // Work Items Images Parallax
  function workImagesParallax() {
    const workImages = document.querySelectorAll('.work_item .work_img')

    workImages.forEach((img) => {
      const parent = img.closest('.work_item')

      gsap.fromTo(
        img,
        { y: 40 },
        {
          y: -40,
          scrollTrigger: {
            trigger: parent,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
          ease: 'power1.inOut',
        }
      )
    })
  }

  if (window.innerWidth < 991) {
    workImagesParallax()
  }
}
