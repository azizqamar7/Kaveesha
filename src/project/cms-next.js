export const cmsNextJs = () => {
  const cmsList = document.querySelector('[cms-list]')
  const cmsNext = document.querySelector('[cms-next]')
  const cmsItems = cmsList.querySelectorAll('[cms-item]')

  if (!cmsList || !cmsNext || !cmsItems.length) return

  // Find current item index
  const currentItemIndex = Array.from(cmsItems).findIndex((item) => {
    const itemURL = item.querySelector('a')
    console.log(itemURL.getAttribute('href'))
    return window.location.pathname === itemURL.getAttribute('href')
  })

  if (currentItemIndex === -1) return

  // Get next item or first item if current is last
  const nextItem = cmsItems[currentItemIndex + 1] || cmsItems[0]

  // Clone and append to cms-next
  const clonedItem = nextItem.cloneNode(true)
  cmsNext.appendChild(clonedItem)

  // Remove cms-list
  cmsList.remove()
}
