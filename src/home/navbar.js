import gsap from 'gsap'

export const navbarAnimation = () => {
  const menuTimeline = gsap.timeline({ paused: true, reversed: true })
  const menuButton = document.querySelector('.nav_menu-button')
  const line1 = document.querySelector('.nav_button-line-1')
  const line2 = document.querySelector('.nav_button-line-2')
  const line3 = document.querySelector('.nav_button-line-3')

  let isOpen = false

  menuTimeline
    .set('.nav_menu-wrap', {
      pointerEvents: 'auto',
    })
    .to('.nav_menu-wrap', {
      opacity: 1,
      duration: 0.3,
      ease: 'power1.out',
    })
    .fromTo(
      '.nav_link',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
      },
      '-=0.2'
    )

  // Hamburger Animation for Tablet and Below (991px)
  const hamburgerTimeline = gsap.timeline({ paused: true, reversed: true })
  hamburgerTimeline
    .to(line1, { y: 8, duration: 0.3, ease: 'power2.out' })
    .to(line3, { y: -8, duration: 0.3, ease: 'power2.out' }, '<')
    .to(line1, { rotation: 45, duration: 0.2, ease: 'power2.out' })
    .to(line2, { rotation: -45, duration: 0.2, ease: 'power2.out' }, '<')
    .to(line3, { rotation: -45, duration: 0.2, ease: 'power2.out' }, '<')

  menuButton.addEventListener('click', () => {
    menuTimeline.reversed() ? menuTimeline.play() : menuTimeline.reverse()

    isOpen = !isOpen
    if (isOpen) {
      menuButton.querySelector('.nav_menu-text').textContent = 'close'
    } else {
      menuButton.querySelector('.nav_menu-text').textContent = 'menu'
    }

    // Check screen width and play hamburger animation if below 991px
    if (window.innerWidth <= 991) {
      hamburgerTimeline.reversed()
        ? hamburgerTimeline.play()
        : hamburgerTimeline.reverse()
    }
  })

  // Reset hamburger animation on window resize above 991px
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991) {
      gsap.set([line1, line3], { y: 0, rotation: 0 })
      gsap.set(line2, { opacity: 1 })
      hamburgerTimeline.reverse(true)
    }
  })
}

export const navbarToggle = () => {
  // Get the navbarOverlay element
  const navbarTriggers = document.querySelectorAll('[navbar-toggle]')

  navbarTriggers.forEach((trigger) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        markers: true,
        start: 'top 5%',
        onToggle: (self) => {
          // Hide Navbar in this section
          if (self.isActive) {
            gsap.to('.navbar', {
              y: '-110%',
              duration: 1,
              ease: 'power3.out',
              overwrite: true,
            })
          } else {
            gsap.to('.navbar', {
              y: '0%',
              duration: 0.5,
              ease: 'power3.out',
              clearProps: 'transform',
              overwrite: true,
            })
          }
        },
      },
    })
  })
}
navbarToggle()
