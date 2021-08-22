import React, { useEffect, useState } from "react"
import { 
    View
} from "react-native"
import UserListRowItem from "./user-list-row"
const UserListComponent = (
    props
) => {
    const [
        users, setUsers
    ] = useState([])
    useEffect(
        () => {
            setUsers(
                props.users
            )
        },
        [
            props.users        
        ]
    )
    return (
        <View
            style={
                {
                    flex: 1,
                    marginLeft: 12,
                    marginRight: 12,
                    flexDirection: 'column',
                }
            }
        >
            {
                users? (
                    users.map(
                        (
                            user, index
                        ) =>{
                            
                            return (
                                <UserListRowItem
                                    onClickHandler={
                                        props.setPersonSelected
                                    }
                                    key={
                                        index
                                    }
                                    user={
                                        user
                                    }
                                >
                                </UserListRowItem>
                            )
                        }
                    )
                ) : (
                    <View></View>
                )
            }
        </View>
    )    
}

export default UserListComponent