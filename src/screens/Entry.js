import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { SearchBar } from 'react-native-elements';

import style from '../styles/Entry';


const Entry = () => {
    const [search, setSearch] = useState("");
    const [personSelected, setPersonSelected] = useState(false)
    const handleSearchChange=(search)=>{
        console.log(search);
    }
    return (
        <View>
            <View>
                <View>
                    <SearchBar
                        placeholder="Type to search"
                        onChangeText={handleSearchChange}
                        value={search}
                    />
                </View>
                {personSelected?<View>
                    User is Selected
                </View>:<View>
                    Users List    
                </View>}
            </View>
        </View>
    );
}

export default Entry;
