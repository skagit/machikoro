import { Establishment, EstablishmentColor, EstablishmentType } from "../establishment"
import { GameController } from "../../GameController"
import { Player } from "../../player"

export class Ranch extends Establishment {

    constructor () {
        super("Ranch", 1, [2], EstablishmentColor.blue, EstablishmentType.cow)
    }

    async runEffect (game: GameController, owner: Player) {
        game.bank.pay(owner, 1)
    }
}