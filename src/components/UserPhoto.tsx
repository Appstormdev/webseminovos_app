import { Image, IImageProps, Skeleton } from "native-base";

type UserPhotoProps = IImageProps & {
  size: number;
  isLoading?: boolean;
};

export function UserPhoto({
  size,
  isLoading = false,
  ...props
}: UserPhotoProps) {
  return (
    <>
      {isLoading ? (
        <Skeleton
          w={size}
          h={size}
          rounded="full"
          startColor="blue.800"
          endColor="blue.700"
        />
      ) : (
        <Image
          w={size}
          h={size}
          rounded="full"
          borderColor="gray.100"
          {...props}
        />
      )}
    </>
  );
}
