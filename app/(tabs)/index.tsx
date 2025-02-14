import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-2xl font-bold">Eublepharis Macularius</Text>
      <Link className="text-blue-500 underline" href="/about">About</Link>
    </View>
  );
}