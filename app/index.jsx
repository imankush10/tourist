import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { CoinsIcon, Search, ChevronLeft } from "lucide-react-native";
import "../global.css";

const FAMOUS_CITIES = [
  {
    id: 1,
    name: "Mumbai",
    image: "https://s7ap1.scene7.com/is/image/incredibleindia/gateway-of-india-mumbai-maharashtra-2-attr-hero?qlt=82&ts=1727355556744",
    description: "Gateway of India",
  },
  {
    id: 2,
    name: "Delhi",
    image: "https://deih43ym53wif.cloudfront.net/large_Rajpath-delhi-shutterstock_1195751923.jpg_7647e1aad2.jpg",
    description: "India Gate",
  },
  {
    id: 3,
    name: "Jaipur",
    image: "https://www.jcrcab.com/wp-content/uploads/2020/08/rajasthan-jaipur-148046451622-orijgp.jpg",
    description: "Pink City",
  },
  {
    id: 4,
    name: "Agra",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Taj_Mahal%2C_Agra%2C_India.jpg/1200px-Taj_Mahal%2C_Agra%2C_India.jpg",
    description: "Taj Mahal",
  },
];

const ECO_RULES = [
  { id: 1, rule: "Dispose wrappers in designated dustbins only", points: 5 },
  { id: 2, rule: "Use reusable water bottles when possible", points: 5 },
  { id: 3, rule: "Avoid plastic bags while shopping", points: 5 },
  { id: 4, rule: "Use public transport to reduce carbon footprint", points: 5 },
  { id: 5, rule: "Maintain cleanliness at tourist spots", points: 5 },
];

const TouristApp = () => {
  const [coins, setCoins] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [completedRules, setCompletedRules] = useState(new Set());

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setCompletedRules(new Set());
  };

  const handleRuleComplete = (ruleId) => {
    if (!completedRules.has(ruleId)) {
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 1000);
      setCoins((prev) => prev + 5);
      setCompletedRules((prev) => new Set([...prev, ruleId]));
    }
  };

  return (
    <View className="flex-1 bg-neutral-900">
      {/* Header */}
      <View className="px-6 py-4 bg-neutral-800 shadow-lg">
        <View className="flex-row justify-between items-center">
          <Text className="text-3xl font-bold text-white">EcoTourist</Text>
          <View className="gap-2 flex-row items-center space-x-2 bg-neutral-700 px-4 py-2 rounded-full">
            <CoinsIcon color="#FFD700" size={20} />
            <Text className="text-white font-bold text-lg">{coins}</Text>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View className="p-4 flex-row items-center bg-neutral-800 px-4 rounded-b-xl mb-4 gap-2">
          <Search className="z-10" color="#9CA3AF" size={20} />
          <TextInput
            placeholder="Search cities..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="w-full rounded-xl text-lg text-white"
          />
      </View>

      {!selectedCity ? (
        // Cities Grid
        <FlatList
          data={FAMOUS_CITIES.filter((city) =>
            city.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          className="px-2"
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleCitySelect(item)}
              className="w-1/2 p-2"
            >
              <View className="bg-neutral-800 rounded-xl overflow-hidden shadow-lg">
                <Image
                  source={{ uri: item.image }}
                  className="h-40 w-full"
                  resizeMode="cover"
                />
                <View className="p-3 bg-black bg-opacity-40">
                  <Text className="text-white font-bold text-lg">{item.name}</Text>
                  <Text className="text-neutral-300 text-sm">{item.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        // Eco Rules Screen
        <ScrollView className="flex-1 px-4 py-2">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-2xl font-bold text-white">{selectedCity.name}</Text>
              <Text className="text-neutral-400">Complete eco-friendly tasks</Text>
            </View>
            <TouchableOpacity
              onPress={() => setSelectedCity(null)}
              className="flex-row items-center bg-blue-600 px-4 py-2 rounded-full"
            >
              <ChevronLeft color="white" size={20} />
              <Text className="text-white ml-1 font-medium">Back</Text>
            </TouchableOpacity>
          </View>

          {ECO_RULES.map((rule) => (
            <TouchableOpacity
              key={rule.id}
              onPress={() => handleRuleComplete(rule.id)}
              className="mb-4"
            >
              <View className="flex-row items-center bg-neutral-800 p-4 rounded-xl">
                <View
                  className={`w-6 h-6 rounded-full mr-4 items-center justify-center ${
                    completedRules.has(rule.id)
                      ? "bg-green-500"
                      : "border-2 border-neutral-400"
                  }`}
                >
                  {completedRules.has(rule.id) && (
                    <Text className="text-white text-xs">✓</Text>
                  )}
                </View>
                <Text className="flex-1 text-white">{rule.rule}</Text>
                <Text className="text-green-400 font-bold">+{rule.points}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {showAnimation && (
            <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Text className="text-3xl font-bold text-green-500 animate-bounce">
                +5 Coins!
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default TouristApp;