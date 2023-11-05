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
		alchemyProvider({ apiKey: "4XsHh1worB0pSSkkl5u5QpUctsmaZIqS" }), 
		publicProvider()
	]
);
console.log(process.env.ALCHEMY_NETWORK)
const { connectors } = getDefaultWallets({
	appName: "test",
	projectId: "ebbc17e8c0cd1819b8b5b90fd6a97938",
	chains,
});

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
})

// const wagmiClient = createClient({
// 	autoConnect: true,
// 	connectors,
// 	provider,
// });

export { WagmiConfig, RainbowKitProvider };
function MyApp({ Component, pageProps }) {
	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider

				modalSize="compact"
				initialChain={"ETH_GOERLI"}
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
