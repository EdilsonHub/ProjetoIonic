import { CredenciaisDTO } from "../models/credenciais.dto";
import { STORAGE_KEYS } from "../../config/storage_key.config";
import { LocalUser } from "../models/localUser.dto";

export class StorageService {

    getLocalUser(): LocalUser {
        let user = localStorage.getItem(STORAGE_KEYS.localUser);
        if(user == null) return null;
        else {
            return JSON.parse(user);
        }
    }

    setLocalUser(usuario: LocalUser) {
        if(usuario == null) localStorage.removeItem(STORAGE_KEYS.localUser);
        else localStorage.setItem(STORAGE_KEYS.localUser,JSON.stringify(usuario)); 
    }
}