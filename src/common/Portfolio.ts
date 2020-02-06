import { Card, CardType } from "../cards/Card"
import { Establishment } from "../cards/Establishment" 

export interface CardOwner {
    addCard (card: Card): void
}

export class Portfolio {
    private cards: Array<Card>

    constructor ( initialCards: Array<Card> = [] ) {
        this.cards = initialCards
    }

    public addCard ( card: Card ): void {
        this.cards.push( card )
    }

    public hasCard ( name: string ): boolean {
        if ( this.cards.findIndex( card => { return card.name == name} ) > -1 ) {
            return true
        }
        return false
    }

    public removeCard ( name: string ): Card {
        if ( this.hasCard( name ) ) {
            const index = this.cards.findIndex( card => { return card.name == name} )
            const card = this.cards.splice(index, 1)[0]
            return card
        }
        throw new Error("Porfolio does not have " + name)
    }

    public filter (filterFunction: (card: Card) => boolean, ...otherFunctions: Array< (card: Card) => boolean >): Array<Card> {
        let result = this.cards.filter( filterFunction )
        for ( const otherFunction of otherFunctions ) {
            result = result.filter(otherFunction)
        }
        return result
    }
}