class Modal extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false
        this.attachShadow({mode:'open'})

        this.shadowRoot.innerHTML = `
        <style>
       
        
            #backdrop{
                position: fixed;
                top:0;
                left: 0;
                width:100%;
                height:100vh;
                background-color: rgba(0,0,0,0.24);
                z-index: 10;
                opacity: 0;
                pointer-events: none;
               
            }
            :host([opened]) #backdrop,
            :host([opened]) #modal{
                opacity: 1;   
                pointer-events: all;   
            }
            #modal{
                position:fixed;
                top:15vh;
                left:25%;
                width:50%;
                z-index: 100;
                background: white;
                height:20rem;
                border-radius: 3px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                opacity: 0;
                pointer-events: none;
                transition: all 0.3s ease-out;
            }
            #actions{
                border-top: 1px solid lightgray;
                padding: 1rem;
                display: flex;
                justify-content: flex-end;
            
            }
            #actions button{
                margin:0 0.25rem;
            }
            header{
                padding: 1rem;
            }
            header h1{
                font-size: 1.25rem;
            }
            #main{
                padding: 1rem;
            }
            ::slotted(h1){
                font-size: 20px;
            }
        </style>
        <div id="backdrop"></div> 
        <div id="modal">
            <header>
                <slot name="title">Please confirm payment</slot>
               
            </header>
            <section id="main">
                <slot></slot>
            </section>
            <section id="actions">
                <button id="cancel">Cancel</button>
                <button id="confirm">Okay</button>
            </section>
            
        </div> 
        `

        const slots = this.shadowRoot.querySelectorAll('slot')
        slots[1].addEventListener('slotchange',(event)=>{
            console.log(event)
        })

        const cancelButton = this.shadowRoot.querySelector('#cancel')
        const confirmButton = this.shadowRoot.querySelector('#confirm')
        const backdrop = this.shadowRoot.querySelector('#backdrop')

        backdrop.addEventListener('click',this._cancel.bind(this))
        cancelButton.addEventListener('click',this._cancel.bind(this))
        confirmButton.addEventListener('click',this._confirm.bind(this))

    }

    _cancel(){
        this.hide()
        const cancelEvent = new Event('cancel')
        this.dispatchEvent(cancelEvent)
    }
    _confirm(){
        this.hide()
        const confirmEvent = new Event('confirm')
        this.dispatchEvent(confirmEvent)
    }


    open(){
        this.setAttribute('opened','')
        this.isOpen = true
    }
    hide(){
        if (this.hasAttribute('opened')){
            this.removeAttribute('opened')
        }
        this.isOpen = false
    }

    attributeChangedCallback(name,oldValue,newValue){
        if (oldValue === newValue){
            return
        }
        if (name === 'opened'){
            if (this.hasAttribute('opened')){
                this.isOpen = true

            } else {
                this.isOpen = false
            }
        }

    }

    static get observedAttributes(){
        return ['opened']
    }
}

customElements.define('uc-modal',Modal)
