/**
 * Loads an image URL into a canvas and returns a base64 JPEG data URI
 * along with the original natural dimensions.
 *
 * @param {string} url - Path or URL to the image file.
 * @returns {Promise<{base64: string, width: number, height: number}>}
 */
function getDataUri(url) {
  return new Promise(function (resolve, reject) {
    var image = new Image()
    image.setAttribute('crossOrigin', 'anonymous')

    image.onload = function () {
      var canvas = document.createElement('canvas')
      canvas.width = this.naturalWidth
      canvas.height = this.naturalHeight

      // Fill white background so transparent PNGs look correct in PDF
      var ctx = canvas.getContext('2d')
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(this, 0, 0)

      resolve({
        base64: canvas.toDataURL('image/jpeg'),
        width: canvas.width,
        height: canvas.height,
      })
    }

    image.onerror = function () {
      reject(new Error('Failed to load image: ' + url))
    }

    image.src = url
  })
}

/**
 * Extracts a jsPDF-compatible format string from a base64 data URI.
 * Falls back to 'JPEG' if the format cannot be determined.
 *
 * Use this instead of hardcoding 'JPEG' so PNG, WebP, etc. from the
 * PLM API are rendered correctly in generated PDFs.
 *
 * @param {string} base64 - A data URI e.g. "data:image/png;base64,..."
 * @returns {string} - e.g. 'JPEG', 'PNG', 'WEBP'
 */
function imgFormatFromDataUri(base64) {
  var match = base64.match(/^data:image\/([a-zA-Z]+);/)
  if (!match) return 'JPEG'
  var mime = match[1].toUpperCase()
  // jsPDF uses 'JPEG' not 'JPG'
  if (mime === 'JPG') return 'JPEG'
  return mime
}
