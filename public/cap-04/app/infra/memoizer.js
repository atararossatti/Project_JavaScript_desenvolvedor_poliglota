export function memoizer(fn) {
    const cache = new Map();

    const newFn = (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log(`Buscou do cache ${key}`);
            return cache.get(key);
        } else {
            console.log(`Não encontrou no cache ${key}. Adicionando no cache`);
            const result = fn(...args);
            cache.set(key, result);
            return result;
        }
    }
    newFn.release = () => {
        console.log('Limpando o cache');
        cache.clear();
    };

    return newFn;
}