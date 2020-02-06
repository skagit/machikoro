import { Card, CardType } from "../card"

export class TrainStation extends Card{
    constructor () {
        super("Train Station", 4, CardType.landmark)
    }
}