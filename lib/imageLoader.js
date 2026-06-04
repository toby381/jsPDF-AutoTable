/**
 * imageLoader.js
 * --------------
 * Pre-loads all images referenced in the Techpack data object before
 * any PDF generation begins. This guarantees every section receives
 * fully resolved image objects (base64 + dimensions) and never has to
 * do async work itself.
 *
 * How it works:
 *   1. Scans the data object for all unique imagePath strings.
 *   2. Fetches all of them in parallel via Promise.all + getDataUri().
 *   3. Returns a new data object where every imagePath has been replaced
 *      with a resolved img object: { base64, width, height }.
 *
 * Known imagePath locations:
 *   data.mainIllustration.imagePath
 *   data.variantIllustration.imagePath
 *   data.drawings.pages[].cells[].imagePath
 *
 * Usage:
 *   preloadImages() is called internally by techpack.generateAll() and
 *   techpack.generateSection() — you do not need to call it directly.
 *   Both public functions pre-load images before rendering begins.
 */
async function preloadImages(data) {
  // Collect every unique imagePath across the whole data object
  var pathSet = {}

  if (data.mainIllustration && data.mainIllustration.imagePath) {
    pathSet[data.mainIllustration.imagePath] = true
  }

  if (data.variantIllustration && data.variantIllustration.imagePath) {
    pathSet[data.variantIllustration.imagePath] = true
  }

  if (data.drawings && data.drawings.pages) {
    data.drawings.pages.forEach(function (page) {
      if (page.cells) {
        page.cells.forEach(function (cell) {
          if (cell.imagePath) {
            pathSet[cell.imagePath] = true
          }
        })
      }
    })
  }

  var paths = Object.keys(pathSet)

  // Fetch all images in parallel
  var results = await Promise.all(
    paths.map(function (path) {
      return getDataUri(path).then(function (img) {
        return { path: path, img: img }
      })
    })
  )

  // Build a lookup map: imagePath → img object
  var imgMap = {}
  results.forEach(function (result) {
    imgMap[result.path] = result.img
  })

  // Return a new data object with imagePath strings replaced by resolved img objects.
  // We deep-clone only the parts we modify to avoid mutating the original data.
  var resolved = Object.assign({}, data)

  if (data.mainIllustration && data.mainIllustration.imagePath) {
    resolved.mainIllustration = Object.assign({}, data.mainIllustration, {
      img: imgMap[data.mainIllustration.imagePath]
    })
  }

  if (data.variantIllustration && data.variantIllustration.imagePath) {
    resolved.variantIllustration = Object.assign({}, data.variantIllustration, {
      img: imgMap[data.variantIllustration.imagePath]
    })
  }

  if (data.drawings && data.drawings.pages) {
    resolved.drawings = Object.assign({}, data.drawings, {
      pages: data.drawings.pages.map(function (page) {
        return Object.assign({}, page, {
          cells: page.cells.map(function (cell) {
            if (cell.imagePath && imgMap[cell.imagePath]) {
              return Object.assign({}, cell, { img: imgMap[cell.imagePath] })
            }
            return cell
          })
        })
      })
    })
  }

  return resolved
}
