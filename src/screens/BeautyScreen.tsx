import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

const PURPLE = "#A98BD4";
const LIGHT = "#F5EFFB";
const DARK = "#423451";

const categories = [
  {
    name: "Nail Inspiration",
    emoji: "💅",
    description: "Save your favorite nail sets",
  },
  {
    name: "Hairstyle Board",
    emoji: "💇‍♀️",
    description: "Collect hairstyle ideas",
  },
  {
    name: "Outfit Planner",
    emoji: "👗",
    description: "Plan your next outfit",
  },
  {
    name: "Makeup Inspiration",
    emoji: "💄",
    description: "Create your makeup board",
  },
  {
    name: "Saved Looks",
    emoji: "⭐",
    description: "All your favorite looks",
  },
  {
    name: "Beauty Wishlist",
    emoji: "🛍️",
    description: "Keep track of things you want",
  },
] as const;

type CategoryName = (typeof categories)[number]["name"];

type Idea = {
  category: CategoryName;
  text: string;
};

type BeautyScreenProps = {
  onBack?: () => void;
  initialCategory?: CategoryName;
};

export default function BeautyScreen({
  onBack,
  initialCategory,
}: BeautyScreenProps) {
  const [page, setPage] = useState<"Beauty" | "Category">(
    initialCategory ? "Category" : "Beauty"
  );
  const [selected, setSelected] = useState<CategoryName | "">(
    initialCategory ?? ""
  );
  const [idea, setIdea] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [saved, setSaved] = useState<string[]>([]);

  const addIdea = () => {
    if (!idea.trim()) {
      Alert.alert("Add an idea", "Type something first!");
      return;
    }
    if (!selected || selected === "Saved Looks") return;

    setIdeas([...ideas, { category: selected, text: idea.trim() }]);
    setIdea("");
  };

  const saveLook = (item: string) => {
    if (!saved.includes(item)) {
      setSaved([...saved, item]);
      Alert.alert("Saved! 💜", "Added to your Saved Looks.");
    } else {
      Alert.alert("Already saved", "This is already in your Saved Looks.");
    }
  };

  const showCategory = (name: CategoryName) => {
    setSelected(name);
    setPage("Category");
  };

  const list: string[] =
    selected === "Saved Looks"
      ? saved
      : ideas
          .filter((item) => item.category === selected)
          .map((item) => item.text);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.brand}>HER ERA ♡</Text>
          <Text style={styles.subtitle}>YOUR LIFE. YOUR SPACE. YOUR ERA.</Text>
        </View>

        {page === "Beauty" && (
          <View style={styles.content}>
            {onBack && (
              <TouchableOpacity onPress={onBack}>
                <Text style={styles.back}>‹ Back</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.smallTitle}>YOUR PERSONAL BEAUTY SPACE</Text>
            <Text style={styles.heading}>Beauty & Style ✨</Text>
            <Text style={styles.description}>
              Your ideas, your style, your era.
            </Text>

            {categories.map((item) => (
              <TouchableOpacity
                key={item.name}
                style={styles.category}
                onPress={() => showCategory(item.name)}
              >
                <Text style={styles.emoji}>{item.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.categoryTitle}>{item.name}</Text>
                  <Text style={styles.categoryDescription}>
                    {item.description}
                  </Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {page === "Category" && (
          <View style={styles.content}>
            <TouchableOpacity onPress={() => setPage("Beauty")}>
              <Text style={styles.back}>‹ Back to Beauty</Text>
            </TouchableOpacity>

            <Text style={styles.heading}>{selected}</Text>
            <Text style={styles.description}>
              Keep all your inspiration in one place.
            </Text>

            {selected !== "Saved Looks" && (
              <View style={styles.inputCard}>
                <Text style={styles.inputTitle}>
                  {selected === "Beauty Wishlist"
                    ? "What do you want?"
                    : "Add a new idea"}
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Type your idea here..."
                  placeholderTextColor="#9C91A8"
                  value={idea}
                  onChangeText={setIdea}
                  onSubmitEditing={addIdea}
                />

                <TouchableOpacity style={styles.addButton} onPress={addIdea}>
                  <Text style={styles.addButtonText}>+ Add to my board</Text>
                </TouchableOpacity>
              </View>
            )}

            <Text style={styles.sectionTitle}>
              {selected === "Saved Looks" ? "YOUR SAVED LOOKS" : "YOUR BOARD"}
            </Text>

            {list.length === 0 ? (
              <View style={styles.empty}>
                <Text style={styles.emptyEmoji}>🪻</Text>
                <Text style={styles.emptyTitle}>Nothing here yet!</Text>
                <Text style={styles.description}>
                  Add your first idea and start building your board.
                </Text>
              </View>
            ) : (
              list.map((item, index) => (
                <View key={`${item}-${index}`} style={styles.ideaCard}>
                  <Text style={styles.ideaText}>{item}</Text>

                  {selected !== "Saved Looks" && (
                    <TouchableOpacity
                      onPress={() => saveLook(item)}
                      style={styles.saveButton}
                    >
                      <Text style={styles.saveText}>☆ Save</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT,
  },
  header: {
    backgroundColor: "#E9DDF7",
    paddingTop: 28,
    paddingBottom: 25,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  brand: {
    fontSize: 27,
    fontWeight: "900",
    color: DARK,
    letterSpacing: 2,
  },
  subtitle: {
    color: "#766488",
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 5,
  },
  content: {
    padding: 22,
  },
  smallTitle: {
    color: PURPLE,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    marginTop: 12,
  },
  heading: {
    fontSize: 29,
    fontWeight: "900",
    color: DARK,
    marginTop: 9,
  },
  description: {
    color: "#82758F",
    fontSize: 13,
    marginTop: 7,
    lineHeight: 20,
  },
  category: {
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    padding: 17,
    marginTop: 13,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9DFF2",
  },
  emoji: {
    fontSize: 27,
    marginRight: 14,
  },
  categoryTitle: {
    fontSize: 15,
    color: DARK,
    fontWeight: "800",
  },
  categoryDescription: {
    color: "#93879D",
    fontSize: 11,
    marginTop: 4,
  },
  arrow: {
    fontSize: 27,
    color: PURPLE,
  },
  back: {
    color: PURPLE,
    fontWeight: "800",
    fontSize: 14,
    marginBottom: 20,
  },
  inputCard: {
    backgroundColor: "#FFFFFF",
    padding: 17,
    borderRadius: 19,
    marginTop: 22,
    borderWidth: 1,
    borderColor: "#E9DFF2",
  },
  inputTitle: {
    color: DARK,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#F8F4FC",
    borderRadius: 12,
    padding: 14,
    color: DARK,
    fontSize: 14,
  },
  addButton: {
    backgroundColor: PURPLE,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  sectionTitle: {
    color: "#88769D",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
    marginTop: 25,
    marginBottom: 12,
  },
  empty: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    marginTop: 5,
  },
  emptyEmoji: {
    fontSize: 35,
  },
  emptyTitle: {
    fontSize: 17,
    color: DARK,
    fontWeight: "800",
    marginTop: 10,
  },
  ideaCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ideaText: {
    color: DARK,
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  saveButton: {
    backgroundColor: "#EFE6F8",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    marginLeft: 8,
  },
  saveText: {
    color: "#80649F",
    fontWeight: "800",
    fontSize: 12,
  },
});
