import React, { useState } from "react";

import DrawerNavigator from "./drawerNavigator";
import AuthStack from "./AuthStack";
import { useAuth } from "../context/AuthContext";
import { DetailProvider } from "../context/DetailContex";
import Loading from "../screens/loading";

const MainStack = () => {
    const {
        state: { user },
    } = useAuth();

    const [isLoading, setIsLoading] = useState(true)

    if (isLoading) {
        return <Loading setIsLoading={setIsLoading} />
    }

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
