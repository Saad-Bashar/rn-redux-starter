import { StyleSheet, Text, View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectMode, toggleMode } from "../store/themeSlice";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  const dispatch = useDispatch()
  const theme = useSelector(selectMode)
  const backgroudColor = theme === 'light' ? '#fff' : '#000'
  const textColor = theme === 'light' ? '#000' : '#fff'
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroudColor },
      ]}
    >
      <Text style={[styles.title, {color: textColor}]}>Tab Two</Text>
      <Button
        title="TOGGLE THEME"
        onPress={() => {
          dispatch(toggleMode())
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
