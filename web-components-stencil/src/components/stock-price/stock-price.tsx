import {Component, h, State, Element, Prop, Watch, Listen} from "@stencil/core";
import {AV_API_KEY} from "../../global/global";


@Component({
  tag:'uc-stock-price',
  styleUrl:'./stock-price.css',
  shadow:true
})
export class StockPrice {
  @Element() el:HTMLElement;

  stockInput: HTMLInputElement;

  @State() price: number;
  @State() userInput:string;
  @State() userInputValid = false;
  @State() errorString :string;
  @State() loading = false;

  @Prop({mutable:true,reflect:true}) stockSymbol:string;

  @Listen('ucSymbolSelected',{target:'body'})
  onStockSymbolSelected(event: CustomEvent){
  console.log('stock symbol selected',event.detail)
    if (event.detail && event.detail !== this.stockSymbol){
      this.stockSymbol = event.detail
    }

  }


  @Watch('stockSymbol')
  stockSymbolChanged(newVal,oldVal){
    if (newVal !== oldVal){
      this.queryStockPrice(newVal)
    }
  }

  componentWillLoad(){
    console.log('componentWillLoad',this.stockSymbol)

    //  manuall watching for prop changes..
    // if (this.stockSymbol){
    //   this.userInput = this.stockSymbol
    //   this.queryStockPrice(this.stockSymbol)
    // }
  }
  componentDidLoad(){

  }

  componentWillUpdate(){
    if (this.stockSymbol != this.userInput){
      this.userInput = this.stockSymbol
      this.queryStockPrice(this.stockSymbol)
    }
    console.log('componentWillUpdate')
  }

  componentDidUpdate(){
    console.log('componentDidUpdate')
  }
  disconnectedCallback(){
    console.log('disconnectedCallback')
  }

  hostData(){
    return {
      class:this.errorString ? 'error':''
    }
  }

  queryStockPrice(stockSymbol:string){
    this.loading = true
    fetch( `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
      .then((res)=>{
        if (res.status !== 200){
          this.errorString = 'Invalid request'
          throw new Error(this.errorString)
        }
        this.loading = false
        return res.json()
      })
      .then(parsedRes =>{
        console.log(parsedRes)
        if (!parsedRes["Global Quote"]["05. price"]){
          this.errorString = 'Invalid Symbol'
          throw new Error(this.errorString)
        }
        this.price = parseFloat(parsedRes["Global Quote"]["05. price"])
      })
      .catch(err => {
        console.log(err)
        this.loading = false
      })
  }

  fetchStockPrice(event: Event){
    event.preventDefault()
    console.log('submitted!')

    const stockSymbol = this.stockInput.value

    if (!this.userInputValid){
      return
    }

    this.queryStockPrice(stockSymbol)

  }
  updateUserInput(event: Event){
    this.errorString = ''
    this.userInput = (event.target as HTMLInputElement).value

    if (this.userInput.trim() !== ''){
      this.userInputValid = true
    } else {
      this.userInputValid = false
    }
  }

  render(){
    let spinner = null
    if(this.loading){
      spinner = <uc-loading-spinner></uc-loading-spinner>
    }
    return [
      <form onSubmit={this.fetchStockPrice.bind(this)}>
        <div>{this.errorString}</div>
        <input id="stock-symbol" type="text"
               ref={el => this.stockInput = el}
               value={this.userInput}
               onInput={this.updateUserInput.bind(this)}
        />
        <button type="submit" disabled={!this.userInputValid}>Fetch</button>
      </form>,
      <div>
        {spinner}

        <p>Price: ${this.price}</p>

      </div>
    ]
  }

}
