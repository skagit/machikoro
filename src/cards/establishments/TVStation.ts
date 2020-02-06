import { Establishment, EstablishmentColor, EstablishmentType } from "../establishment"
import { GameController } from "../../GameController"
import { Player } from "../../player"
import { Event, EventType } from "../../ui/UI"

export class TVStation extends Establishment {

    constructor () {
        super("TV Station", 7, [6], EstablishmentColor.purple, EstablishmentType.special)
    }

    async runEffect (game: GameController, owner: Player) {
        const players = game.players.getCollectionPlayers()

        let data = {}
        for (const player of players) {
            data[player.id] = player.getBalance()
        }

        const otherId = await game.context.UIEvent( new Event( EventType.input, "TVStation", data, { otherId: undefined } ) )

        if (otherId == "") {
            return
        }
        
        if ( data[ otherId ] ) {
            const otherPlayer: Player = game.players.getPlayerById(otherId)
            otherPlayer.pay(owner, 5)
        }
        else {
            game.context.UIEvent( new Event( EventType.update, "error", "Player ID was not recognized.") )
            return this.runEffect(game, owner)
        }
    }
}