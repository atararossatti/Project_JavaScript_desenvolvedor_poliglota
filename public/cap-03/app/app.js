import { Person } from './models/person.js';
import { Animal } from './models/animal.js';
import { ActiveRecord } from './infra/active-record.js';

(async () => {
    await new ActiveRecord({
        dbName: 'db-ar',
        dbVersion: 1,
        mappers: [
            {
                clazz: Person, 
                converter: data => new Person(data.name, data.surname)
            },
            {
                clazz: Animal,
                converter: data => new Animal(data.name)
            }
        ]
    })
    .init();

    const person = new Person('Flávio', 'Almeida');
    await person.save();
    const animal = new Animal('Calopsita Azul');
    await animal.save();
    const people = await Person.find();
    console.log(people);
    const animals = await Animal.find();
    console.log(animals);
})();