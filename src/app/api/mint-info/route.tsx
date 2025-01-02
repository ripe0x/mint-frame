import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: "Your NFT Name",
    description: "A description of your NFT",
    image:
      "https://res.cloudinary.com/alchemyapi/image/upload/convert-png/base-mainnet/53ded15d1d60df2cc0f3234742ee2538", // Replace with your image URL
    network: "base",
    contractAddress: "0xc49Bae5D82644f607eaC97bE42d5188a51cb0CAF",
    mintPrice: "0.01", // Price in ETH
    maxSupply: 100,
    availableSupply: 42, // Dynamically update if necessary
  });
}
