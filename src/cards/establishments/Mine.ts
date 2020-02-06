import { Establishment, EstablishmentColor, EstablishmentType } from "../Establishment"
import { GameController } from "../../GameController"
import { Player } from "../../player"

export class Mine extends Establishment {

    constructor () {
        super("Mine", 6, [9], EstablishmentColor.blue, EstablishmentType.resource)
    }

    async runEffect (game: GameController, owner: Player) {
        game.bank.pay(owner, 5)
    }
}