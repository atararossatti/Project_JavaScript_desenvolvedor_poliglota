export class Person {

    constructor(public name, public surname) {}

    @logExecutionTime 
    speak(phrase) {
        return `${this.name} is speaking... ${phrase}`
    }

    @logExecutionTime
    getFullName() {
        return `${this.name} ${this.surname}`;
    }
}