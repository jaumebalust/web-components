class InfoBox extends HTMLElement {

    constructor() {
        super();
        this._infoBox;
        this._button;
        this._isHidden = true

        this.attachShadow({mode:'open'})

        this.shadowRoot.innerHTML = `
            <style>
              #info-box {
                display: none;
              }
            </style>
              
            <button>Show</button>
            <p id="info-box"><slot></slot></p>`

    }

    connectedCallback(){
        //dom is ready here

        this._button = this.shadowRoot.querySelector('button')
        this._button.addEventListener('click', () => {
                if (this._isHidden) {
                    this._showInfoBox()
                } else {
                    this._hideInfoBox()
                }
            })
        if (this.hasAttribute('hideInitial')){
            this._isHidden = (this.getAttribute('hideInitial') === 'true');

            if (!this._isHidden){

                this._showInfoBox()
            }
        }
    }

    _showInfoBox(){
        this._infoBox = this.shadowRoot.querySelector('#info-box')
        this._infoBox.style.display = 'block';
        this._button.textContent = 'Hide';
        this._isHidden = false;
    }
    _hideInfoBox(){
        this._infoBox.style.display = 'none';
        this._button.textContent = 'Show';
        this._isHidden = true;
    }
}

//double words guarantees we don't overwrite native components.
customElements.define('ak-info-box',InfoBox)
