class Tooltip extends HTMLElement{
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipText= 'Default text'

        this.attachShadow({mode:'open'})

        this.shadowRoot.innerHTML = `
            <style>
                div{
                    background-color: black;
                    color: white;
                    position: absolute;
                    z-index: 10;
                }
            </style>
            
            <slot>Some Default of slot</slot>
            <span>(?)</span>`

    }

    connectedCallback(){
        //dom is ready here
        if (this.hasAttribute('text')){
            this._tooltipText = this.getAttribute('text')
        }
        const tooltipIcon = this.shadowRoot.querySelector('span')
        tooltipIcon.addEventListener('mouseenter',this._showTooltip.bind(this))
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
        this.style.position = 'relative'
        this.shadowRoot.appendChild(tooltipIcon)
    }

    _showTooltip(){
        this._tooltipContainer= document.createElement(('div'))
        this._tooltipContainer.textContent = this._tooltipText

        this.shadowRoot.appendChild(this._tooltipContainer)
    }
    _hideTooltip(){
        this.shadowRoot.removeChild(this._tooltipContainer)
    }

}

//double words guarantees we don't overwrite native components.
customElements.define('ak-tooltip',Tooltip)



//constructor() basic initializations should go here.

//connectedCallback()  Dom Initializations

//disconnectedCallback()  do cleanup

//attributeChangedCallback() -> update data and dom
