import { Linking } from "react-native";

type CallChatWhatsappProps = {
  carTitle: string;
  carId: string;
  businessWhatsappNumber: string;
};

export function callChatWhatsapp({
  carTitle,
  carId,
  businessWhatsappNumber,
}: CallChatWhatsappProps) {
  let msg = "";
  if (carTitle !== "" && carId !== "")
    msg = `Olá, fiquei interessado no anúncio do veículo ${carTitle} - (cód.: ${carId})`;

  if (carTitle === "")
    msg = `Olá, estou interessado em um anúncio que ví em seu aplicativo.`;

  if (businessWhatsappNumber) {
    if (msg) {
      const url =
        "whatsapp://send?text=" + msg + "&phone=55" + businessWhatsappNumber;
      Linking.openURL(url)
        .then((data) => {
          console.info("WhatsApp Opened successfully " + data);
        })
        .catch(() => {
          alert("Make sure WhatsApp installed on your device");
        });
    } else {
      alert("Please enter message to send");
    }
  } else {
    alert("Please enter mobile no");
  }
}
