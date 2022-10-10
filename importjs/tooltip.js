class Tooltip extends HTMLElement{

    static get observedAttributes(){
        //it's like a property accessible from outside but not setable.
        return ['text']
    }

    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipText= 'Default text'
        this._tooltipIcon;
        this._tooltipVisible = false;

        this.attachShadow({mode:'open'})

        this.shadowRoot.innerHTML = `
            <style>
                
                div{
                    background-color: black;
                    color: white;
                    position: absolute;
                    z-index: 10;
                    top:2rem;
                    left:1rem;
                    box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
                }
                
                ::slotted(span){
                    background-color: red;
                }
                .icon{
                    background-color: black;
                    color: white;
                    padding: 0.25rem;
                    padding: 0.15rem 0.5rem;
                    text-align: center;
                    border-radius: 50%;
                }
                :host(.important){
                    background:var(--color-primary,#ccc);
                    
                }
                
                :host-context(p){
                    font-weight: bold;
                }
                </style>
            
            <slot>Some Default of slot</slot>
            <span class="icon">?</span>`
            //slotted applies styles to sloted content.
        // Note: light dom takes preference before shadow dom when applying styles.
            //:host selector allows styling to the whole object
            //:host selector allows a selector to allow conditional styling. in this case only applies to .important css selector.
            //:host-context applies if the component is nested inside the defined selector.
    }

    connectedCallback(){
        //dom is ready here
        if (this.hasAttribute('text')){
            this._tooltipText = this.getAttribute('text')
        }
        this._tooltipIcon = this.shadowRoot.querySelector('span')
        this._tooltipIcon.addEventListener('mouseenter',this._showTooltip.bind(this))
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
        this.style.position = 'relative'

    }

    attributeChangedCallback(name,oldValue,newValue){
        if (oldValue === newValue){
            return;
        }
        if (name === 'text'){
            this._tooltipText = newValue
        }

    }

    _render(){
        //contains all the logic for rendering the dom
        //all the other places just use data, and we use the render for rendering.
        if (this._tooltipVisible){
            this._tooltipContainer= document.createElement(('div'))
            this._tooltipContainer.textContent = this._tooltipText
            this.shadowRoot.appendChild(this._tooltipContainer)
        } else {
            this.shadowRoot.removeChild(this._tooltipContainer)
        }
    }

    _showTooltip(){
        this._tooltipVisible = true
        this._render()
    }
    _hideTooltip(){
        this._tooltipVisible = false
        this._render()

    }

    disconnectedCallback(){
        this._tooltipIcon.removeEventListener('mouseenter',this._showTooltip)
        this._tooltipIcon.removeEventListener('mouseleave',this._hideTooltip)
    }


}

//double words guarantees we don't overwrite native components.
customElements.define('ak-tooltip',Tooltip)



//constructor() basic initializations should go here.

//connectedCallback()  Dom Initializations

//disconnectedCallback()  do cleanup

//attributeChangedCallback() -> update data and dom
