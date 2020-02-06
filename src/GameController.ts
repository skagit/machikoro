import { GameDice } from "./Dice"
import { Bank } from "./Bank"
import { Player } from "./Player"
import { PlayerManager } from "./PlayerManager"
import { Card, CardType } from "./cards/Card"
import { Establishment, EstablishmentColor } from "./cards/Establishment"
import { ApplicationContext } from "./ApplicationContex"
import { Event, EventType } from "./ui/UI"

export class GameController {
    readonly dice: GameDice
    readonly bank: Bank
    readonly players: PlayerManager
    readonly context: ApplicationContext
    private activePlayer: Player

    constructor (numberOfPlayers: number, context: ApplicationContext) {
        this.dice = new GameDice()
        this.bank = new Bank()
        this.players = new PlayerManager(numberOfPlayers)
        this.context = context
    }

    public async runTurn (): Promise<void> {
        try {
            let hasWon = false
            while ( !hasWon ) {

                this.activePlayer = this.players.getActivePlayer()
                
                let numberOfDice: number = 1
                if ( this.activePlayer.owns("Train Station") ) {
                    numberOfDice = await this.getDice()
                }
                
                let [activation, isMatch] = this.dice.roll(numberOfDice).read()
                
                if ( this.activePlayer.owns("Radio Tower") ) {
                    const redo: boolean = await this.getRedo()
                    if (redo) {
                        [activation, isMatch] = this.dice.roll(numberOfDice).read()
                    }
                }

                //run collection

                // // collection players
                await this.runCards( this.players.getCollectionPlayers(), activation, (card: Establishment) => { 
                    return card.isColor(EstablishmentColor.red) 
                })

                //run income

                // // all players
                await this.runCards( this.players.getNormalPlayers(), activation, (card: Establishment) => { 
                    return card.isColor(EstablishmentColor.blue)
                })
                
                // // active player
                await this.runCards( [ this.players.getActivePlayer() ], activation, (card: Establishment) => { 
                    return card.isColor(EstablishmentColor.green)
                })

                //run special

                // // active player
                await this.runCards( [ this.players.getActivePlayer() ], activation, (card: Establishment) => { 
                    return card.isColor(EstablishmentColor.purple)
                })

                await this.purchaseCards()
                
                hasWon = this.activePlayer.hasWon()

                this.context.UIEvent( new Event(EventType.update, "message", this.activePlayer) )

                if ( this.activePlayer.owns( "Amusement Park") && isMatch ) {
                    continue
                }
                else {
                    this.players.setNextActive()
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    private async runCards (players: Array<Player>, activation: number, filterFunction: (card: Establishment) => boolean ): Promise<void> {
        for ( const player of players ) {
            const cards = player.getCards( 
                (card: Card) => { return card.isCardType(CardType.establishment) },
                (card: Establishment) => { return card.isActivated(activation) },
                filterFunction
            )
            for ( const card of cards ) {
                await (<Establishment> card).runEffect(this, player)
            }
        }
    }

    private async getDice (): Promise<number> {
        const response: string = await this.context.UIEvent( new Event(EventType.input, "getDice", {} ))
        const decoded = parseInt(response.trim())
        if (decoded != 1 && decoded != 2) {
            this.context.UIEvent( new Event(EventType.update, "error", "Please enter the number 1 or 2") )
            return this.getDice()
        }
        else {
            return decoded
        }
    }

    private async getRedo (): Promise<boolean> {
        const positive = ["y", "yes"]
        const negative = ["n", "no"]
        const [activation, isMatch] = this.dice.read()
        const data = {activation: activation, isMatch: isMatch}
        const response: string = await this.context.UIEvent( new Event(EventType.input, "getRedo", data ))
        const decoded = response.trim().toLowerCase()
        if (positive.includes(decoded)) {
            return true
        }
        else if (negative.includes(decoded)) {
            return false
        }
        else {
            this.context.UIEvent( new Event(EventType.update, "error", "Please enter yes or no") )
            return this.getRedo()
        }
    }

    private async purchaseCards (): Promise<void> {
        const canAfford = this.bank.getCards( (card: Card) => { return card.cost <= this.activePlayer.getBalance() } )
        const landmarks = this.activePlayer.getCards( (card: Card) => { return card.isCardType(CardType.landmark) } )
        const specials = this.activePlayer.getCards(
            (card: Card) => { return card.isCardType(CardType.establishment) },
            (card: Establishment) => { return card.isColor(EstablishmentColor.purple) }
        )
        const cannotDuplicate = [].concat(landmarks, specials).map( (card: Card) => { return card.name } )

        const canBuy = canAfford.filter( (card: Card) => { return !cannotDuplicate.includes( card.name ) } ).map( (card: Card) =>  { return card.name } )

        const deduplicate = (seen: Array<string>, name): Array<string> => {
            if ( seen.includes(name) ) {
                return seen
            }
            seen.push(name)
            return seen
        }

        await this.getCardToPurchase( canBuy.reduce(deduplicate, []) )
    }

    private async getCardToPurchase ( canBuyNames: Array<string> ): Promise<void> {
        let response:string = await this.context.UIEvent( new Event(EventType.input, "purchase", canBuyNames) )
        response = response.trim()
        if ( response == "" ) {
            return
        }
        else if ( canBuyNames.includes(response) ) {
            this.bank.sellCard(this.activePlayer, response)
        }
        else {
            this.context.UIEvent( new Event(EventType.update, "error", "Name not recognized, please enter an available card name from the list") )
            return this.getCardToPurchase(canBuyNames)
        }
    }
}

