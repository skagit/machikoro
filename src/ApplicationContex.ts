import { GameController } from "./GameController"
import { UI, Event } from "./ui/UI"

export class ApplicationContext {
    public gameController: GameController
    public ui: UI

    constructor () {
    }

    public loadContext(gameController: GameController, ui: UI) {
        this.gameController = gameController
        this.ui = ui
    } 
    
    public async UIEvent(event: Event) {
        return await this.ui.dispatch(event)
    }

    public async run () {
        try {
            await this.gameController.runTurn()
        }
        catch (error) {
            console.log(error)
        }
    }

    public close() {
        this.ui.close()
    }
}