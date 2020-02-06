class Die {
    private min: number
    private max: number
    private value: number
    
    constructor (min, max) {
        this.min = min
        this.max = max
    }

    public roll (): void {
        this.value = Math.floor( (Math.random() * this.max - this.min + 1) + this.min )
    }

    public read (): number {
        return this.value
    }
}

function createSixSided (): Die {
    return new Die(1, 6)
}

export class GameDice {
    private dice: Array<Die>
    private rolled: number
    private value: number
    private match: boolean 

    constructor () {
        this.dice = [ createSixSided(), createSixSided() ]
    }

    public roll (rolled = 1): GameDice {
        this.dice[0].roll()
        this.dice[1].roll()
        
        this.value = this.dice[0].read()
        if ( rolled == 2 ) {
            this.value += this.dice[1].read()
        }

        this.rolled = rolled
        this.match = this.isMatch()
        
        return this
    }

    public read (): [number, boolean] {
        return [this.value, this.match]
    }

    public isMatch (): boolean {
        if (this.rolled == 2) {
            return  this.dice[0].read() ==
                    this.dice[1].read()
        }
        return false
    }
}