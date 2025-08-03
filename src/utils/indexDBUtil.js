const DB_NAME = 'todoDB';
const STORE_NAME = 'todoStore';

const openIndexedDB = () => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id'});
            console.log(`Object store '${STORE_NAME}' created.`);
        } else {
            console.log(`Object store '${STORE_NAME}' already exists.`);
        }
    };

    request.onsuccess = () => {
        const db = request.result;
        if (db.objectStoreNames.contains(STORE_NAME)) {
            console.log(`Object store '${STORE_NAME}' exists in the opened database.`);
        } else {
            console.log(`Object store '${STORE_NAME}' does not exist in the opened database.`);
        }
        db.close();
    };

    request.onerror = (event) => {
        console.error('Error opening database:', request.errorCode);
    };
}

const getAllTodos = (callback) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);

        const query = store.getAll();
        query.onsuccess = () => {
            console.log(query.result);
            callback(query.result);
        };

        transaction.oncomplete = () => {
            db.close();
        };
    };
}

const postTodo = (payload) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);

        const query = store.add(payload);
        query.onsuccess = () => {
            console.log('Task inserted to DB')
            console.log(query.result);
        };

        transaction.oncomplete = () => {
            db.close();
        };
    };
}

const putTodo = (payload) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);

        const query = store.put(payload);
        query.onsuccess = () => {
            console.log('Task inserted to DB')
            console.log(query.result);
        };

        transaction.oncomplete = () => {
            db.close();
        };
    };
}

const deleteTodo = (payload) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);

        const query = store.delete(payload.id);
        query.onsuccess = () => {
            console.log(`Task - ${payload.id} deleted from DB`);
        };

        transaction.oncomplete = () => {
            db.close();
        };
    };
}

export {
    openIndexedDB,
    getAllTodos,
    postTodo,
    putTodo,
    deleteTodo
}