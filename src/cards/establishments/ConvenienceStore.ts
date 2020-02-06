import { Establishment, EstablishmentColor, EstablishmentType } from "../establishment"
import { GameController } from "../../GameController"
import { Player } from "../../player"

export class ConvenienceStore extends Establishment {

    constructor () {
        super("Convenience Store", 2, [4], EstablishmentColor.green, EstablishmentType.store)
    }

    async runEffect (game: GameController, owner: Player) {
        let payout = 3
        if ( owner.owns("Shopping Mall") == true ) {
            payout += 1
        }
        game.bank.pay(owner, payout)
    }
}