export enum CardType {
    landmark, establishment
}

export class Card { 
    readonly name: string
    readonly cost: number
    readonly cardType: CardType

    constructor (name: string, cost: number, cardType: CardType) {
        this.name = name
        this.cost = cost
        this.cardType = cardType
    }

    public isCardType (type: CardType) {
        return this.cardType == type
    }

    public canPurchase(budget: number) {
        return this.cost <= budget
    }
}