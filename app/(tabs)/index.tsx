import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useActivitiesContext } from "@/components/ActivitiesProvider";
import { FlashList } from "@shopify/flash-list";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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

  const renderRightActions = (item: Activity) => {
    return (
      <View style={styles.swipeActionContainer}>
        <Pressable
          style={styles.swipeDeleteButton}
          onPress={() => deleteActivity(item.id)}
        >
          <Text style={styles.swipeDeleteText}>Delete</Text>
        </Pressable>
      </View>
    );
  };

  const renderItem = ({ item }: { item: Activity }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item)}
      overshootRight={false}
    >
      <View style={styles.activityItem}>
        <View style={styles.activityInfo}>
          <Text style={styles.dateText}>{formatDate(item.date)}</Text>
          <Text style={styles.stepsText}>Steps: {item.steps}</Text>
        </View>
      </View>
    </Swipeable>
  );

  const renderEmptyComponent = () => (
    <Text style={styles.emptyText}>
      No activities yet. Add one to get started!
    </Text>
  );

  return (
    <GestureHandlerRootView style={styles.gestureContainer}>
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
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
  },
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
  swipeActionContainer: {
    justifyContent: "center",
    marginBottom: 10,
  },
  swipeDeleteButton: {
    backgroundColor: "#D00414",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: "100%",
    borderWidth: 2,
    borderColor: "#000",
    borderLeftWidth: 0,
  },
  swipeDeleteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
});
