import {
  Image,
  VStack,
  Text,
  Icon,
  HStack,
  Heading,
  Box,
  AspectRatio,
  ScrollView,
  useTheme,
  useToast,
} from "native-base";
import { Container } from "@components/Container";

import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { PromoCardDetailHeader } from "@components/PromoCardDetailHeader";
import { PromoCardDetailDescription } from "@components/PromoCardDetailDescription";
import { formatPrice } from "@utils/pricesTools";
import { PromoCardDetailTechnicalFeaturesField } from "@components/PromoCardDetailTechnicalFeaturesField";
import { Button } from "@components/Button";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function PromoDetailUnauthenticated() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { colors } = useTheme();
  const toast = useToast();

  const [favorited, setFavorited] = useState<boolean>(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleFavoring = () => {
    toast.show({
      title: "Faça seu login ou crie uma conta para salvar seus favoritos!",
      placement: "top-right",
      bgColor: "green.600",
    });
    navigation.navigate("signIn");
  };
  return (
    <Container>
      <VStack px={8} bg="blue.500" pt={12}>
        <HStack justifyContent="space-between" mb={2}>
          <TouchableOpacity onPress={handleGoBack}>
            <Icon as={Feather} name="arrow-left" color="gray.100" size={6} />
          </TouchableOpacity>

          <Heading color="gray.100" fontSize="md" fontFamily="heading">
            Loja 1
          </Heading>
        </HStack>

        <HStack justifyContent="space-between" alignItems="center" mb={2}>
          <Image
            source={{
              uri: `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVExcUFBQXFxcXFxoYGRcaGhoZGBcYGRgaHBcaFxccISwjGxwoIhkXJjUmKC0vMjIyHCI4PTgwPCwxMi8BCwsLDw4PHBERHTEhIiIvMTEzOzE8MTU3MTwxMTE8OjMxMTE8LzEvMTMxMTE8MTExMTExMTE6MTExMTEyMTEyL//AABEIAKcBLQMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYDBAcCAQj/xABVEAABAwEDBQsFCQ0GBgMAAAABAAIDEQQhMQUSQVFTBgcTIjJCQ1JhgZJxkZPR0xQXIzVicqLS8BUzRFRzdIKhsbPB4vEWNIOjsuEkY2SUwtQIpMP/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/xAAvEQEAAQMCAwcDAwUAAAAAAAAAAQIDERJRFCExBBNBYZGh8BVS4SKBsQUyccHx/9oADAMBAAIRAxEAPwDsiIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiD4SqrlLhM0SNkfmm93GNGE6/kdvN03XttTsCqczKWbxdVR+sqYRLUFtlBoZHgjEZx9a2I7U89I/xO9ar9ttdq4Ythc4sJcGsEmYGtaQ0Bvwb+1ZmPyh1ZB/jD/wBdc1Xa7VMzFU9G0WKpiJjxWRkruu/xu9azh56zvG71qrZ+UdDZPTt/9ZYzNlMc15/xm/8ArqvG2d08PX5LrZr61LvE71rdZCPleJ3rVSyH7sfn8NJJDTNzfhIn59c7O5UApSg86lvck345L44vZKeLtbqTbqicJsWdvyvE71r2LK3t8TvWq+6xz/jcvji9ksUlktOi0yn/ABYx/wDinF29zu6lm9yt+V4netU7dJukbGRHBUmvLznEEA3kX8m4iunRcL43KTrS17GSTSuje9rXDhKteC4AtdmsYaGtCK3ioWrlDJpDpHnQHHzC4DUAABRbW7lNcZpRXTNPV0Dc7bXTWeOR2LhUqUUDuK/uUXzQp5XVEREBERAREQEREBERAREQEREBERBgnebmtpnGtK3gAYkgEVGA8pC0bQ+0NwfH3sNO52f+2i3YLyX9a5vzRge81PkpqWwQgr7rdaWmjswfoH66zMtkx5zPAfrrbtubGxzzc1oJIpUUAJubr7BeSoltplHQxjszpTQ6RVsZF3Yoqrop/unBETPRKMfKee30Z+usobLtG+j/AJ1FNt8w6KPzzeyXoZVm2TPFL7JU7+390LaKtkrmS7Rvg/mXzg5do3wfzKNGVptizxS+yX37ry7Fnjk9mo7+3vCdFWyRMUu0b4P5lzrdDDJZ5HB94NXBwFAQTj5yB2EgaW1uLsrz6IWeOT2ai8tOmtEeY6OMEGrXcd1DShBBFHNIqCDiD5Co4m390GirZF2GPOeTSvFdozq1cebUV8ik32c9TQ7oRswOv3duHavOSsnvaxwe0ch1wzngAvcQ3jULqCmOK23WSvNGB6IaYwOt9sO1eF2iYquVTGZiZ8HZTOKYifCGsbOepod0I2VOv3fR7V8dZvkDA9B/yqdfu+jjetp1kPVGB6H/AJdOt9sMb15dZseLoPQnY06/d9HG9YzE+fU1Ptks/K4ujYgdEBpdfq/V2raNn7NB6IbOmv7YLxZIOVxdGyI6IDrX6v1Y3rbMePF19Gep5ftgrxbzHj1ZzVza7ofk6NmNnTrfbDtQw48XRsxs6dbu/V2rO6LHi6+jOzpr+2COixu19GepTX9sCr6J2nqjUh8tw8WC7potFOnaMNCkbZYWyOdCOU5pzyOjY6ozj2m/NGmh0Ar3b7I98TcwAua9rm1BABbIHXjHRh3V0rXyeLXEzN4OJzic58hc/Oe88p7ruwUGAAAFwC9XssxRRMTOOf8ApjX+qYSmTMmGCNsUclWtFBnNBPfQhbRZJ1x4P5lG+67ZsovE/wBS8Otlt2MXif6l1Rdo3hTEpFxk648H8y8OlkHPb4P5lEutlt2UXnk9SxOntuyh/wA1T3tv7oNM7JV1qk6zfD/MvnuqTrN8P8yh3TW3ZxeGY/sXnhrds4fBOne294NM7Jr3XJ1m+H/dfDbZOs3w/wC6gy+3Hmw+jnSystcjqZ1nADi0ng5iQWgEjNLm68daU3KKpxExJirrhLPynIOc3w/7rE7LEoIBLATgCKOd81lc53cCssOQSb5ZpHfIZ8E3zs+E87yFK2WxRxCjGNZXGgAJOtx0ntK0zCGlDaJiKmgGNSwtFNNxOcO8BY9zmWhamOcLw1xaHAUDgCaECppUdqjd32UnMhbZoz8LaTwYpi2PpHeY5v6Smdz+TW2eBkbRSgFfKoEmiIgIiIC1bZLQBtb33eRvOP8ADykLaVOyplYmYubyWjNbqI0nvP8ABBa2ShZA8KkDL7xzQe8he3bpnAEloaACS4moa1oJcaUFaAE0Uoyn7e7hZmxDkx0kk+dX4JvnBedWYzrLK4kXNBAFRyCcAKaf6qp5D3SOz3xOhe5+aZZJG1eWOcaMY9oFXOowsFDfwY6wUwcrDZSc7onnFoOg36rsTcLwV5V+9RNXOXRTbqjwSee7t08w6rtP9ULn/t5h1Xaf64KMOVxspNPRPPN7DfquxNwvBQ5WbspNPRPPN7DfquxNwvBWHeW9/wCVtFWySL39unozqu0/1wQvf26eYdV2nX6lGnKrdlJp6J55vYb9V2JuF4Q5UbspNPRPPN7DfquxNwvCr3lvf+U6Ktki57+3TzDqu06/Uvhe/t09Gerdp1+pR5yo3Zyaeieeb2G/V2m4Xrycpt2cmnopOr5b9XabheqzXb3NFWyQfnEEG8EEU4M9Xy6/UsLovk6+jPUpr+2GK1TlFuzk09FJ1PL3dp4uK8nKA2b9PRPOLPL3dp4uKrNVG6YpqbLovk6D0Z6lOt9sMVjkhrXia+ids6dbu/VjesLraNnJgeik0s8vd9HFeXWsbN/oZNnTX3fR5SpVNM+K0RUkLHFTO4uro3Do6da/7DG9bWZ2fQPUpr+2GKj8n2gHO4jhhjG8cztN+FP1Yre4duo+jd1fsP1Yre3NGnnPuzqicvRi7PoO6lNf2wQxdn0HdSmv7YL5w7dR9G/qfYfqxThm6j4H9T7D9WK0zb3j1V/UyNzgKCoHzXaq69fqQvdrPgd1fLr9SxGZuo+B/U8vd+rFeTKNR9G/qeXu/Ub1PeUx4+5pZc9+s6Ojd1b+dr9S88K/WdHRu1X87X5sMVhMg1HR0b+p5f6YG9fA8atXRP6nl/pgb1Wa6d/dMUs3CP1nR0buqa87X5sMV44V+s6Ojd1b+ddf5sCsWeNXV6J/UOt37cMDevOcNXV6N/UOt13fhgb6FUmunf3TEMwmfrOjo3DQa866/wA2BvKCaTWdHRPGINcXXX68MDitcU1Dm9E8cw63Xd+GBvIK8il1w5vRPHMOt13fhgcQmuN/dOn5htMmea1NaAUBY5lXOFGi8m6t51UvW3YIQwUBrm3V0uJvc49pJr3qGiymwZzW3mKjSQC1plcGigJNaAODQb+dU8UrX/tRC0Zoe400hpoTpPeV6XZrcY1dc9GFyrHJbC9YbRagxucfIBrJwCq53VRaA89w/iVB7o8rySxtYy58xMUbRi1pHwsh7c0ho+f2Lswyy3tz4Nut0ltdfEz4OHVmN5w+canvCv6jNz+TW2eBkbRSgFfKpNQsIiICIiCLy9beDiN9HO4o8nOPm/aFz+12oVXvdbuia+Zwa6rWcRvbTlHvP8FTn5RfI/Nja57uq0FzvCL1aFZWP3V2rxbLW1rKvdRo+EcfksJLB5S5hd/gkc4LBk7cpb5rywRN1vN9Oxra39horCdxUlAC6J1NLi8aGjktHyRiSsb0VVUzFPivb0xVE1eCCyTaoGsLnyR8I9z3vBje/MJjAawOa8VaxtG3cqhpQ1KkTlCC+j4+f0Mh6MDRJf3Y4ChBK3xuXkGizf5vqXw7m39Wzf5v8F5dXYLtU5+fw7OIojx9mp7qiNaFnO6GQ9GNUl/djgKEErIZY/kc7oZDzAL6SX92PJFCCV7OQHdWzf56fcM9Szee0Kn027v89DiaPN4M0etnO6GQ8wDRJf3Y8kUIJXozR62c7oZD0Y1SX92PJFCCUORzs7P/APYXj7l05kHnm9SfTbu8fP2OJo83t08etnO6KQ9GNT7+7EcUUcCUMsfyed0MmzGqT9mI4o4168mwNGLIvFL9VfG2VpIaI4ySaCjn/wAWqPpt7y+fscTR5s4cw3DNJvFOBkJ5AGiS/ux5I416yGP5GvoJtnTr930eVeoC0j4eEZrQQ+Vpa2sjSWttDatzQ1zg4NYaXHVepl0fyDg7oJj0YGh/d28nlXrivW5tTpmefk1pq1RlnMfyNB6CbZ06/d9HlXr4Y/kaD0Euzp1+76PKvWIx/IODugm2YHXv1dvJ5V6+Oix4hwPQTHowOvfq+jyr1j6rtuGPHiaD0Euyp1+76PKvWZ0ePE19BLsQOv3fRPGvWrFFceIcHdBMeippf3fR5V6yujx4hwPQS7EDr930eVepjopPXqzFhv4p09BLsadfu+ieNevpbjxTp6CbY00v7r/mnjUKwGPHiHA9BNsadfu+ieNevpZjxDhsJtjTS/uv+aeNerIfXSNFQaV/Iy7Gml/df808ahXzhY9bfRSbCml/df8ANN9Cta22iTPhije5pe0gC+O/OZSodVzRQuuN401otaWSZsj43SOzmEZw4+kVaWnMo5pGkXY6l12+yXLtOaeilVdNE4qlIGWPW3R0Mmwppf3X/NN9CvIlZ2Hk9BJsSNL7tV+HJN9CtIOn0Ocf0yP4L2xlpOGd6RafTr/z/ivf29/ZstkZq6nQSDoSNL7tV+HJN5BXls7OqeZ+DyjoSNL7tV+HJN5BX1lntR0H0p9aztsVqOgd8r/4FT9NvfJ/BxFDWZaGXcU9H+DSjoiNL7tV+HJNSQVjltjWsL2gFw4PMBjkj+EMea3luJpxr7qtFa1opBuS7SdLPSS/WXtuQJC5rncHVpq0l0jw11CAc0mhxN2kVGlTH9MuTP6p5ePP8HE0R0yiXx5rBE0khlc9xxfK8EyOPaA41pdnSSjQo99lvwVm+5ZiaGuBIHSYhxJq5zjoc4kk1AvJWN1jC9ymIiMQ4ZzM5lAWeykuAAxKkdx9kFptTrTjFEODh7WtN7v0iXO7wsG6EmONsUf320Extpi1nSu8xzf0uxXrc9k1tngZGBSgFfKkpiEoiIoSIiICjN0DpRZpeCNHlhANK5tbi4CoqQKkCov0qTXwitxQcQsPuCN3w1nt87gdLYmsr2NbKKjsdVWmxbuLHE3MisFojaNDYoWjzCRX42CPZt8wT3BFs2+YJkxCku3xYT+C2vwR+0Xj3wIT+DWv0cftFefcEWzb5gnuCLZt8wU5kxCiHd5B+L2rwM+uvJ3dQfi9p9Gz66vvuCLZt8wT3BFs2+YJmTEOfO3bxaILT6Nv11iduzjPQ2j0bfrro3uCLZt8wT3BFs2+YJmTEOZP3WxnobR4G/WWu/dMw9FP4B9ZdV9wRbNvmCe4Itm3zBMyYhyN+X2no5vAPrLStuUnzjgYA5rXCkriKOdXGMDQwYOPOw5PK7Q6wRU+9t8wVN3N5AaXukIFC97u7PKZVlWbcylqApWk0wpml1aNm5rSC7HAGqlHsx4hwf0Ex5g1Pv8A48nlXqJ3RWKd9pkfHmtAllc0vpRzX57a5tQaEPNCtI2S2nGSHTzTpbmnn6gvE7R2Wu5Xqjl18PP/ABL0qLlMUxHlGyxmPHiHB3QTHox8u/V28nlXo6PHiHB3QT7MfLv1dvJ5V6rbrNbdtBp0O0tzTp1BeHWe3bWz6etpbmn9Sx4C5v7fhbvaVuii5XEODugmPRfP7u3k8q9ZXx48Q4H8Hm2IHX7vo8q9VnJ1ltZzs+WHsoHOxaWurfqots2C1aZYyPybtLc087q3Kk9juRy5+n4TFVM88x6pox48Q4H8Hm2NOv3fRPGvX10ePEOB/B5tjTS/uv8AmnjXqLFinpy2eXMdfxcw6ercvD8nWk4SsH+G48zM19W5RwtzafT8Gqn7o9W5HIDbrM0YtuIoW0qGU4ruM3HA3rSitpgqycOcxgdwbwKvjGPBnrRnQOacLqhfdz+R52Wxksha8FzKloIoG5gqQRQANZjVT+63JYEMrwMI3ur+iSvb7Hbm3b0zu4e0zE18ufKFeh3WwEVEc5HZGPrLZZuvgHRWj0Y+srRuKsEbrHEXRtJpjQKf+5sWzb5gurVLHEKAzdxZx0Np9G366yDd7BsLT6Nn11e/ubFs2+YJ9zYtm3zBNUmIUYb4EGwtXo2fXQb4cH4vavRs9orz9zYtm3zBPubFs2+YJmTEKR740H4ta/BH7Rak27izHk2W1tPYyLN83CXdy6F9zYtm3zBPubFs2+YJlOIUjcrZn2u1OtkrHNY0BkTHYtaNeipJJ710JeI42tFGgAdi9qAREQEREBERAREQEREBERAREQEREHx2BVCyhuijjibCx7Q4VD7wCDnGo7Pt335VvKe4yyzvMj2cY4oKGLZGcZGeJvrWZlqi2kfib61ave8sXUT3vLF1FbUjCustUO0i8TPWsrbbDtIvEz1qd97yxdRPe8sXUTUYaeTcoWfjVliGGL2DX2qTZlKzbaD0kfrWD3vLF1E97yxdRRqMN9uVLKOng9JH614flmz6J4fSR+tafveWLqJ73li6iZMPloyvAQRw0RH5RnrUdlLL0Rss8TpY3Z0UgjIe08bMNG3HE/tUl73li6i+t3vbEDXMTKcN7cOP+Ci+arCsFjszYmBjBRouCzqAREQEREBERAREQEREBERAREQERY5ZGtaXOIDWgucSaAACpJOgAIMiLnVo34smtcWtFokAwe2NoafIHva7zgLH78+T9navRx+0QdJRRW53LcdtszLTEHtY8uADwA7iOLTUAkYg6VWMtb6Vistoks8kdoL4nZri1jC0mgPFJkBpfqCC+ItawWtssMczAQ2RjXtBuIa9ocKgVvoVRLZvu2CJ743RWnOje5hoyOhLXFpoeEwuQdERFz63b7eTonlgM0uaaZ8bGlhIxoXPbUdoFDoQdBRc29+fJ+ztXo4/aKzbkd18GUWyOs7ZGiIta7hGtbUuBIpmudqKCxoqFlffSsdlnks80VpEkbi11GMIOkFp4TAggjsKuGScoMtEEc8dcyVge2tA4BwrRwBIBGBvxCDdRU3dPvi2Swz+55mzOeGtcTG1jmjOrQEl4NaCuGkKwTZWYyyutb2PDGwmdzCG8IGiPPLSM7Nz6XUrSulBJIube/Pk/Z2r0cftE9+fJ+ztXo4/aIOkooPcxuos1vjMlmeTmEB7HDNewkVGc3Ub6EVFxvuK87qN1Vmyexr7S4gvJDGNGc9+bTOzRcKCovJAvCCeRc29+fJ+ztXo4/aL1Hvx5OJALLS0HnGNlB5aSE+YIOjotbJ9sjmiZLE8PY9oc1wwIOGN48hvCpmWd9KxWWeSzyR2gvidmuLWMLSaA8UmQGl+oIL4i1rDamyxRytrmyMa9oNxzXtDhUDTQrZQEVIy/vnWCyzOgeZJHsJa/gmhzWuGLS5zmgkaaVoajEKN9+fJ+ztXo4/aIOkoqluU3fWXKEroYGTNc1heTI1jRmhzW3FrzfVwXndVvgWXJ8zYJ2TOe6MSAxtY5ua5zmi9zwa1YdGpBb0XNvfnyfs7V6OP2i9M35MnkgCO1VJA+9x6f8RB0dERAREQEREBQe7j4ttv5rN+7cpxQe7j4ttv5rN+7cg/Pm9lZWS5Vs0cjGyMLpKteA5pzYpHCoNxoQD3L9F/2dsf4pZ/Qx/VX523r52sytZXyPaxoMgLnENAJieBUnWSB3r9I/dSDbxekZ60GWy2VkbQyNjWMFaNY0NaKmpo0Cl5JK/Mm+X8a2v8r/4tX6ehla9ucxzXNOlpBHbeF+Yd8v41tf5X/wAWoOwZA3x8mRWSzxyWrNfHBGx44KY0c1jQ4VEdDeDguDZanbJaZnsNWPlke00Iq1zyWmhvFxGK/Qe53cPk59jsz32SJznwROc4g1c50bS4m/SSV+fMuRNZap2MADWzSNaBgGh7gAO5B+scqH4GX8m//SV+Utz8sbLXZ3zU4Jk8TpKtzm8G14L6tAOcKA3UNV+rcqfeJfyb/wDQV+U9zUTHW2yslAMbrRE14dc0sMjQ4OOqlUHcf7X7nf8Ap/8As5PZK2bmp7HJDw1ibGI3kjOZHwWcWkg1aWtNxriFDf2UyLsbL4x9ZWDItms0UfBWTgwxpJzY3BwaXEk6TSpqg41v6ZH4O1xWpo4s7M19B0kVBUntYWAfMKuO8llThcnGEnjWeVzQNOY/jtJ7y8foqR32cke6MmSkCr4KTt8jK5/0C/vAXHN7/dP7iFsq7N4WyvEeP39v3rD570HuUfdPLxFzmS2qnYYIsT6ONd73Z/Ftt/NJ/wB05cn3h8k51ontRF0TBE3VnSGriDrDWU/TXV92nxbbfzSf905B+eN7eFr8qWVj2te1z3Va4BzT8G/FpuKvm/I2wCyRizCyiYWijhFwYkDAyTPDgy+mdmVrpoqNvX/G1k+e7929Z983c06xW55vMU7nSxuOmpq9h7WuNPIWnSgt3/x/++WzVmRftkp/Fa+/6f8AibN+Rd/rV+3r5rE+wh9iibCSaTMBc5zZQL6ucS5zdLanA6DUKg7/AKP+Js35F3+tBP7zWR7NLk50ktnhkeZ3jOfGx7qBrKCrgTS83dpVH35bDHFlENijZG0wRuLWNDGl2c8E0F1aAeZX3eVyhEzJzmOlja4TvJa57WkAtZQ0JwVE36LSyTKQMb2vDYI2ktcHAOznmhI00IPeEHVt6H4ns3lm/fyLh2+P8a2z8qf2Bdx3ofiezeWb9/IuHb4/xrbPyp/YEH6R3M/3Ky/m8P7tqk1Abm8pQix2YGaIEWeEEF7QQRG2oIqpmC0sfex7XgGhLXB1D20Qfk3dJ/fLT+cS/vHLuX9rtzv/AE3/AGcnslw3dH/fLT+Xl/eOX6G/spkXY2Txj6yCQ3K2zJ1oD5bAyKjTwb3shMRvo7NNWNJGB1KTteSbPK7PlgikcBm5z42PdQEkCrgTS83dq1sg2CxwB0djETA457mxuDqkUGcRU9gUwg/L++VA1mVLSxjWsa1zKNaA1o+DYbmi4Lum5DIVldYLI91lgc51mhcXGJhcXGJpJJLak10rh2+n8b2v5zP3Ua/QW4r4tsX5rD+6agm0REBERAREQFjmia9rmPAc1wLXNIqHNIoQRpBBWREHN595rJ7nFzX2lgJqGtfGWt7AXRl1PKSsXvK2DbWvxxeyXTUQRO5vIcdiszLNE57mMLiC8gu47i41LQBiToVXy5vV2O1WiS0yS2gPkdnODHRhoNALgYyaXa1fkQauTrG2GKOFpJbGxkbS6mcQxoaCaACtBoAVCtm8/YpZHyOmtWc97nkB8VAXOLjSseF66OiAVzq37z+T5Hue108Qca5kb2Zja9UOjcQOyq6KiDmXvK2DbWvxxeyVp3Ibj4MmtkbA+VwkLXHhCwkFoIFM1rdasiIPEjA4FrgCCCCDeCDiCNS5zPvNZPc4ua+0sBNQxsjC1vYC5hdTykldJRBD7mtz0FhgEFnaQ2pc5zjVz3EAFzjdfQAXAC5bmVLCJ4ZYHkhssbo3FtA4Ne0tJaSCK0OpbiIKHkHetslktMdpjltDnxkloe6MtNWkXgRg6TpVg3U7moMoQcDPnABwc1zCA5jh1SQReCQajT5FOIgp+5TcFBk6V0lnntBz25r2PdGWOHNJAYDUHA10nWVv7rNyVmyixrbQHAsJLJGENe2tM4AkEEGguIOCsKIOZe8rYNta/HF7Jem7zFgBBMtqNDgXxUPYaR1XS0QaeTbDHBEyGJgZGxoa1orcB2m8nWTeSqZlrersdqtEtokltIfK7OcGujDQewGMml2tX9EHMveVsG2tfji9krZuQ3KQ5OjfHA+R7ZH55MhaSDmgXZrW3XKwogomXt62w2qZ87jNG95JcI3NDS44uLXMdQnE0oo33lbBtrX44vZLpqIKfuS3v7Nk6Z00EkznPjMZEjmFtC5rqjNY01q0adJVwREFDy/vXWS2WmS0yS2hr5CCQx0YaKNDRQGMnBo0q4ZLsIggigYSWxRtjaXULi1jQ0FxAArQaluIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIg//9k=`,
            }}
            alt="Logo da concessionária"
            w="96px"
            h="64px"
            rounded="md"
            borderColor="gray.100"
            borderWidth={2}
            resizeMode="contain"
            mr={4}
            mb={2}
          />
          <VStack flex={1} mb={2}>
            <Text color="gray.100" fontSize="2xs">
              Rua Coronel Madeira, 12, próximo Mercado - Bairro Centro. CEP:
              12245-760. São José dos Campos/SP
            </Text>
          </VStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Box rounded="md" overflow="hidden" shadow={2}>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: `data:image/jpeg;base64,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`,
                }}
                alt="Logo da concessionária"
                rounded="lg"
                resizeMode="cover"
              />
            </AspectRatio>
          </Box>
          <Box bg="gray.100" mt={6} rounded="md" p={4}>
            <PromoCardDetailHeader
              brand="Chevrolet"
              model="Onix"
              favorited={favorited}
              setFavorited={handleFavoring}
            />
            <PromoCardDetailDescription
              description="Chevrolet Onix 1.8 - Flex - 4 Portas - Ar Condicionado - Direção
              Elétrica - Controle de Tração"
            />

            <Box mt={4}>
              <Heading color="blue.400" fontWeight="black" fontFamily="heading">
                {formatPrice("54900")}
              </Heading>
            </Box>

            <Box>
              <Heading size="sm" color="blue.400" mt={4} fontFamily="heading">
                Características principais
              </Heading>
              <VStack mt={2}>
                <PromoCardDetailTechnicalFeaturesField
                  label="Modelo:"
                  value="Onix"
                />
                <PromoCardDetailTechnicalFeaturesField
                  label="Marca:"
                  value="Chevrolet"
                />
                <PromoCardDetailTechnicalFeaturesField
                  label="Ano:"
                  value="2014"
                />
                <PromoCardDetailTechnicalFeaturesField
                  label="Motorização:"
                  value="1.8"
                />
                <PromoCardDetailTechnicalFeaturesField
                  label="Tipo de combústivel:"
                  value="Flex"
                />
                <PromoCardDetailTechnicalFeaturesField
                  label="Quilômetros:"
                  value="34588Km"
                />
              </VStack>
            </Box>
          </Box>
          <Button
            title="CHAMAR NO WHATSAPP"
            bg="green.700"
            endIcon={<Icon as={FontAwesome} name="whatsapp" size={6} />}
            _icon={{
              marginLeft: 8,
            }}
            _pressed={{
              backgroundColor: colors.green[600],
            }}
            mt={4}
          />
        </VStack>
      </ScrollView>
    </Container>
  );
}
