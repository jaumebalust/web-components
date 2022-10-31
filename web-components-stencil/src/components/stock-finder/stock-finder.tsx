import {h, Component, State, Event,EventEmitter} from "@stencil/core";
import {AV_API_KEY} from "../../global/global";

@Component({
  tag:'uc-stock-finder',
  styleUrl:'./stock-finder.css',
  shadow:true
})
export class StockFinder{
  stockNameInput:HTMLInputElement

  @State() listOfMatches:{symbol:string,name:string}[] = [];

  @Event({bubbles:true,composed:true}) ucSymbolSelected:EventEmitter<string>;

  onFindStocks(event:Event){
    event.preventDefault()
    const keywords = this.stockNameInput.value
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${AV_API_KEY}`)
      .then(res => {
        return res.json()
      })
      .then((parsedRes)=>{

        this.listOfMatches = parsedRes['bestMatches'].map(match => {

          return {symbol:match['1. symbol'],name:match['2. name']}
        })
        console.log(this.listOfMatches)
      })
      .catch( err  => console.log(err))
  }

  onSymbolSelected(symbol:string){
    //we previously declare the event and then we fire it at will.
    this.ucSymbolSelected.emit(symbol)
  }

  render(){
    return [
      <form onSubmit={this.onFindStocks.bind(this)}>

        <input id="stock-symbol" type="text"
               ref={el => this.stockNameInput = el}
        />
        <button type="submit" >Find!</button>
      </form>,
      <ul>
        {this.listOfMatches.map(result => {
            return <li onClick={this.onSymbolSelected.bind(this,result.symbol)}><strong>{result.symbol}</strong> {result.name}</li>
          })}
      </ul>
    ]
  }
}
