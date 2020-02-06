import { Establishment, EstablishmentColor, EstablishmentType } from "../Establishment"
import { GameController } from "../../GameController"
import { Player } from "../../player"

export class Stadium extends Establishment {

    constructor () {
        super("Stadium", 6, [6], EstablishmentColor.purple, EstablishmentType.special)
    }

    async runEffect (game: GameController, owner: Player) {
        const players = game.players.getCollectionPlayers()
        for ( const player of players ) {
            player.pay(owner, 2)
        }
    }
}