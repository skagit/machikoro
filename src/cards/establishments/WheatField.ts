import { Establishment, EstablishmentColor, EstablishmentType } from "../establishment"
import { GameController } from "../../GameController"
import { Player } from "../../player"

export class WheatField extends Establishment {

    constructor () {
        super("Wheat Field", 1, [1], EstablishmentColor.blue, EstablishmentType.grain)
    }

    async runEffect (game: GameController, owner: Player) {
        game.bank.pay(owner, 1)
    }
}