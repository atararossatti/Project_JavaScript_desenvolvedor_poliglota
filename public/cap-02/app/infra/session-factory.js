export class SessionFactory {
    constructor(config) {
        this.dbName = config.dbName;
        this.dbVersion = config.dbVersion;
        this.stores = new Map();
        config.mappers.forEach(mapper => {
            this.stores.set(
                mapper.clazz.name, 
                mapper.converter
            )
        });
    }

    async openSession() {
        const connection = await createConnection(
            this.dbName, 
            this.dbVersion, 
            this.stores
        )

        return new Session(connection, this.stores);
    }
}

class Session {
    constructor(connection, stores) {
        this.connection = connection;
        this.stores = stores;
    }

    save(object) {
        return new Promise((resolve, reject) => {
            const storeName = object.constructor.name;
            const request = this.connection
                .transaction([storeName], 'readwrite')
                .objectStore(storeName)
                .add(object);
            request.onsuccess = e => resolve();
            request.onerror = e => {
                console.log(e.target.error);
                reject(`Não foi possível persistir o objeto na store ${storeName}`);
            }
        });
    } 
   
    list(clazz) {
        return new Promise((resolve, reject) => {
            const storeName = clazz.name;
            const store = this.connection
                .transaction([storeName], 'readwrite')
                .objectStore(storeName);
            const cursor = store.openCursor();
            const converter = this.stores.get(storeName);
            const list = [];
            cursor.onsuccess = e => {
                const current = e.target.result;
                if (current) {
                    const value = current.value;
                    list.push(converter(value));
                    current.continue();
                } else {
                    resolve(list);
                }
            };
        });
    }   
}

function createConnection(dbName, dbVersion, stores) {

    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onupgradeneeded = e => {
            const transactionalConnection = e.target.result;
            for (let [key, value] of stores) {
                const store = key;
            
                if (transactionalConnection.objectStoreNames.contains(store)) {
                    transactionalConnection.deleteObjectStore(store);
                }   
                transactionalConnection.createObjectStore(store, { autoIncrement: true });
            }     
        };

        request.onsuccess = e => {
            const connection = e.target.result;
            resolve(connection);
        }

        request.onerror = e => {
            console.log(e.target.error);
            reject(`Não foi possível obter a conexão com o banco ${dbVersion}`);
        }
    });
}

