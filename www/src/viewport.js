export class Viewport {
  constructor(el) {
    this.el = el
  }

  clear() {
    const pixelRatio = window.devicePixelRatio || 1

    const size = Math.min(window.innerWidth - 500, window.innerHeight - 50)

    this.el.width = size * pixelRatio
    this.el.height = size * pixelRatio
    this.el.style.width = `${size}px`
    this.el.style.height = `${size}px`

    this.ctx = this.el.getContext('2d')
    this.ctx.clearRect(0, 0, this.#size(), this.#size())
  }

  drawCircle(x, y, radius, style) {
    x *= this.#size()
    y *= this.#size()
    radius *= this.#size()

    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI)
    this.ctx.fillStyle = style
    this.ctx.fill()
  }

  drawArc(x, y, radius, startAngle, endAngle, style) {
    x *= this.#size()
    y *= this.#size()
    radius *= this.#size()

    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, startAngle, endAngle)
    this.ctx.strokeStyle = style
    this.ctx.lineWidth = 0.002 * this.#size()
    this.ctx.stroke()
  }

  drawTriangle(x, y, size, rotation, style) {
    x *= this.#size()
    y *= this.#size()
    size *= this.#size()

    this.ctx.beginPath()

    this.ctx.moveTo(
      x - Math.sin(rotation) * size * 1.5,
      y + Math.cos(rotation) * size * 1.5,
    )

    this.ctx.lineTo(
      x - Math.sin(rotation + (2.0 / 3.0) * Math.PI) * size,
      y + Math.cos(rotation + (2.0 / 3.0) * Math.PI) * size,
    )

    this.ctx.lineTo(
      x - Math.sin(rotation - (2.0 / 3.0) * Math.PI) * size,
      y + Math.cos(rotation - (2.0 / 3.0) * Math.PI) * size,
    )

    this.ctx.lineTo(
      x - Math.sin(rotation) * size * 1.5,
      y + Math.cos(rotation) * size * 1.5,
    )

    this.ctx.fillStyle = style
    this.ctx.fill()
  }

  #size() {
    return this.el.width
  }
}
