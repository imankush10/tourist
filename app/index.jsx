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
import { CoinsIcon, Search } from "lucide-react-native";
import "../global.css";

const FAMOUS_CITIES = [
  {
    id: 1,
    name: "Mumbai",
    image:
      "https://s7ap1.scene7.com/is/image/incredibleindia/gateway-of-india-mumbai-maharashtra-2-attr-hero?qlt=82&ts=1727355556744",
    description: "Gateway of India",
  },
  {
    id: 2,
    name: "Delhi",
    image:
      "https://deih43ym53wif.cloudfront.net/large_Rajpath-delhi-shutterstock_1195751923.jpg_7647e1aad2.jpg",
    description: "India Gate",
  },
  {
    id: 3,
    name: "Jaipur",
    image:
      "https://www.jcrcab.com/wp-content/uploads/2020/08/rajasthan-jaipur-148046451622-orijgp.jpg",
    description: "Pink City",
  },
  {
    id: 4,
    name: "Agra",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Taj_Mahal%2C_Agra%2C_India.jpg/1200px-Taj_Mahal%2C_Agra%2C_India.jpg",
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
    <View className="flex-1 bg-neutral-950">
      {/* Header */}
      <View className="flex-row justify-between items-center p-4 bg-neutral-900 shadow">
        <Text className="text-2xl font-bold text-white">EcoTourist</Text>
        <View className="flex-row items-center gap-4">
          <CoinsIcon color="yellow"/>
          <Text className="font-bold">{coins}</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View className="p-4">
        <View className="relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <TextInput
            placeholder="Search cities..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 color-white placeholder:color-white"
          />
        </View>
      </View>

      {!selectedCity ? (
        // Famous Cities Grid
        <FlatList
          data={FAMOUS_CITIES.filter((city) =>
            city.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleCitySelect(item)}
              className="w-1/2 p-2"
            >
              <View className="border border-white rounded-lg shadow overflow-hidden">
                <Image
                  source={{ uri: item.image }}
                  className="h-32 w-full"
                  resizeMode="cover"
                />
                <View className="p-2 bg-black bg-opacity-50">
                  <Text className="text-white font-semibold">{item.name}</Text>
                  <Text className="text-white text-sm">{item.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        // Eco Rules Checklist
        <ScrollView className="p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">
              Eco Rules for {selectedCity.name}
            </Text>
            <TouchableOpacity
              onPress={() => setSelectedCity(null)}
              className="px-4 py-2 bg-blue-500 rounded-lg"
            >
              <Text className="text-white">Back</Text>
            </TouchableOpacity>
          </View>

          {ECO_RULES.map((rule) => (
            <View key={rule.id} className="mb-4 bg-white p-4 rounded-lg shadow">
              <TouchableOpacity
                className="flex-row items-center space-x-3"
                onPress={() => handleRuleComplete(rule.id)}
              >
                <View
                  className={`w-5 h-5 rounded-full ${
                    completedRules.has(rule.id)
                      ? "bg-blue-500"
                      : "border-2 border-gray-300"
                  }`}
                />
                <Text className="flex-1">{rule.rule}</Text>
                <Text className="text-green-500 font-bold">+{rule.points}</Text>
              </TouchableOpacity>
            </View>
          ))}

          {showAnimation && (
            <View className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Text className="text-2xl font-bold text-green-500 animate-bounce">
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
