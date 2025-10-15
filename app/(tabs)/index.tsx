import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useActivitiesContext } from "@/components/ActivitiesProvider";
import { FlashList } from "@shopify/flash-list";

type Activity = {
  id: number;
  steps: number;
  date: number;
};

export default function HomeScreen() {
  const router = useRouter();
  const { activities, deleteActivity, deleteAllActivities } =
    useActivitiesContext();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const renderItem = ({ item }: { item: Activity }) => (
    <View style={styles.activityItem}>
      <View style={styles.activityInfo}>
        <Text style={styles.dateText}>{formatDate(item.date)}</Text>
        <Text style={styles.stepsText}>Steps: {item.steps}</Text>
      </View>
      <Pressable
        style={styles.deleteButton}
        onPress={() => deleteActivity(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </View>
  );

  const renderEmptyComponent = () => (
    <Text style={styles.emptyText}>
      No activities yet. Add one to get started!
    </Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.listWrapper}>
        <FlashList
          data={activities || []}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={styles.listContentContainer}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => router.push("/add-activity-screen")}
        >
          <Text style={styles.buttonText}>Add Activity</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.deleteAllButton]}
          onPress={deleteAllActivities}
        >
          <Text style={styles.buttonText}>Delete all activities</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FEF9E6",
  },
  listWrapper: {
    flex: 1,
  },
  listContentContainer: {
    paddingBottom: 20,
  },
  buttonContainer: {
    paddingTop: 10,
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
    marginTop: 0,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
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
    color: "#000000",
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
