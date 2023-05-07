// CURSOR

class MotionBlur {
    constructor() {
      this.root = document.body
      this.cursor = document.querySelector(".curzr")
      this.filter = document.querySelector(".curzr-motion-blur")
  
      this.position = {
        distanceX: 0, 
        distanceY: 0,
        pointerX: 0,
        pointerY: 0,
      },
      this.previousPointerX = 0
      this.previousPointerY = 0
      this.angle = 0
      this.previousAngle = 0
      this.angleDisplace = 0
      this.degrees = 57.296
      this.cursorSize = 25
      this.moving = false
  
      this.cursorStyle = {
        boxSizing: 'border-box',
        position: 'fixed',
        top: `${ this.cursorSize / -2 }px`,
        left: `${ this.cursorSize / -2 }px`,
        zIndex: '2147483647',
        width: `${ this.cursorSize }px`,
        height: `${ this.cursorSize }px`,
        borderRadius: '50%',
        overflow: 'visible',
        transition: '200ms, transform 10ms',
        userSelect: 'none',
        pointerEvents: 'none'
      }
  
      this.init(this.cursor, this.cursorStyle)
    }
  
    init(el, style) {
      Object.assign(el.style, style)
      this.cursor.removeAttribute("hidden")
      
    }
  
    move(event) {
      this.previousPointerX = this.position.pointerX
      this.previousPointerY = this.position.pointerY
      this.position.pointerX = event.pageX + this.root.getBoundingClientRect().x
      this.position.pointerY = event.pageY + this.root.getBoundingClientRect().y
      this.position.distanceX = Math.min(Math.max(this.previousPointerX - this.position.pointerX, -20), 20)
      this.position.distanceY = Math.min(Math.max(this.previousPointerY - this.position.pointerY, -20), 20)
  
      this.cursor.style.transform = `translate3d(${this.position.pointerX}px, ${this.position.pointerY}px, 0)`
      this.rotate(this.position)
      this.moving ? this.stop() : this.moving = true
    }
  
    rotate(position) {
      let unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * this.degrees
      
      if (isNaN(unsortedAngle)) {
        this.angle = this.previousAngle
      } else {
        if (unsortedAngle <= 45) {
          if (position.distanceX * position.distanceY >= 0) {
            this.angle = +unsortedAngle
          } else {
            this.angle = -unsortedAngle
          }
          this.filter.setAttribute('stdDeviation', `${Math.abs(this.position.distanceX / 2)}, 0`)
        } else {
          if (position.distanceX * position.distanceY <= 0) {
            this.angle = 180 - unsortedAngle
          } else {
            this.angle = unsortedAngle
          }
          this.filter.setAttribute('stdDeviation', `${Math.abs(this.position.distanceY / 2)}, 0`)
        }
      }
      this.cursor.style.transform += ` rotate(${this.angle}deg)`
      this.previousAngle = this.angle
    }
  
    stop() {
      setTimeout(() => {
        this.filter.setAttribute('stdDeviation', '0, 0')
        this.moving = false
      }, 50)
    }
  
    remove() {
      this.cursor.remove()
    }
  }
  
  (() => {
    const cursor = new MotionBlur()
    if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      document.onmousemove = function (event) {
        cursor.move(event)
      }
    } else {
      cursor.remove()
    }
  })()