export const logExecutionTime = (method, property, args) => {
    console.log('start logExecutionTIme');
    console.time(property);
    const result = method(...args);
    console.timeEnd(property);
    console.log('end logExecutionTime');
    return result;
};

export const inspectMethod = (excludeReturn = false) => {
    return (method, property, args) => {
        console.log('Start inspectMethod');
        console.log(`Método decorado: ${property}`);
        console.log(`Argumentos do método ${args}`);
        const result = method(...args);
        if(!excludeReturn) {
            console.log(`resultado do método: ${result}`)
        }
        console.log('End inspectMethod');
        return result;
    }
};