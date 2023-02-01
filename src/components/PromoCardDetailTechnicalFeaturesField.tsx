import { HStack, Text } from "native-base";

interface PromoCardDetailTechnicalFeaturesFieldProps {
  label: string;
  value: string;
}
export function PromoCardDetailTechnicalFeaturesField({
  label,
  value,
}: PromoCardDetailTechnicalFeaturesFieldProps) {
  return (
    <HStack borderWidth={1} borderColor="gray.200" p={1} rounded="sm" mb={1}>
      <Text color="gray.300" mr={2}>
        {label}
      </Text>
      <Text color="blue.400">{value}</Text>
    </HStack>
  );
}
