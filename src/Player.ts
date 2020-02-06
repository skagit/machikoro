import { Funds, FundOwner } from "./common/Funds"
import { Card, CardType } from "./cards/Card"
import { Portfolio, CardOwner } from "./common/Portfolio"

import { WheatField } from "./cards/establishments/WheatField"
import { Bakery } from "./cards/establishments/Bakery"
import { TVStation } from "./cards/establishments/TVStation"
import { BusinessCenter } from "./cards/establishments/BusinessCenter"

export class Player implements FundOwner, CardOwner{
    static nextId = 0

    public id: number
    private funds: Funds
    private portfolio: Portfolio

    constructor () {
        this.id = Player.nextId
        Player.nextId += 1

        this.funds = new Funds()
        this.funds.deposit(3)

        this.portfolio = new Portfolio()
        this.portfolio.addCard( new WheatField() )
        this.portfolio.addCard( new Bakery() )
        this.portfolio.addCard( new BusinessCenter() )
    }

    public getBalance (): number {
        return this.funds.getBalance()
    }

    public deposit( amount: number ) {
        this.funds.deposit(amount)
    }

    public pay (receiver, amount: number) {
        const withdrawl = this.funds.withdraw( amount )
        receiver.deposit(withdrawl)
    }

    public owns ( cardName: string ) {
        return this.portfolio.hasCard( cardName )
    }
    
    public getCards ( filterFunction: (card: Card) => boolean, ...otherFunctions: Array< (card: Card) => boolean >): Array<Card> {
        return this.portfolio.filter( filterFunction, ...otherFunctions )
    }

    public addCard (card: Card) {
        this.portfolio.addCard( card )
    }

    public giveCard (receiver, cardName: string) {
        const cardToGive = this.portfolio.removeCard(cardName)
        receiver.addCard(cardToGive)
    }

    public hasWon (): boolean {
        return this.portfolio.filter( (card: Card) => { return card.cardType == CardType.landmark } ).length == 4
    }
}