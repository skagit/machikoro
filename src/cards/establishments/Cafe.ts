import { Establishment, EstablishmentColor, EstablishmentType } from "../establishment"
import { GameController } from "../../GameController"
import { Player } from "../../player"

export class Cafe extends Establishment {

    constructor () {
        super("Cafe", 1, [3], EstablishmentColor.red, EstablishmentType.restaurant)
    }

    async runEffect (game: GameController, owner: Player) {
        let payout = 1
        if ( owner.owns("Shopping Mall") == true ) {
            payout += 1
        }
        const activePlayer = game.players.getActivePlayer()
        activePlayer.pay(owner, payout )
    }
}