import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

export const sectionDraggable = () => {
  // Get the section and drag elements
  // const sectionPan = document.querySelector('.section_pan')
  const dragPan = document.querySelector('[pan-drag]')
  // const dragPanItems = document.querySelectorAll('[pan-drag-item]')
  const togglePan = document.querySelector('[toggle-pan]') // Toggle button

  // Draggable instances
  let dragPanInstance
  let itemDraggableInstances = []
  let isDragEnabled
  if (window.innerWidth < 991) {
    isDragEnabled = false // State to track drag toggle
    togglePan.textContent = 'Enter'
  }

  let windowWidth = window.innerWidth
  let windowHeight = window.innerHeight
  let minYBound = windowHeight
  let minXBound = windowWidth
  if (window.innerWidth < 479) {
    minYBound = windowHeight * 0.6 + windowHeight
    minXBound = windowWidth * 0.8 + windowWidth
  }

  // Main drag pan draggability
  dragPanInstance = Draggable.create(dragPan, {
    type: 'x,y',
    edgeResistance: 1,
    bounds: {
      minX: -minXBound,
      maxX: 0,
      minY: -minYBound,
      maxY: 0,
    },
    inertia: true,
    throwProps: true,
    cursor: 'grab',
    disabled: false, // Initially enabled

    onDragStart: function () {
      gsap.to(dragPan, {
        // scale: 1.02,
        duration: 0.2,
      })
    },

    onDragEnd: function () {
      gsap.to(dragPan, {
        // scale: 1,
        duration: 0.2,
      })
    },
  })[0]

  // Initial positioning
  gsap.set(dragPan, { x: '-25%', y: '-25%' })

  // Nested draggable items
  // dragPanItems.forEach((item, index) => {
  //   const itemInstance = Draggable.create(item, {
  //     type: 'x,y',
  //     bounds: dragPan,
  //     // inertia: true,
  //     cursor: 'grab',

  //     onDragStart: function () {
  //       // Disable main drag pan when item is dragged
  //       dragPanInstance.disable()

  //       gsap.to(item, {
  //         scale: 1.05,
  //         duration: 0.2,
  //       })
  //     },

  //     onDragEnd: function () {
  //       // Re-enable main drag pan when item drag ends
  //       dragPanInstance.enable()

  //       gsap.to(item, {
  //         scale: 1,
  //         duration: 0.2,
  //       })
  //     },
  //   })[0]

  //   itemDraggableInstances.push(itemInstance)
  // })

  // Toggle drag functionality
  if (window.innerWidth < 991) {
    dragPanInstance.disable()
    togglePan.addEventListener('click', () => {
      isDragEnabled = !isDragEnabled // Toggle the state

      if (isDragEnabled) {
        dragPanInstance.enable()
        // itemDraggableInstances.forEach((instance) => instance.enable())
        togglePan.innerHTML = 'Pan to Explore<br/>[back to scroll]'
        console.log('Drag enabled')
      } else {
        dragPanInstance.disable()
        // itemDraggableInstances.forEach((instance) => instance.disable())
        togglePan.innerHTML = 'Enter Back'
        console.log('Drag disabled')
      }
    })
  }

  const journalCardIx = () => {
    const dragPanItems = document.querySelectorAll('[pan-drag-item]')

    dragPanItems.forEach((panItem, index) => {
      const panItemImage = panItem.querySelector('[pan-drag-image]')
      const hoverIntl = gsap.timeline({ paused: true })

      if (panItemImage) {
        hoverIntl.fromTo(
          panItemImage,
          {
            clipPath:
              'polygon(0 0, 100% 0, 100% 20%, 100% 100%, 70% 100%, 0 100%)',
          },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0% 0%, 0% 100%, 0 100%)',
            duration: 1,
            ease: 'power2.out',
          }
        )
      }

      // Hover on Desktop
      if (window.innerWidth > 991) {
        panItem.addEventListener('mouseenter', () => {
          dragPanInstance.disable()
          hoverIntl.restart()
        })

        panItem.addEventListener('mouseleave', () => {
          dragPanInstance.enable()
          hoverIntl.reverse()
        })
      }

      let isPanClicked = false

      if (window.innerWidth < 991) {
        panItem.addEventListener('click', () => {
          // dragPanInstance.disable()
          isPanClicked = !isPanClicked
          isPanClicked ? hoverIntl.restart() : hoverIntl.reverse()
        })

        // panItem.addEventListener('blur', () => {
        //   dragPanInstance.enable()
        //   hoverIntl.reverse()
        // })
      }
    })
  }

  journalCardIx()

  // Responsive handling
  window.addEventListener('resize', () => {
    const draggables = Draggable.get(document.querySelector('.drag-pan'))
    if (draggables && draggables.length > 0) {
      draggables[0].applyBounds({
        minX: -window.innerWidth,
        maxX: 0,
        minY: -window.innerHeight,
        maxY: 0,
      })
    }
  })
}
