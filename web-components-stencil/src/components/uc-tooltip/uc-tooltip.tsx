import {Component, h, Prop, State} from "@stencil/core";

@Component({
  tag: 'uc-tooltip',
  styleUrl: './uc-tooltip.css',
  shadow: true
})
export class UcTooltip {
  @State() showContactInfo = false;


  @Prop({reflect: true, mutable: true}) opened: boolean;


  toggleTooltip(){
    this.opened = ! this.opened
  }


  render() {

    return (
      <div>
        <slot></slot>
        <button onClick={this.toggleTooltip.bind(this)}>?</button>
        <div class="uc-tooltip" onClick={this.toggleTooltip.bind(this)}>This is the actual tooltip</div>
      </div>
    )


  }
}
