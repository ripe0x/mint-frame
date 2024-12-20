import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import React from "react";
import { formatUnits } from "viem";
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
  price: string;
  onCollect: () => void;
  onError: (error: string | undefined) => void;
}

export function CollectButton({
  price,
  onCollect,
  onError,
}: CollectButtonProps) {
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const { sendTransactionAsync, isPending: isSending } = useSendTransaction();
  const [hash, setHash] = React.useState<`0x${string}`>();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const isPending = isSending || isConfirming;

  const successHandled = React.useRef(false);

  const { fetchTransaction } = useFeaturedMintTransaction();

  const formattedPrice = formatUnits(BigInt(price), 18);

  React.useEffect(() => {
    if (isSuccess && !successHandled.current) {
      successHandled.current = true;
      onCollect();
    }
  }, [isSuccess, onCollect]);

  const handleClick = async () => {
    try {
      if (!isConnected || !address) {
        connect({ connector: farcasterFrame() });
        return;
      }

      const {
        result: { tx },
      } = await fetchTransaction(address);

      const hash = await sendTransactionAsync({
        to: tx.to,
        value: BigInt(tx.value),
        data: tx.data,
      });

      setHash(hash);
    } catch (error) {
      if (!isUserRejectionError(error)) {
        onError(
          error instanceof Error ? error.message : "Something went wrong."
        );
      }
    }
  };

  return (
    <>
      <div className="sticky bottom-0 left-0 right-0 pb-[env(safe-area-inset-bottom)] bg-card">
        <div className="mb-4">
          {isPending ? (
            <AnimatedBorder>
              <Button className="w-full relative" disabled>
                Collecting...
              </Button>
            </AnimatedBorder>
          ) : (
            <Button className="w-full" onClick={handleClick}>
              {isConnected ? `Collect for ${formattedPrice} ETH` : "Connect"}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
