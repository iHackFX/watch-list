import { Storage } from '@ionic/storage';

class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public get(key: string){
    return this._storage?.get(key);
  }
}
var storage = new StorageService(new Storage());
export default storage;
export {StorageService}