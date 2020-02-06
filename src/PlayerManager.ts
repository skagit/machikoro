import { Player } from "./player"
import { start } from "repl"

const enum Direction {
    forward, backward
}

class CircularList<T> {
    private list: Array<T>
    private index: number

    constructor (list: Array<T> = []) {
        this.list = list
        this.index = 0
    }

    public forward (): CircularList<T> {
        this.index += 1
        if ( this.index == this.list.length ) {
            this.index = 0
        }
        return this
    }
    
    public backward (): CircularList<T> {
        this.index -= 1
        if ( this.index == -1 ) {
            this.index = this.list.length - 1
        }
        return this
    }

    public get (): T {
        return this.list[this.index]
    }

    public add ( item: T ) {
        this.list.push(item)
    }

    public flatten(direction: Direction, includeStart: boolean) {
        let sublist: Array<T> = []
        const startIndex = this.index
        
        if ( includeStart ) {
            sublist.push( this.get() )
        }
        
        for ( let visited = 1 ; visited < this.list.length ; visited++ ) {
            if ( direction = Direction.backward ) {
                this.backward()
            }
            else {
                this.forward()
            }
            sublist.push( this.get() )
        }
        
        this.index = startIndex
        
        return sublist
    }
 }

 export class PlayerManager {
    private players: CircularList<Player>

    constructor (numberOfPlayers: number) {
        this.players = new CircularList()
        for ( let n = 0; n < numberOfPlayers; n++) {
            this.players.add( new Player() )
        }
    }

    public getPlayerById (id: number): Player {
        for ( const player of this.getNormalPlayers() ) {
            if ( player.id == id ) {
                return player
            }
        }
    }

    public getActivePlayer (): Player {
        return this.players.get()
    }

    public setNextActive (): void {
        this.players.forward()
    }

    public getCollectionPlayers (): Array<Player> {
        return this.players.flatten( Direction.backward, false )
    }

    public getNormalPlayers (): Array<Player> {
        return this.players.flatten( Direction.forward, true )
    }

}