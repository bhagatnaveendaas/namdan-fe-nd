import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { SearchBar } from 'react-native-elements';

import style from '../styles/Entry';


const Entry = () => {
    const [search, setSearch] = useState("");
    const [personSelected, setPersonSelected] = useState(false)
    const handleSearchChange=(e)=>{
        
    }
    return (
        <View>
            <View>
                <View>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
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
