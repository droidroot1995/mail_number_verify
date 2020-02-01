import { NumberComponent } from '../src/NumberComponent'

export default {
  title: 'NumberComponent Demo',
}

customElements.define('number-component', NumberComponent)

export const NumComponent = () => '<number-component class="nc" mask="+7(985)0II-**-**" style="margin: 10px;"></number-component>'
export const NumberComponentError = () => {
  const nc = document.createElement('number-component')
  nc.className = "nce"
  nc.style = 'margin: 10px;'
  nc.Mask = '+7(985)0II-**-**'
  nc.Error = true
  return nc
}