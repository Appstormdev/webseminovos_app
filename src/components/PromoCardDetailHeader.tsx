import { Heading, HStack, Icon } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface PromoCardDetailHeaderProps {
  brand: string;
  model: string;
  favorited: boolean;
  setFavorited: () => void;
}

export function PromoCardDetailHeader({
  brand,
  model,
  favorited,
  setFavorited,
}: PromoCardDetailHeaderProps) {
  return (
    <HStack justifyContent="space-between">
      <HStack>
        <Heading color="blue.400" size="md" mr={2} fontFamily="heading">
          {brand}
        </Heading>
        <Heading color="red.300" size="md" fontFamily="heading">
          {model}
        </Heading>
      </HStack>
      <TouchableOpacity onPress={setFavorited}>
        {favorited ? (
          <Icon as={MaterialIcons} name="favorite" size={6} color="blue.400" />
        ) : (
          <Icon
            as={MaterialIcons}
            name="favorite-outline"
            size={6}
            color="blue.400"
          />
        )}
      </TouchableOpacity>
    </HStack>
  );
}
