import { Box, Button, Text } from "native-base";
import { useCallback, useState } from "react";

interface PromoCardDetailDescriptionProps {
  description: string;
}

const NUM_OF_LINES = 2;

export function PromoCardDetailDescription({
  description,
}: PromoCardDetailDescriptionProps) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [showExpandableButton, setShowExpandableButton] =
    useState<boolean>(false);
  const onTextLayout = useCallback((e: any) => {
    setShowExpandableButton(e.nativeEvent.lines.length > NUM_OF_LINES);
  }, []);

  return (
    <>
      <Text
        numberOfLines={showMore ? undefined : NUM_OF_LINES}
        mt={4}
        onTextLayout={onTextLayout}
      >
        {description}
      </Text>
      {showExpandableButton && (
        <Box w="full" alignItems="flex-end" mt={1}>
          <Button
            variant="ghost"
            bg="gray.200"
            w="90px"
            p={0}
            rounded="3xl"
            onPress={() => setShowMore(!showMore)}
          >
            <Text color="gray.600">
              {showMore ? "reduzir..." : "expandir..."}
            </Text>
          </Button>
        </Box>
      )}
    </>
  );
}
