import { Center, Image, VStack, Text, FlatList, Box } from "native-base";
import Container from "../components/Container";

import Logo from "../assets/wsn_logo.png";
import { HomeHeader } from "@components/HomeHeader";
import { PromoCard } from "@components/PromoCard";
import { useState } from "react";

type IPromoProps = {
  promoId: string;
  title: string;
  description: string;
  imageUrl: string;
};

export function Home() {
  const [promos, setPromos] = useState<IPromoProps[]>([
    {
      promoId: "0",
      title: "Chevrolet Onix 2017",
      description: "Chevrolet Onyx 2017 1.0 Joy SPE/4",
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      promoId: "1",
      title: "Chevrolet Onix 2017",
      description: "Chevrolet Onyx 2017 1.0 Joy SPE/4",
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      promoId: "2",
      title: "Chevrolet Onix 2017",
      description: "Chevrolet Onyx 2017 1.0 Joy SPE/4",
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      promoId: "3",
      title: "Chevrolet Onix 2017",
      description: "Chevrolet Onyx 2017 1.0 Joy SPE/4",
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      promoId: "4",
      title: "Chevrolet Onix 2017",
      description: "Chevrolet Onyx 2017 1.0 Joy SPE/4",
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      promoId: "5",
      title: "Chevrolet Onix 2017",
      description: "Chevrolet Onyx 2017 1.0 Joy SPE/4",
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      promoId: "6",
      title: "Chevrolet Onix 2017",
      description: "Chevrolet Onyx 2017 1.0 Joy SPE/4",
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      promoId: "7",
      title: "Chevrolet Onix 2017",
      description: "Chevrolet Onyx 2017 1.0 Joy SPE/4",
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      promoId: "8",
      title: "Chevrolet Onix 2017",
      description: "Chevrolet Onyx 2017 1.0 Joy SPE/4",
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
  ]);
  return (
    <Container hasHeader>
      <VStack flex={1}>
        <HomeHeader />

        <Box marginX={4} marginBottom={8}>
          {promos.map((item) => (
            <PromoCard
              imageUrl={item.imageUrl}
              title={item.title}
              description={item.description}
              key={item.promoId}
            />
          ))}
        </Box>
      </VStack>
    </Container>
  );
}
