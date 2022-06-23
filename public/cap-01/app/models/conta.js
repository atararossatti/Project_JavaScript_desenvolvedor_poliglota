export class Conta {
    constructor({ titular, banco, agencia, numero }) {
        Object.assign(this, { titular, banco, agencia, numero });
    }
}