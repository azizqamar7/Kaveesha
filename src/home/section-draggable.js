import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

export const sectionDraggable = () => {
  // Get the section and drag elements
  // const sectionPan = document.querySelector('.section_pan')
  const dragPan = document.querySelector('[pan-drag]')
  const dragPanItems = document.querySelectorAll('[pan-drag-item]')

  // Draggable instances
  let dragPanInstance
  let itemDraggableInstances = []

  // Main drag pan draggability
  dragPanInstance = Draggable.create(dragPan, {
    type: 'x,y',
    edgeResistance: 1,
    bounds: {
      minX: -window.innerWidth,
      maxX: 0,
      minY: -window.innerHeight,
      maxY: 0,
    },
    // inertia: true,
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
  gsap.set(dragPan, {
    x: '-25%',
    y: '-25%',
  })

  // Nested draggable items
  dragPanItems.forEach((item, index) => {
    const itemInstance = Draggable.create(item, {
      type: 'x,y',
      bounds: dragPan,
      // inertia: true,
      cursor: 'grab',

      onDragStart: function () {
        // Disable main drag pan when item is dragged
        dragPanInstance.disable()

        gsap.to(item, {
          scale: 1.05,
          duration: 0.2,
        })
      },

      onDragEnd: function () {
        // Re-enable main drag pan when item drag ends
        dragPanInstance.enable()

        gsap.to(item, {
          scale: 1,
          duration: 0.2,
        })
      },
    })[0]

    itemDraggableInstances.push(itemInstance)
  })

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

/**
 * Section Drag Ends
 */
