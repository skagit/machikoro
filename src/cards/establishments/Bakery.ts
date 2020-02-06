import { Establishment, EstablishmentColor, EstablishmentType } from "../establishment"
import { GameController } from "../../GameController"
import { Player } from "../../player"

export class Bakery extends Establishment {

    constructor () {
        super("Bakery", 1, [2,3], EstablishmentColor.green, EstablishmentType.store)
    }

    async runEffect (game: GameController, owner: Player) {
        let payout = 1
        if ( owner.owns("Shopping Mall") == true ) {
            payout += 1
        }
        game.bank.pay(owner, payout )
    }
}