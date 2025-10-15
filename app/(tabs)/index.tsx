import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useActivitiesContext } from "@/components/ActivitiesProvider";

export default function HomeScreen() {
  const router = useRouter();
  const { activities, deleteActivity } = useActivitiesContext();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.listContainer}>
        {activities && activities.length > 0 ? (
          activities.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={styles.activityInfo}>
                <Text style={styles.dateText}>{formatDate(activity.date)}</Text>
                <Text style={styles.stepsText}>Steps: {activity.steps}</Text>
              </View>
              <Pressable
                style={styles.deleteButton}
                onPress={() => deleteActivity(activity.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </Pressable>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>
            No activities yet. Add one to get started!
          </Text>
        )}
      </ScrollView>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/add-activity-screen")}
      >
        <Text style={styles.buttonText}>Add Activity</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.deleteAllButton]}
        onPress={() => router.push("/add-activity-screen")}
      >
        <Text style={styles.buttonText}>Delete all activities</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FEF9E6",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1ED2AF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 0,
    marginBottom: 0,
  },
  deleteAllButton: {
    backgroundColor: "#D00414",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  listContainer: {
    flex: 1,
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 0,
    borderWidth: 2,
    borderColor: "#000",
    marginBottom: 10,
  },
  activityInfo: {
    flex: 1,
  },
  stepsText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
  },
  dateText: {
    fontSize: 12,
    color: "#666",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 0,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
});
