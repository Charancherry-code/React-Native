import { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Venue = {
  id: number;
  name: string;
  sport: string;
  rating: number;
  location: string;
  price: number;
};

const VENUES: Venue[] = [
  {
    id: 1,
    name: "Elite Turf Arena",
    sport: "Football",
    rating: 4.5,
    location: "Delhi",
    price: 1200,
  },
  {
    id: 2,
    name: "Smash Badminton Club",
    sport: "Badminton",
    rating: 4.2,
    location: "Noida",
    price: 500,
  },
];

const SPORTS = ["All", "Football", "Badminton"] as const;
const SORT_OPTIONS = [
  "Recommended",
  "Price: Low to High",
  "Rating: High to Low",
] as const;

export default function HomeScreen() {
  const [selectedSport, setSelectedSport] =
    useState<(typeof SPORTS)[number]>("All");
  const [selectedSort, setSelectedSort] =
    useState<(typeof SORT_OPTIONS)[number]>("Recommended");

  const venues = useMemo(() => {
    const filteredVenues =
      selectedSport === "All"
        ? VENUES
        : VENUES.filter((venue) => venue.sport === selectedSport);

    const sortedVenues = [...filteredVenues].sort((left, right) => {
      if (selectedSort === "Price: Low to High") {
        return left.price - right.price;
      }

      if (selectedSort === "Rating: High to Low") {
        return right.rating - left.rating;
      }

      return left.id - right.id;
    });

    return sortedVenues;
  }, [selectedSport, selectedSort]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={venues}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.kicker}>Browse Sports Venues</Text>
            <Text style={styles.title}>
              Find the right court or turf in seconds.
            </Text>
            <Text style={styles.subtitle}>
              Filter by sport, sort by price or rating, and book instantly.
            </Text>

            <View style={styles.sectionBlock}>
              <Text style={styles.sectionLabel}>Filter by sport</Text>
              <View style={styles.chipsRow}>
                {SPORTS.map((sport) => (
                  <Pressable
                    key={sport}
                    onPress={() => setSelectedSport(sport)}
                    style={({ pressed }) => [
                      styles.chip,
                      selectedSport === sport && styles.chipActive,
                      pressed && styles.chipPressed,
                    ]}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        selectedSport === sport && styles.chipTextActive,
                      ]}
                    >
                      {sport}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.sectionBlock}>
              <Text style={styles.sectionLabel}>Sort venues</Text>
              <View style={styles.chipsRow}>
                {SORT_OPTIONS.map((option) => (
                  <Pressable
                    key={option}
                    onPress={() => setSelectedSort(option)}
                    style={({ pressed }) => [
                      styles.chip,
                      selectedSort === option && styles.chipActive,
                      pressed && styles.chipPressed,
                    ]}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        selectedSort === option && styles.chipTextActive,
                      ]}
                    >
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.resultsBar}>
              <Text style={styles.resultsText}>
                {venues.length} venues found
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No venues match this filter.</Text>
            <Text style={styles.emptySubtitle}>
              Try a different sport or sort option.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardTopRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.sport}</Text>
              </View>
              <Text style={styles.location}>{item.location}</Text>
            </View>

            <Text style={styles.name}>{item.name}</Text>

            <View style={styles.detailsRow}>
              <Detail label="Rating" value={item.rating.toFixed(1)} />
              <Detail label="Price" value={`₹${item.price}`} />
            </View>

            <Pressable
              onPress={() => Alert.alert(`Booking for ${item.name}`)}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.buttonText}>Book Now</Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F0E8",
  },
  listContent: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    gap: 14,
    marginBottom: 16,
  },
  kicker: {
    color: "#1F6F5B",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  title: {
    color: "#122018",
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
  },
  subtitle: {
    color: "#53615B",
    fontSize: 15,
    lineHeight: 22,
  },
  sectionBlock: {
    gap: 10,
    marginTop: 4,
  },
  sectionLabel: {
    color: "#122018",
    fontSize: 14,
    fontWeight: "700",
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#FFF9F2",
    borderWidth: 1,
    borderColor: "#D9D3C8",
  },
  chipActive: {
    backgroundColor: "#122018",
    borderColor: "#122018",
  },
  chipPressed: {
    opacity: 0.8,
  },
  chipText: {
    color: "#38443E",
    fontSize: 13,
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
  resultsBar: {
    backgroundColor: "#E8EFE8",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginTop: 4,
  },
  resultsText: {
    color: "#1F6F5B",
    fontSize: 13,
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E7DED2",
    shadowColor: "#1A1510",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  badge: {
    backgroundColor: "#F2F7F4",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: "#1F6F5B",
    fontSize: 12,
    fontWeight: "700",
  },
  location: {
    color: "#6B6962",
    fontSize: 13,
    fontWeight: "600",
  },
  name: {
    color: "#122018",
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "800",
    marginBottom: 14,
  },
  detailsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
    backgroundColor: "#FAF7F1",
    borderRadius: 18,
    padding: 14,
  },
  detailLabel: {
    color: "#736C61",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
  },
  detailValue: {
    color: "#122018",
    fontSize: 16,
    fontWeight: "800",
  },
  button: {
    backgroundColor: "#122018",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.92,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyTitle: {
    color: "#122018",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  emptySubtitle: {
    color: "#53615B",
    fontSize: 14,
    textAlign: "center",
  },
});
