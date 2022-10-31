import {Component, h, Method, Prop, State} from "@stencil/core";

@Component({
  tag: 'uc-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
export class SideDrawer {
  @State() showContactInfo = false;

  @Prop({reflect: true}) thetitle: string;
  @Prop({reflect: true, mutable: true}) opened: boolean;

  onCloseDrawer() {
    this.opened = false
  }

  @Method()
  async open(){
    this.opened = true
  }


  onContentChange(content: string) {
    this.showContactInfo = content === 'contact'
  }

  render() {
    let mainContent = <slot></slot>;
    if (this.showContactInfo){
      mainContent = (
        <div>
          <h2>Contact Information</h2>
          <p>You can reach us via phone or email.</p>
          <ul>
            <li>Phone: 12349234</li>
            <li> E-mail: email@a.com</li>
          </ul>
        </div>
      )
    }

    return [
      <div class="backdrop" onClick={this.onCloseDrawer.bind(this)}></div>,
      <aside>
        <header><h1>{this.thetitle}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>x</button>
        </header>
        <section id="tabs">
          <button class={this.showContactInfo ? '':'active'} onClick={this.onContentChange.bind(this, 'nav')}>Navigation</button>
          <button class={this.showContactInfo ? 'active':''} onClick={this.onContentChange.bind(this, 'contact')}>Contact</button>
        </section>
        <main>
          <uc-tooltip>Let's test the new tooltip</uc-tooltip>
          {mainContent}
        </main>
      </aside>
      ]

  }
}
