import { Establishment, EstablishmentColor, EstablishmentType } from "../Establishment"
import { GameController } from "../../GameController"
import { Player } from "../../player"

export class Forest extends Establishment {

    constructor () {
        super("Forest", 3, [5], EstablishmentColor.blue, EstablishmentType.resource)
    }

    async runEffect (game: GameController, owner: Player) {
        game.bank.pay(owner, 3)
    }
}