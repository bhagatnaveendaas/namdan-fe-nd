import React from "react";

import DrawerNavigator from "./drawerNavigator";
import AuthStack from "./AuthStack";
import { useAuth } from "../context/AuthContext";
import { DetailProvider } from "../context/DetailContex";

const MainStack = () => {
    const {
        state: { user },
    } = useAuth();
    if (!user) {
        return <AuthStack />;
    } else {
        return (
            <DetailProvider>
                <DrawerNavigator />
            </DetailProvider>
        );
    }
};

export default MainStack;
