import * as readline from 'readline'
import {Event, UI } from "./UI"

export class CLI extends UI {
    rl: readline.Interface

    constructor () {
        super()
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    }

    protected message (event: Event) {
        console.log(event.data)
    }

    protected update (event: Event) {
        try {
            switch (event.name) {
                case "error":
                case "message":
                    console.log(event.data)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    protected async input (event: Event): Promise<any> {
        try {
            switch (event.name) {
                case "BusinessCenter":
                    return await this.businessCenter(event)
                    break

                case "TVStation":
                    return await this.TVStation(event)
                    break
                
                case "getDice":
                    return await this.getDice(event)
                    break
                
                case "getRedo":
                    return await this.getRedo(event)

                case "purchase":
                    return await this.purchase(event)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    private async businessCenter(event: Event) {
        console.log("Own Cards\n=========")
        for ( const cardName of event.data["byId"][ event.data.ownerId ] ) {
            console.log(cardName)
        }

        for ( const id in event.data["byId"] ) {
            if ( id != event.data.ownerId ) {
                console.log(`Player ${id} Cards\n==============`)
                for ( const cardName of event.data["byId"][ id ] ) {
                    console.log(cardName)
                }
            }
        }

        const ownerCardName = await this.askQuestion("Enter own card name to trade, or press enter to skip trade: ")
        const otherId = await this.askQuestion("Enter id number of other player: ")
        const otherCardName = await this.askQuestion("Enter other player card name: ")

        return {
            otherId: otherId,
            otherCardName: otherCardName,
            ownerCardName: ownerCardName
        }
    }

    private async TVStation (event: Event) {
        for ( const id in event.data ) {
            console.log(`Player ${id} Coins\n==============`)
            console.log(event.data[id])
        }
        return await this.askQuestion("Enter id number of other player to take coins from or press enter to skip: ")
    }

    private async getDice (event: Event) {
        return await this.askQuestion("Enter number of die to roll, 1 or 2: ")
    }

    private async getRedo (event: Event) {
        console.log(`Roll activation: ${event.data.activation}, Match: ${event.data.isMatch}\n`)
        return await this.askQuestion("Would you like to reroll: ")
    }

    private async purchase (event: Event) {
        console.log("Cards For Purchase\n==================")
        for ( const cardName of event.data ) {
            console.log(cardName)
        }
        return await this.askQuestion("Enter name of card to purchase: ")
    }

    private askQuestion (text: string): Promise<string> {
        return new Promise( (resolve, reject) => {
            try {
                this.rl.question(text, (response) => {
                    resolve(response)
                })
            }
            catch (error) {
                reject(error)
            }
        } )
    }

    public close () {
        this.rl.close()
        console.log("CLI resources closed")
    }
}