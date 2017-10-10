import { LocalStorage } from 'node-localstorage'

export class AsyncNodeStorage {
  private localStorage: LocalStorage

  constructor(storageDirectory: string) {
    this.localStorage = new LocalStorage(storageDirectory)
  }

  getItem (key: string, cb: (error: Error, result?: string) => void) {
    try {
      const storedValue = this.localStorage.getItem(key)
      process.nextTick(() => cb(null, storedValue))
      return Promise.resolve(storedValue)
    } catch (e) {
      cb(e)
      return Promise.reject(e)
    }
  }

  setItem (key: string, value: string | number, cb: (error: Error) => void) {
    try {
      this.localStorage.setItem(key, value)
      process.nextTick(() => cb(null))
      return Promise.resolve()
    } catch (e) {
      cb(e)
      return Promise.reject(e)
    }
  }

  removeItem (key: string, cb: (error: Error) => void) {
    try {
      this.localStorage.removeItem(key)
      process.nextTick(() => cb(null))
      return Promise.resolve()
    } catch (e) {
      cb(e)
      return Promise.reject(e)
    }
  }

  getAllKeys (cb: (error: Error, keys?: string[]) => void) {
    try {
      let keys = []
      for (let i = 0; i < this.localStorage.length; i++) {
        keys.push(this.localStorage.key(i))
      }
      process.nextTick(() => cb(null, keys))
      return Promise.resolve(keys)
    } catch (e) {
      cb(e)
      return Promise.reject(e)
    }
  }
}
