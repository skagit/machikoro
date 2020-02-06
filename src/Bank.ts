import { Funds, FundOwner } from "./common/Funds"
import { Portfolio, CardOwner } from "./common/Portfolio"
import { Card } from "./cards/Card"
import { Player } from "./Player"

import { WheatField } from "./cards/establishments/WheatField"
import { Ranch } from "./cards/establishments/Ranch"
import { Bakery } from "./cards/establishments/Bakery"
import { Cafe } from "./cards/establishments/Cafe"
import { ConvenienceStore } from "./cards/establishments/ConvenienceStore"
import { Forest } from "./cards/establishments/Forest"
import { Stadium } from "./cards/establishments/Stadium"
import { TVStation } from "./cards/establishments/TVStation"
import { BusinessCenter } from "./cards/establishments/BusinessCenter"


import { TrainStation } from "./cards/landmarks/trainStation"
import { ShoppingMall } from "./cards/landmarks/shoppingMall"
import { AmusementPark } from "./cards/landmarks/amusementPark"
import { RadioTower } from "./cards/landmarks/radioTower"

const establishments: Array<any> = [ WheatField, Ranch, Bakery, Cafe, ConvenienceStore, Forest, Stadium , TVStation, BusinessCenter ]
const landmarks: Array<any> = [ TrainStation, ShoppingMall, AmusementPark, RadioTower ]

export class Bank implements FundOwner, CardOwner{
    private funds: Funds
    private portfolio: Portfolio

    constructor () {
        this.funds = new Funds(500)

        this.portfolio = new Portfolio()
        
        for ( const cardClass of landmarks ) {
            for (let i = 0; i < 4; i++) {
                this.portfolio.addCard( new cardClass() )
            }
        }

        for ( const cardClass of establishments ) {
            for (let i = 0; i < 6; i++) {
                this.portfolio.addCard( new cardClass() )
            }
        }
    }

    public deposit (amount: number) {
        this.funds.deposit(amount)
    }

    public pay (receiver: FundOwner, amount: number) {
        receiver.deposit(amount)
    }

    public addCard (card: Card) {
        this.portfolio.addCard(card)
    }

    public getCards ( filterFunction: (card: Card) => boolean, ...otherFunctions: Array< (card: Card) => boolean >): Array<Card> {
        return this.portfolio.filter( filterFunction, ...otherFunctions )
    }

    public sellCard( buyer: Player, cardName: string) {
        const purchase = this.portfolio.removeCard(cardName)
        const cost = purchase.cost
        buyer.pay(this, cost)
        buyer.addCard(purchase)
    }
}