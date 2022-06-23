import { calculaImc } from './oms.js';
import { Conta } from './models/conta.js';

const imc = calculaImc({ peso: 68, altura: 1.71 });
console.log(imc);

const conta = new Conta({ 
    titular: 'Flávio', 
    banco: '123',
    agencia: '456', 
    numero: '789',
});

console.log(conta);

const object1 = { nome: 'Flávio' };
const object2 = { peso: 78 };
Object.assign(object1, object2);
console.log(object1);