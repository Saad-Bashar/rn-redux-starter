import { useState } from "react";
import { StyleSheet, Text, View, Button, Image, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { incrementByAmount, selectCount } from "../store/counterSlice";
import { useFetchBreedsQuery } from "../store/dogs-api-slice";
import { selectMode, toggleMode } from "../store/themeSlice";
import { RootTabScreenProps } from "../types";
import DropDownPicker from 'react-native-dropdown-picker';


export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const dispatch = useDispatch()
  const theme = useSelector(selectMode)
  const counter = useSelector(selectCount)
  const backgroudColor = theme === 'light' ? '#fff' : '#000'
  const textColor = theme === 'light' ? '#000' : '#fff'
  const [numDogs, setNumDogs] = useState(10)
  const { data = [], isFetching } = useFetchBreedsQuery(numDogs)
  const [items, setItems] = useState([
    {label: '10', value: 10},
    {label: '5', value: 5},
    {label: '15', value: 15},
    {label: '20', value: 20}
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <SafeAreaView style={{flex:1}}>
       <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={(item) => setNumDogs(item as number)}
        setItems={setItems}
      />
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: backgroudColor },
      ]}
    >
      <Text>Number of dogs fetched {data.length}</Text>
      {data.map((breed) => {
        return (
          <View>
            <Text>{breed.name}</Text>
            <Image source={{ uri: breed.image.url }} style={{  height: 200, width: 200}} />
          </View>
        )
      })}
      {/* <Text style={[styles.title, {color: textColor}]}>Tab One</Text>
      <Text>{counter}</Text>
      <Button
        title="TOGGLE THEME"
        onPress={() => {
          dispatch(toggleMode())
        }}
      />
      <Button
        title="INCREMENT BY 2"
        onPress={() => {
          dispatch(incrementByAmount(6))
        }}
      /> */}
      
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
