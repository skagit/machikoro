import { GameController } from "../GameController"
import { Player } from "../Player"
import { Card, CardType } from "./Card"

export enum EstablishmentColor {
    red, green, blue, purple
}

export enum EstablishmentType {
    grain, fruit, cow, resource, store, restaurant, factory, special
}

export abstract class Establishment extends Card {
    readonly activations: Array<number>
    readonly establishmentColor: EstablishmentColor
    readonly establishmentType: EstablishmentType
    
    constructor ( name: string, cost: number, activations: Array<number>, color: EstablishmentColor, establishmentType: EstablishmentType) {
        super(name, cost, CardType.establishment)
        this.activations = activations
        this.establishmentColor = color
        this.establishmentType = establishmentType
    }

    public isActivated (activation: number): boolean {
        return this.activations.includes(activation)
    }

    public isColor (color: EstablishmentColor): boolean {
        return this.establishmentColor == color
    }

    public isEstablishmentType(type: EstablishmentType) {
        return this.establishmentType == type
    }
    
    abstract async runEffect (game: GameController, owner: Player): Promise<void>
}