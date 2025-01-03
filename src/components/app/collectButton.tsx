import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import React from "react";
import {
  useAccount,
  useConnect,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";

import { AnimatedBorder } from "@/components/ui/animatedBorder";
import { Button } from "@/components/ui/button";
import { isUserRejectionError } from "@/lib/errors";
import { useFeaturedMintTransaction } from "@/lib/queries";

interface CollectButtonProps {
  timestamp?: number;
  // price: number;
  onCollect: () => void;
  onError: (error: string | undefined) => void;
}

// const formatUsdPrice = (priceInCents: number) => {
//   const dollars = (priceInCents / 100).toFixed(2);
//   return `$${dollars}`;
// };

export function CollectButton({ onCollect, onError }: CollectButtonProps) {
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const { sendTransactionAsync, isPending: isSending } = useSendTransaction();
  const [hash, setHash] = React.useState<`0x${string}`>();
  const [isLoadingTxData, setIsLoadingTxData] = React.useState(false);

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const isPending = isLoadingTxData || isSending || isConfirming;

  const successHandled = React.useRef(false);

  const { fetchTransaction } = useFeaturedMintTransaction();

  React.useEffect(() => {
    if (isSuccess && !successHandled.current) {
      successHandled.current = true;
      onCollect();
      setHash(undefined);
      successHandled.current = false;
    }
  }, [isSuccess, onCollect]);

  const handleClick = async () => {
    try {
      setHash(undefined);
      successHandled.current = false;

      if (!isConnected || !address) {
        connect({ connector: farcasterFrame() });
        return;
      }

      setIsLoadingTxData(true);
      const {
        result: { tx },
      } = await fetchTransaction(address);

      const hash = await sendTransactionAsync({
        to: tx.to,
        value: BigInt(tx.value),
        data: tx.data,
        chainId: 8453,
      });

      setHash(hash);
    } catch (error) {
      if (!isUserRejectionError(error)) {
        onError(
          error instanceof Error ? error.message : "Something went wrong."
        );
      }
      setHash(undefined);
      successHandled.current = false;
    } finally {
      setIsLoadingTxData(false);
    }
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 pb-[env(safe-area-inset-bottom)] bg-card border-t border-border">
      <div className="pb-4 px-4 pt-2">
        <div className="flex justify-between items-center mb-1 text-sm">
          <span className="text-muted text-sm">Price</span>
          <span className="text-foreground font-medium">
            {/* {formatUsdPrice(price)} */}
            0.0025 ETH
          </span>
        </div>
        {isPending ? (
          <AnimatedBorder>
            <Button
              className="w-full relative bg-active text-active-foreground"
              disabled
            >
              Minting...
            </Button>
          </AnimatedBorder>
        ) : (
          <Button className="w-full" onClick={handleClick}>
            {isConnected ? "Mint" : "Connect"}
          </Button>
        )}
      </div>
    </div>
  );
}
