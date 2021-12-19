import { AsyncStorage } from "react-native";
import { useAuth } from "../context/AuthContext";

export function checkPermission(permission) {
    const {
        state: { user },
    } = useAuth();
    let permissions = user.permissions ?? [];
    if (permissions.includes(permission)) return true;
    return false;
}
