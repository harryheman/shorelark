export class Terminal {
  constructor(inputEl, outputEl) {
    this.inputEl = inputEl
    this.outputEl = outputEl

    this.state = {
      id: 'idle',
    }

    this.history = []

    this.inputEl.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'Enter':
          this.#handleEnter(e)
          break
        case 'ArrowUp':
          this.#handleArrowUp(e)
          break
        case 'ArrowDown':
          this.#handleArrowDown(e)
          break
        default:
          if (this.state.id === 'browsing-history') {
            this.state.id = 'idle'
          }
      }
    })
  }

  onInput(fn) {
    this.onInputHandler = fn
  }

  println(msg) {
    if (this.outputEl.value) {
      this.outputEl.value += '\n'
    }

    this.outputEl.value += msg
    this.outputEl.scrollTop = this.outputEl.scrollHeight
  }

  scrollToTop() {
    this.inputEl.focus()
    this.outputEl.scrollTop = 0
  }

  #handleEnter(e) {
    e.preventDefault()

    const value = this.inputEl.value.trim()

    if (value.length > 0) {
      this.history.push(value)

      if (this.onInputHandler) {
        this.onInputHandler(value)
      }
    }

    this.inputEl.value = ''

    this.state.id = 'idle'
  }

  #handleArrowUp(e) {
    e.preventDefault()

    switch (this.state.id) {
      case 'idle':
        if (this.history.length === 0 || this.inputEl.value.length > 0) {
          return
        }

        this.state = {
          id: 'browsing-history',
          historyIdx: 1,
        }

        this.inputEl.value = this.history.at(-1)
        break

      case 'browsing-history':
        if (this.state.historyIdx < this.history.length) {
          this.state.historyIdx += 1

          this.inputEl.value =
            this.history[this.history.length - this.state.historyIdx]
        } else {
          this.inputEl.value = ''
        }
        break

      default:
        break
    }
  }

  #handleArrowDown(e) {
    e.preventDefault()

    if (this.state.id === 'browsing-history') {
      if (this.state.historyIdx > 1) {
        this.state.historyIdx -= 1

        this.inputEl.value =
          this.history[this.history.length - this.state.historyIdx]
      } else {
        this.inputEl.value = ''
      }
    }
  }
}
