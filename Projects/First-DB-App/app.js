class Customer {
    constructor(dbName) {
        this.dbName = dbName;
        if (!window.indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB. \
          Such and such feature will not be available.");
        }
    }

    /**
     * Remove all rows from the database
     * @memberof Customer
     */
    removeAllRows = () => {
        const request = indexedDB.open(this.dbName, 1);

        request.onerror = (event) => {
            console.log('removeAllRows - Database error: ', event.target.error.code,
                " - ", event.target.error.message);
        };

        request.onsuccess = (event) => {
            console.log('Deleting all customers...');
            const db = event.target.result;
            const txn = db.transaction('customers', 'readwrite');
            txn.onerror = (event) => {
                console.log('removeAllRows - Txn error: ', event.target.error.code,
                    " - ", event.target.error.message);
            };
            txn.oncomplete = (event) => {
                console.log('All rows removed!');
            };
            const objectStore = txn.objectStore('customers');
            const getAllKeysRequest = objectStore.getAllKeys();
            getAllKeysRequest.onsuccess = (event) => {
                getAllKeysRequest.result.forEach(key => {
                    objectStore.delete(key);
                });
            }
        }
    }
    queryAllRows = () => {
        const request = indexedDB.open(this.dbName, 1);

        request.onerror = (event) => {
            console.log('queryAllRows - Database error: ', event.target.error.code,
                " - ", event.target.error.message);
        };

        request.onsuccess = (event) => {
            console.log('Querying all customers...');
            const db = event.target.result;
            const txn = db.transaction('customers', 'readonly');
            txn.onerror = (event) => {
                console.log('queryAllRows - Txn error: ', event.target.error.code,
                    " - ", event.target.error.message);
            };
            txn.oncomplete = (event) => {
                console.log('All rows queried!');
            };
            const objectStore = txn.objectStore('customers');
            const getAllKeysRequest = objectStore.getAllKeys();
            getAllKeysRequest.onsuccess = (event) => {

            }
        }
    }
}
}