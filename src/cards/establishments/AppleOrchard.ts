import { Establishment, EstablishmentColor, EstablishmentType } from "../Establishment"
import { GameController } from "../../GameController"
import { Player } from "../../player"

export class AppleOrchard extends Establishment {

    constructor () {
        super("Apple Orchard", 3, [10], EstablishmentColor.blue, EstablishmentType.grain)
    }

    async runEffect (game: GameController, owner: Player) {
        game.bank.pay(owner, 3)
    }
}