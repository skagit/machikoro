import { Establishment, EstablishmentColor, EstablishmentType } from "../establishment"
import { GameController } from "../../GameController"
import { Player } from "../../player"
import { Card, CardType } from "../Card"
import { Event, EventType } from "../../ui/UI"

export class BusinessCenter extends Establishment {

    constructor () {
        super("Business Center", 8, [6], EstablishmentColor.purple, EstablishmentType.special)
    }

    async runEffect (game: GameController, owner: Player) {
        const canTrade = ( player: Player) => {
            return player.getCards( (card: Card) => { 
                return card.isCardType(CardType.establishment) && !(<Establishment> card).isColor(EstablishmentColor.purple) }
            ).map( (card: Card) => { return card.name } ).reduce( deduplicate, [])
        }

        const deduplicate = (seen: Array<string>, name): Array<string> => {
            if ( seen.includes(name) ) {
                return seen
            }
            seen.push(name)
            return seen
        }
        
        const players = game.players.getNormalPlayers()
        const data = {}
        data["byId"] = {}
        
        for (const player of players) {
            data["byId"][ player.id ] = []   
            const cardNames = canTrade(player)
            for (const name of cardNames) {
                data["byId"][ player.id ].push(name)
            }
        }

        data["ownerId"] = owner.id

        const returnData = { "otherId": undefined, "otherCardName": undefined, "ownerCardName": undefined }

        const { otherId, otherCardName, ownerCardName } = await game.context.UIEvent( new Event( EventType.input, "BusinessCenter", data, returnData) )

        if ( ownerCardName == "" ) {
            return
        }
        
        else if ( otherCardName && ownerCardName && data["byId"][otherId] && data["byId"][otherId].includes(otherCardName) && data["byId"][owner.id].includes(ownerCardName) ) {
            const otherPlayer: Player = game.players.getPlayerById(otherId)
            otherPlayer.giveCard(owner, otherCardName)
            owner.giveCard(otherPlayer, ownerCardName)
        }
        else {
            game.context.UIEvent( new Event( EventType.update, "error", "Combination was not recognized. Please check spelling and owner.") )
            return this.runEffect(game, owner)
        }
    }
}