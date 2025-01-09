import gsap from 'gsap'

export const sectionFooter = () => {
  // Footer Animation

  const form = document.querySelector('[footer-form]')
  const thankYouBlock = document.querySelector('[footer-tq]')
  const submitButton = form.querySelector("button[type='submit']")

  gsap.set(thankYouBlock, { display: 'none', y: '-60%', opacity: 0 })

  const validateForm = () => {
    const requiredFields = form.querySelectorAll('[required]')
    return [...requiredFields].every((field) => field.value.trim())
  }

  submitButton.addEventListener('click', (event) => {
    event.preventDefault()

    if (!validateForm()) {
      alert('Please fill in all required fields.')
      return
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.set(thankYouBlock, { display: 'flex' })
        if (window.innerWidth > 480) {
          gsap.to(thankYouBlock, {
            y: '-26%',
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          })
        }
        if (window.innerWidth < 480) {
          gsap.to(thankYouBlock, {
            y: '-8%',
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          })
        }
      },
    })

    timeline.to(form, {
      y: '200%',
      duration: 0.8,
      ease: 'power3.in',
      // onComplete: () => gsap.set(form, { display: 'none' }),
    })
  })

  submitButton.addEventListener('mouseenter', () => {
    gsap.to(submitButton, {
      rotation: -9,
      duration: 0.2,
      ease: 'power1.inOut',
      onComplete: () =>
        gsap.to(submitButton, {
          rotation: 9,
          duration: 0.2,
          ease: 'power1.inOut',
          onComplete: () =>
            gsap.to(submitButton, {
              rotation: 0,
              duration: 0.2,
              ease: 'power1.inOut',
            }),
        }),
    })
  })

  submitButton.addEventListener('mouseleave', () => {
    gsap.to(submitButton, { rotation: 0, duration: 0.2, ease: 'power1.out' })
  })

  // const changeNavTl = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: '.footer_component',
  //     start: 'top 50%',
  //     end: 'bottom 110%',
  //     markers: true,
  //     onToggle: (self) => {
  //       if (self.isActive) {
  //         gsap.to('[nav-link]', { color: '#2b4425' })
  //         console.log('Color change')
  //       } else {
  //         gsap.to('[nav-link]', { clearProps: 'all' })
  //       }
  //     },
  //   },
  // })
}
