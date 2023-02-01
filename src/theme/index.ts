import { extendTheme } from "native-base";


export const THEME = extendTheme({
  colors: {
    blue: {
      50: "#e5f1fc",
      100: "#c2def7",
      300: "#136C93",
      400: "#116184",
      500: "#004C73",
      700: "#003049",
      800: "#002335",
      900: "#001621",
    },
    gray: {
      100: "#E5E6E6",
      200: "#D4D4D8",
      300: "#A4A4A8",
      400: "#A1A1AA",
      500: "#71717A",
      600: "#656768",
      900: "#121214"
    },
    green: {
      300: "#34D399",
      700: "#075e54"
    },
    red: {
      300: "#F87171",
      400: "#df6565"
    }
  },
  fonts: {
    heading: "Inter_700Bold",
    body: "Inter_400Regular",
  },
  fontsSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
});

    // BACKGROUND: "#004C73", => blue[500]
    // CARD_BACKGROUND: "#E5E6E6", => gray[100]
    // CARD_BORDER: "#656768", => gray[600]
    // CARD_TEXT: "#656768", => gray[600]
    // FIELD_BORDER: "#D4D4D8", => gray[200]
    // FIELD_TEXT: "#121214", => gray[900]
    // HEADER_BORDER: "#A4A4A850", => gray[300]
    // TEXT_PRIMARY: "#E5E6E6", => gray[100]
    // TEXT_SECONDARY: "#A1A1AA", => gray[400]
    // TEXT_PLACEHOLDER: "#A4A4A8", => gray[300]
    // PRIMARY: "#136C93", => blue[300]
    // SECONDARY: "#71717A", => gray[500]
    // SUCCESS: "#34D399", => green[300]
    // ALERT: "#F87171", => red[300]
    // WHATSAPP: "#075e54", => green[700]