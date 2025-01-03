import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { ROOT_URL } from "@/constants";

import { api, ApiEthereumAddress } from "./api";

const usePrefetchFeaturedMint = () => {
  const qc = useQueryClient();

  return useCallback(() => {
    return qc.prefetchQuery({
      queryKey: ["featuredMint"],
      queryFn: async () => {
        const response = await api.getFeaturedMint();
        return response.data;
      },
    });
  }, [qc]);
};

const useFeaturedMint = () => {
  const data = `{
  "name": "Higher Self",
  "imageUrl": "${ROOT_URL}/fc-frame-image.png",
  "description": "An optimistic onchain identity system built on base. Each Higher Self image is algorithmically generated from the holder’s address.",
  "creator": {
    "id": "2266",
    "username": "ripe",
    "pfpUrl": "https://f8n-production.imgix.net/rodeo/profiles/c6wfd6x61.png?q=90&cs=srgb&w=116&dpr=1&fm=jpg&fnd_key=v1"
  },
  "chain": {
    "id": "8453",
    "name": "Base"
  },
  "collection": "0xc49Bae5D82644f607eaC97bE42d5188a51cb0CAF",
  "contract": "0xc49Bae5D82644f607eaC97bE42d5188a51cb0CAF",
  "tokenId": "1",
  "isMinting": true,
  "priceEth": "0.0025",
  "priceUsd": 8.50,
  "startsAt": 1700000000000,
  "endsAt": 1735938001000
}
`;
  return { data: JSON.parse(data) };
  // return useSuspenseQuery({
  //   queryKey: ["featuredMint"],
  //   queryFn: async () => {
  //     const response = await api.getFeaturedMint();
  //     return response.data;
  //   },
  // });
};

const useFeaturedMintTransaction = () => {
  const queryClient = useQueryClient();

  return {
    fetchTransaction: async (address: ApiEthereumAddress) => {
      const response = await api.getFeaturedMintTransaction({ address });
      queryClient.setQueryData(["featuredMintTx"], response.data);
      return response.data;
    },
  };
};

export { useFeaturedMint, useFeaturedMintTransaction, usePrefetchFeaturedMint };
