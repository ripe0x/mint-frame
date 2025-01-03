import { ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";

import {
  ApiGetFeaturedMintTransaction200Response,
  ApiHexString,
} from "@/lib/api";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json(
      { error: "Invalid or missing 'address' parameter" },
      { status: 400 }
    );
  }

  const contractAddress = "0xc49Bae5D82644f607eaC97bE42d5188a51cb0CAF";
  const abi = ["function mint(uint256 quantity) public payable"];
  const mintPrice = ethers.parseEther("0.0025"); // 0.01 ETH

  try {
    const contractInterface = new ethers.Interface(abi);
    const data = contractInterface.encodeFunctionData("mint", [1]);

    // Convert mintPrice (BigInt) to a hexadecimal string
    // return NextResponse.json({
    //   chain: "base",
    //   to: contractAddress,
    //   data,
    //   value: mintPrice.toString(16), // Corrected here
    // });
    // const txData: ApiGetFeaturedMintTransaction200Response = {
    //   result: {
    //     tx: {
    //       chain: "base",
    //       to: contractAddress,
    //       data: data as ApiHexString,
    //       value: BigInt(mintPrice), // Corrected here
    //     },
    //   },
    // };

    const txData: ApiGetFeaturedMintTransaction200Response = {
      result: {
        tx: {
          chain: "base",
          to: contractAddress,
          data: data as ApiHexString,
          value: BigInt(mintPrice).toString() as `0x${string}`, // Corrected
        },
      },
    };

    return NextResponse.json(txData);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to generate calldata",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
