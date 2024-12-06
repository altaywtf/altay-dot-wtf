import localFont from "next/font/local";

export const gtAmerica = localFont({
  src: [
    {
      path: "./GT-America-Standard-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "./GT-America-Standard-Regular-Italic.woff2",
      style: "Italic",
      weight: "400",
    },
    {
      path: "./GT-America-Standard-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "./GT-America-Standard-Medium-Italic.woff2",
      style: "Italic",
      weight: "500",
    },
    {
      path: "./GT-America-Standard-Bold.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "./GT-America-Standard-Bold-Italic.woff2",
      style: "Italic",
      weight: "600",
    },
  ],
  variable: "--font-gt-america",
});

export const berkeleyMono = localFont({
  src: [
    {
      path: "./berkeley-mono-variable-regular.woff2",
      style: "normal",
    },
    {
      path: "./berkeley-mono-variable-italic.woff2",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-berkeley-mono",
});
