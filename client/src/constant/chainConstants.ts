import { http } from "viem";
import { mantleSepoliaTestnet } from "wagmi/chains";

const bleTestnetNetwork = {
  id: 52085143,
  name: "BLE Testnet",
  iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/4584.png", // Placeholder icon URL for ETH
  nativeCurrency: { name: "BLE", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet.rpc.ethena.fi/"] },
  },
  blockExplorers: {
    default: {
      name: "BLE Testnet",
      url: "https://testnet.explorer.ethena.fi/",
    },
  },
};

export const chainArray = [bleTestnetNetwork, mantleSepoliaTestnet];
export const transportsObject = {
  [bleTestnetNetwork.id]: http(),
  [mantleSepoliaTestnet.id]: http(),
};
