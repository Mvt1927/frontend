import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, WagmiConfig, createConfig } from "wagmi";
import {
	mainnet,
	polygon,
	goerli,
	sepolia
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import MainLayout from "../layout/mainLayout";

const { chains, publicClient } = configureChains(
	[mainnet, polygon,goerli,sepolia],
	[
		alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }), 
		publicProvider()
	]
);
const { connectors } = getDefaultWallets({
	appName: "test",
	projectId: process.env.NEXT_PUBLIC_CLOUD_WALLETCONNECT_PROJECT_ID,
	chains,
});

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
})

export { WagmiConfig, RainbowKitProvider };
function MyApp({ Component, pageProps }) {
	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider

				modalSize="compact"
				initialChain={process.env.NEXT_PUBLIC_ALCHEMY_NETWORK}
				chains={chains}
			>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default MyApp;
