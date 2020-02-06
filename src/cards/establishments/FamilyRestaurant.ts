import { Establishment, EstablishmentColor, EstablishmentType } from "../establishment"
import { GameController } from "../../GameController"
import { Player } from "../../player"

export class FamilyRestaurant extends Establishment {

    constructor () {
        super("Family Restaurant", 3, [9,10], EstablishmentColor.red, EstablishmentType.restaurant)
    }

    async runEffect (game: GameController, owner: Player) {
        let payout = 2
        if ( owner.owns("Shopping Mall") == true ) {
            payout += 1
        }
        const activePlayer = game.players.getActivePlayer()
        activePlayer.pay(owner, payout )
    }
}