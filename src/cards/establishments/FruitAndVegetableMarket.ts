import { Establishment, EstablishmentColor, EstablishmentType } from "../establishment"
import { GameController } from "../../GameController"
import { Card, CardType } from "../Card"
import { Player } from "../../player"

export class FruitAndVegetableMarket extends Establishment {

    constructor () {
        super("Fruit and Vegetable Market", 2, [11,12], EstablishmentColor.green, EstablishmentType.fruit)
    }

    async runEffect (game: GameController, owner: Player) {
        const owned: number = owner.getCards( (card: Card) => { 
            return card.isCardType(CardType.establishment) && (<Establishment> card).isEstablishmentType(EstablishmentType.grain) } 
        ).length

        const payout = 2 * owned

        game.bank.pay(owner, payout)
    }
}