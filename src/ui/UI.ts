export enum EventType {
    input, update
}

export class Event {
    readonly type: EventType
    readonly name: string
    readonly data: any
    readonly returnData: any

    constructor (type: EventType, name: string, data: any, returnData: any = undefined) {
        this.type = type
        this.name = name
        this.data = data
        this.returnData = returnData
    }
}

export abstract class UI {

    constructor () {}

    public async dispatch ( event: Event ): Promise<any> {
        try {
            if ( event.type == EventType.update ) {
                this.update(event)
            }
            else if ( event.type == EventType.input ) {
                const response =  await this.input(event)
                return response
            }
        }
        catch (error) {
            console.log(error)
        }
    }
        
    protected abstract update (event: Event) 

    protected async abstract input (event: Event)

    public abstract close ()
}