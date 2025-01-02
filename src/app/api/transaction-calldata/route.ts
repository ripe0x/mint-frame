import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";

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
  const abi = ["function mintTo(address to) public payable"];
  const mintPrice = ethers.parseEther("0.01"); // 0.01 ETH

  try {
    const contractInterface = new ethers.Interface(abi);
    const data = contractInterface.encodeFunctionData("mintTo", [address]);

    // Convert mintPrice (BigInt) to a hexadecimal string
    return NextResponse.json({
      to: contractAddress,
      data,
      value: mintPrice.toString(16), // Corrected here
    });
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
