import React, { useMemo, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";

const COLORS = {
  background: "#F8F4FC",
  purple: "#A98BD4",
  lightPurple: "#EDE3F7",
  silver: "#D9D5E0",
  dark: "#423451",
  white: "#FFFFFF",
};

type Look = {
  id: string;
  title: string;
  category: string;
  image: string;
};

const looks: Look[] = [
  {
    id: "1",
    title: "Lavender Nail Inspo",
    category: "Nails",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600",
  },
  {
    id: "2",
    title: "Pink Nail Ideas",
    category: "Nails",
    image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600",
  },
  {
    id: "3",
    title: "Natural Hair Inspo",
    category: "Hair",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600",
  },
  {
    id: "4",
    title: "Braided Style",
    category: "Hair",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600",
  },
  {
    id: "5",
    title: "Everyday Outfit",
    category: "Outfits",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
  },
  {
    id: "6",
    title: "Street Style",
    category: "Outfits",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
  },
  {
    id: "7",
    title: "Soft Glam Inspo",
    category: "Makeup",
    image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=600",
  },
  {
    id: "8",
    title: "Beauty Look",
    category: "Makeup",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600",
  },
  {
    id: "9",
    title: "Beauty Essentials",
    category: "Wishlist",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
  },
  {
    id: "10",
    title: "Skincare Favorites",
    category: "Wishlist",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600",
  },
];

const categories = [
  "All",
  "Nails",
  "Hair",
  "Outfits",
  "Makeup",
  "Saved",
  "Wishlist",
];

const INITIAL_CATEGORY_MAP: Record<string, string> = {
  "Nail Inspiration": "Nails",
  "Hairstyle Board": "Hair",
  "Outfit Planner": "Outfits",
  "Makeup Inspiration": "Makeup",
  "Saved Looks": "Saved",
  "Beauty Wishlist": "Wishlist",
};

type BeautyScreenProps = {
  onBack?: () => void;
  initialCategory?: string;
};

export default function BeautyScreen({
  onBack,
  initialCategory,
}: BeautyScreenProps) {
  const startingCategory = useMemo(() => {
    if (!initialCategory) return "All";
    return INITIAL_CATEGORY_MAP[initialCategory] ?? initialCategory;
  }, [initialCategory]);

  const [category, setCategory] = useState(startingCategory);
  const [saved, setSaved] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSaved((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const toggleWishlist = (id: string) => {
    setWishlist((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const displayedLooks = looks.filter((look) => {
    if (category === "All") return true;
    if (category === "Saved") return saved.includes(look.id);
    if (category === "Wishlist") {
      return wishlist.includes(look.id) || look.category === "Wishlist";
    }
    return look.category === category;
  });

  const openLook = (look: Look) => {
    Alert.alert(look.title, "What would you like to do?", [
      {
        text: saved.includes(look.id) ? "Remove from Saved" : "Save Look ♡",
        onPress: () => toggleSave(look.id),
      },
      {
        text: wishlist.includes(look.id)
          ? "Remove from Wishlist"
          : "Add to Wishlist",
        onPress: () => toggleWishlist(look.id),
      },
      { text: "Close", style: "cancel" },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.logo}>HER ERA ♡</Text>
          <Text style={styles.tagline}>YOUR LIFE. YOUR SPACE. YOUR ERA.</Text>
        </View>

        <View style={styles.intro}>
          {onBack && (
            <TouchableOpacity onPress={onBack}>
              <Text style={styles.back}>‹ Back</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.eyebrow}>YOUR PERSONAL STYLE SPACE</Text>
          <Text style={styles.heading}>Beauty & Style ✨</Text>
          <Text style={styles.description}>
            Find inspiration. Save your favorites. Create your own era.
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setCategory(item)}
              style={[
                styles.categoryButton,
                category === item && styles.activeCategory,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === item && styles.activeCategoryText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.galleryHeader}>
          <Text style={styles.sectionTitle}>
            {category === "All" ? "Explore your style" : category}
          </Text>
          <Text style={styles.count}>{displayedLooks.length} looks</Text>
        </View>

        {displayedLooks.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🪻</Text>
            <Text style={styles.emptyTitle}>Your board is waiting!</Text>
            <Text style={styles.description}>
              Save some inspiration and it&apos;ll show up here.
            </Text>
          </View>
        ) : (
          <View style={styles.gallery}>
            {displayedLooks.map((look) => (
              <TouchableOpacity
                key={look.id}
                style={styles.imageCard}
                onPress={() => openLook(look)}
                activeOpacity={0.85}
              >
                <Image
                  source={{ uri: look.image }}
                  style={styles.photo}
                  resizeMode="cover"
                />

                <TouchableOpacity
                  style={styles.heart}
                  onPress={() => toggleSave(look.id)}
                >
                  <Text style={styles.heartText}>
                    {saved.includes(look.id) ? "♥" : "♡"}
                  </Text>
                </TouchableOpacity>

                <View style={styles.imageInfo}>
                  <Text style={styles.imageTitle} numberOfLines={2}>
                    {look.title}
                  </Text>
                  <Text style={styles.imageCategory}>{look.category}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>MADE FOR YOUR ERA ♡</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.lightPurple,
    paddingHorizontal: 23,
    paddingTop: 25,
    paddingBottom: 23,
    borderBottomLeftRadius: 27,
    borderBottomRightRadius: 27,
  },
  logo: {
    fontSize: 27,
    fontWeight: "900",
    color: COLORS.dark,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 9,
    letterSpacing: 2,
    color: "#78678B",
    marginTop: 5,
  },
  intro: {
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 15,
  },
  back: {
    color: COLORS.purple,
    fontWeight: "800",
    fontSize: 14,
    marginBottom: 14,
  },
  eyebrow: {
    color: COLORS.purple,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
  },
  heading: {
    fontSize: 30,
    fontWeight: "900",
    color: COLORS.dark,
    marginTop: 8,
  },
  description: {
    color: "#897D96",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
  },
  categoryList: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    gap: 9,
  },
  categoryButton: {
    paddingHorizontal: 17,
    paddingVertical: 11,
    backgroundColor: COLORS.white,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.silver,
  },
  activeCategory: {
    backgroundColor: COLORS.purple,
    borderColor: COLORS.purple,
  },
  categoryText: {
    color: COLORS.dark,
    fontSize: 12,
    fontWeight: "700",
  },
  activeCategoryText: {
    color: COLORS.white,
  },
  galleryHeader: {
    paddingHorizontal: 22,
    marginTop: 16,
    marginBottom: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: COLORS.dark,
    fontSize: 19,
    fontWeight: "900",
  },
  count: {
    color: "#93869F",
    fontSize: 11,
  },
  gallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  imageCard: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: 17,
    overflow: "hidden",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E9E1F0",
  },
  photo: {
    width: "100%",
    height: 190,
    backgroundColor: COLORS.lightPurple,
  },
  heart: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FFFFFFE8",
    borderRadius: 20,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  heartText: {
    color: "#A477B8",
    fontSize: 21,
  },
  imageInfo: {
    padding: 11,
  },
  imageTitle: {
    fontSize: 13,
    color: COLORS.dark,
    fontWeight: "800",
  },
  imageCategory: {
    fontSize: 10,
    color: "#9A8AA8",
    marginTop: 5,
  },
  empty: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    padding: 28,
    borderRadius: 20,
    alignItems: "center",
  },
  emptyEmoji: {
    fontSize: 36,
  },
  emptyTitle: {
    color: COLORS.dark,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 10,
  },
  footer: {
    padding: 25,
    alignItems: "center",
  },
  footerText: {
    color: "#A092AE",
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: "800",
  },
});
