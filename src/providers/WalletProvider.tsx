import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(
      `https://base-mainnet.g.alchemy.com/v2/vCDlbqYLHrl_dZJkGmX2FgpAUpRs-iTI`
    ),
  },
  connectors: [farcasterFrame()],
});

const queryClient = new QueryClient();

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
