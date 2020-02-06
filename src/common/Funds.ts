export interface FundOwner {
    deposit (amount: number): void
}

export class Funds {
    private balance: number

    constructor( initialAmount: number = 0) {
        this.balance = initialAmount
    }

    public getBalance() {
        return this.balance
    }

    public deposit(amount: number) {
        this.balance += amount
    }

    public withdraw(amount: number) {
        let withdrawn = 0
        if ( amount <= this.balance ) {
            this.balance -= amount
            withdrawn = amount
        }
        else {
            withdrawn = this.balance
            this.balance = 0
        }
        return withdrawn
    }
}