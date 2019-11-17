// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import setGlobalVars from 'indexeddbshim';
import Dexie from 'dexie';

const shim = {};
setGlobalVars(shim, { checkOrigin: false });

const { indexedDB, IDBKeyRange } = shim as typeof Dexie.dependencies;
Dexie.dependencies.indexedDB = indexedDB;
Dexie.dependencies.IDBKeyRange = IDBKeyRange;
