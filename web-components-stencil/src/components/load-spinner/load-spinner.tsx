import {h, Component} from "@stencil/core";


@Component({
  tag:'uc-loading-spinner',
  styleUrl:'./load-spinner.css',
  shadow:true
})
export class LoadSpinner{

  render(){
    return <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  }
}
