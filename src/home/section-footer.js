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
        gsap.to(thankYouBlock, {
          y: '-26%',
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        })
      },
    })

    timeline.to(form, {
      y: '100%',
      duration: 0.8,
      ease: 'power3.in',
      onComplete: () => gsap.set(form, { display: 'none' }),
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
}
