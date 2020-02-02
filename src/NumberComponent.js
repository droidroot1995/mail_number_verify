/* eslint-disable class-methods-use-this */
const template = document.createElement('template')

template.innerHTML = `
<style>
.phone {
  display: flex;
  width: fit-content;
  height: fit-content;
  align-content: center;
}

.wrapper.error > .phone > .number {
  border: 1px solid #f00;
}

.wrapper.error > .error_msg {
  display: block;
}

.error_msg {
  font-size: 12px;
  font-weight: 600;
  color: #f00;
  display: none;
}

.symbol {
  flex: 1 1 auto;
  
  display: inline-block;
  margin: 2px;
  background: #fff;
  font-size: 20px;
  font-weight: bold;
  line-height: 32px;

  max-width: 10px;
}

.digit {
  flex: 1 1 auto;
  
  display: inline-block;
  margin: 2px;
  background: #f0f0f0;
  font-size: 20px;
  font-weight: bold;
  width: 25px;
  max-width: 25px;
  height: 32px;
  max-height: 32px;

  width: -moz-calc(30px);
  height: -moz-calc(40px);

  text-align: center;
  line-height: 32px;
}

.number {
  flex: 1 1 auto;
  
  display: inline-block;
  margin: 2px;
  background: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  width: 25px;
  max-width: 25px;
  height: 30px;
  max-height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 2px;
}

.number:active {
  border: 1px solid rgba(0, 0, 0, 0.48);
}

@media screen and (max-width: 320px) {
  .number {
    width: 18px;
    max-width: 18px;
  }

  .digit {
    width: 18px;
    max-width: 18px;
  }
}

@media screen and (min-width: 321px) and (max-width: 389px) {
  .number {
    width: 22px;
    max-width: 22px;
  }

  .digit {
    width: 22px;
    max-width: 22px;
  }
}

@media screen and (min-width: 390px) and (max-width: 480px) {
  .number {
    width: 25px;
    max-width: 25px;
  }

  .digit {
    width: 25px;
    max-width: 25px;
  }
}

@media screen and (min-width: 481px) and (max-width: 767px) {
  .number {
    width: 20px;
    max-width: 20px;
  }

  .digit {
    width: 20px;
    max-width: 20px;
  }
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .number {
    width: 20px;
    max-width: 20px;
  }

  .digit {
    width: 20px;
    max-width: 20px;
  }
}

@media screen and (min-width: 992px) and (max-width: 1199px) {
  .number {
    width: 20px;
    max-width: 20px;
  }

  .digit {
    width: 20px;
    max-width: 20px;
  }
}

@media screen and (min-width: 1200px) {
  .number:hover {
    border: 1px solid rgba(0, 0, 0, 0.24);
  }

  .wrapper.error > .phone > .number:hover {
    border: 1px solid rgba(0, 0, 0, 0.24);
  }
}

</style>
<div class="wrapper">
  <div class="phone"></div>
  <div class="error_msg">Неверный номер, попробуйте ещё раз</div>
</div>
`

export class NumberComponent extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(template.content.cloneNode(true))
    this.$wrapper = this.shadowRoot.querySelector('.wrapper')
    this.$phone = this.shadowRoot.querySelector('.phone')
    this.$mask = '+7(III)III-II-II'
  }

  connectedCallback() {
    const mask = this.getAttribute('mask')
    this.setMask(mask)
  }

  /**
   * 
   * Checks the validity of input mask
   * Mask will be parsed and will be checked for main elements, 
   * that are contained in the number 
   * If mask is valid, returns list of symbols, else returns -1
   * Can be called without creating the entitys of class object
   * 
   * */

  static checkMask(mask) {
    if(mask !== undefined && mask !== null && mask !== '' && typeof mask === 'string'){
      const str = mask.split('')
      let plus = 0
      let lPar = 0
      let rPar = 0
      let line = 0
      let other = 0

      str.forEach((s) => {
        switch(s) {
          case '+':
            plus += 1
            break
          case '(':
            lPar += 1
            break
          case ')':
            rPar += 1
            break
          case '-':
            line += 1
            break
          case 'X':
          case 'x':
          case 'I':
          case 'i':
          case '*':
          case '0':
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
          case '7':
          case '8':
          case '9':
            break
          default:
            other += 1
            break       
        }
      })

      if(plus === 1 && lPar === 1 && rPar === 1 && line > 1 && other === 0) {
        return str
      }
    }
    return -1
  }

   /**
   * 
   * Checks symbols in list and generates html, using these rules:
   * "I" - one-digit input
	 * "X" - grey block, that contains "X" symbol
	 * "*" - grey block, that contains "●" symbol
	 * <digit> - grey block, that contains digit
	 * <other symbol> - block, tha contains symbol
   * 
   * */

  parseMask(mask) {
    this.$phone.innerHTML = ''
    let elem = null
    mask.forEach((s) => {
      switch (s) {
        case '+':
        case '(':
        case ')':
        case '-':
          elem = document.createElement('div')
          elem.innerHTML = s
          elem.className = 'symbol'
          this.$phone.appendChild(elem)
          break
        case 'X':
        case 'x':
        case '*':
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          elem = document.createElement('div')
          if(s === "*") {
            elem.innerHTML = '●'
          }
          else {
            elem.innerHTML = s
          }
          elem.className = 'digit'
          this.$phone.appendChild(elem)
          break
        case 'I':
        case 'i':
          elem = document.createElement('input')
          elem.maxLength = 1
          elem.className = 'number'
          elem.onkeypress = (event) => {
            return event.charCode >= 48 && event.charCode <= 57
          }
          elem.placeholder = '_'
          this.$phone.appendChild(elem)
          break
        default:
          break
      }
    })
  }
  
  /**
   * 
   * Checks the validity of mask, sets it and generate html
   * 
   * */

  setMask(mask) {
    const chMask = NumberComponent.checkMask(mask)
    if(chMask !== -1){
      this.$mask = mask
      this.parseMask(chMask)
    }
    else if(this.$mask === undefined || this.$mask === null || this.$mask === ''){
      this.$mask = '+7(III)III-II-II'
      this.parseMask(this.$mask.split(''))
    }
  }

  /**
   * 
   * Mask setter
   * 
   * */

  set Mask(mask) {
    this.setMask(mask)
  }

  /**
   * 
   * Input error setter
   * 
   * */

  set Error(error) {
    if(error) {
      this.$wrapper.className = 'wrapper error'
    }
    else {
      this.$wrapper.className = 'wrapper'
    }
  }

  /**
   * 
   * Generates string, that contains phone number, 
   * built from values of html elements
   * 
   * */

  get PhoneNumber() {
    const {children} = this.$phone
    let phone = ''
    if(children !== undefined && children !== null && children !== []) {
      children.forEach((child) => {
        switch(child.className) {
          case 'symbol':
          case 'digit':
            phone += child.innerHTML
            break
          case 'number':
            phone += child.value
            break
          default:
            break
        }
      })
    }
    return phone
  }
}
