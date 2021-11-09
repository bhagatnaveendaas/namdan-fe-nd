import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput } from "react-native";
import styles from "../styles/FormInput";

const SearchableFlatlist = ({ data, label, required, placeholderText, searchTerm, onChangeOfSearchTerm, onValueChange }) => {

  const [open, setOpen] = useState(false);

  const getFilteredResults = () => {
    if(!searchTerm) return data;
    return data.filter(item => new RegExp(`${searchTerm}`, "gi").test(item.name))
  }

  return <>
    <Text style={[styles.label, { marginBottom: 2 }]}>
      {label}
      {required && <Text style={styles.required}>{" *"}</Text>}
    </Text>
    <TextInput
      onFocus={() => setOpen(true)}
      style={searchableFlatListStyles.input}
      placeholder={placeholderText}
      onChangeText={onChangeOfSearchTerm}
      value={searchTerm}
    />
    {open && <FlatList data={getFilteredResults()} renderItem={({ item }) => <Text onPress={() => {
      setOpen(false)
      onChangeOfSearchTerm(item.name)
      onValueChange(item)
    }}>
      {item.name}
    </Text>} />}
  </>;
}

const searchableFlatListStyles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default SearchableFlatlist;
