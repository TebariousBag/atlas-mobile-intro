import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useActivitiesContext } from "@/components/ActivitiesProvider";
import { useState } from "react";

export default function AddActivityScreen() {
  const router = useRouter();
  const { insertActivity } = useActivitiesContext();
  const [steps, setSteps] = useState("");

  const handleAddActivity = () => {
    const stepsNumber = parseInt(steps);

    if (!steps || isNaN(stepsNumber) || stepsNumber <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid number of steps");
      return;
    }

    insertActivity(stepsNumber, new Date());
    setSteps("");
    Alert.alert("Success", "Activity added successfully!", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Activity</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Number of Steps</Text>
        <TextInput
          style={styles.input}
          value={steps}
          onChangeText={setSteps}
          placeholder="Enter number of steps"
          keyboardType="numeric"
        />

        <Pressable style={styles.addButton} onPress={handleAddActivity}>
          <Text style={styles.buttonText}>Add Activity</Text>
        </Pressable>

        <Pressable style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 40,
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
});
