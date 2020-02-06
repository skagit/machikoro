import { Establishment, EstablishmentColor, EstablishmentType } from "../establishment"
import { GameController } from "../../GameController"
import { Player } from "../../player"
import { Card, CardType } from "../Card"

export class FurnitureFactory extends Establishment {

    constructor () {
        super("Furniture Factory", 3, [8], EstablishmentColor.green, EstablishmentType.factory)
    }

    async runEffect (game: GameController, owner: Player) {
        const owned: number = owner.getCards( (card: Card) => { 
            return card.isCardType(CardType.establishment) && (<Establishment> card).isEstablishmentType(EstablishmentType.resource) } 
        ).length

        const payout = 3 * owned

        game.bank.pay(owner, payout)
    }
}