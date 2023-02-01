import { Box, Button, Text } from "native-base";
import { useState } from "react";

interface PromoCardDetailDescriptionProps {
  description: string;
}

export function PromoCardDetailDescription({
  description,
}: PromoCardDetailDescriptionProps) {
  const [showAllDescription, setShowAllDescription] = useState<boolean>(false);

  return (
    <>
      <Text numberOfLines={showAllDescription ? undefined : 2} mt={4}>
        {description}
      </Text>
      <Box w="full" alignItems="flex-end" mt={1}>
        <Button
          variant="ghost"
          bg="gray.200"
          w="90px"
          p={0}
          rounded="3xl"
          onPress={() => setShowAllDescription(!showAllDescription)}
        >
          <Text color="gray.600">
            {showAllDescription ? "reduzir..." : "expandir..."}
          </Text>
        </Button>
      </Box>
    </>
  );
}
