import React from "react";

import DrawerNavigator from "./drawerNavigator";
import AuthStack from "./AuthStack";
import { useAuth } from "../context/AuthContext";

const MainStack = () => {
    const {
        state: { user },
    } = useAuth();
    if (!user) {
        return <AuthStack />;
    } else {
        return <DrawerNavigator />;
    }
};

export default MainStack;
