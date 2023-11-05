import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<a href="" target={"_blank"}>
				<div
					className={styles.logo}
					style={{
						fontWeight: "bold",
						fontSize: "24px"
				}}
				>
					Nft Collections
				</div>
			</a>
			<ConnectButton></ConnectButton>
		</nav>
	);
}
