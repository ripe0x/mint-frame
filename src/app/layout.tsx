import "./globals.css";

import type { Metadata } from "next";

import { ROOT_URL } from "@/constants";
import { Providers } from "@/providers/Providers";

const frame = {
  version: "next",
  // imageUrl: `${ROOT_URL}/api/og`,
  imageUrl: `${ROOT_URL}/fc-frame-image-og.png`,
  // imageUrl: `https://87c9-2600-1700-6031-7010-bc06-7ede-80f8-fca8.ngrok-free.app/api/og`,
  button: {
    title: "Mint",
    action: {
      type: "launch_frame",
      name: "Mints",
      // url: "https://mint.warpcast.com/",
      url: ROOT_URL,
      iconImageUrl: "https://mint.warpcast.com/app.png",
      splashImageUrl: "https://mint.warpcast.com/splash.png",
      splashBackgroundColor: "#ffffff",
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL("https://mint.warpcast.com/"),
    title: "Higher Self Mint",
    openGraph: {
      title: "Higher Self",
      description: "Mints",
      // images: `${ROOT_URL}/api/og`,
      images: `${ROOT_URL}/fc-frame-image-og.png`,
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

// eslint-disable-next-line import/no-default-export
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* eslint-disable-next-line @next/next/google-font-display */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=block"
          rel="stylesheet"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </head>
      <body className="antialiased scrollbar-vert Text/Faint">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
