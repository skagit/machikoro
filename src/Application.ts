import { GameController } from "./GameController"
import { CLI } from "./ui/CLI"
import { ApplicationContext } from "./ApplicationContex"

async function main() {
    const mainContext = new ApplicationContext()
    const mainUI = new CLI()
    const mainGameController =  new GameController(2, mainContext)
    mainContext.loadContext(mainGameController, mainUI)
    await mainContext.run()
    mainContext.close()
    return 0
}

try {
    main()
}
catch (error) {
    console.log(error)
}