import AssetIndex from "@src/assets/AssetIndex";
import { motion } from "framer-motion";
import React from "react";
import style from "./SearchBar.module.css";
import { Card } from "@mui/material";

interface SearchBarInterface {
	onChange?: (e: string) => void;
	value?: string;
}

function SearchBar(props: SearchBarInterface) {
	return (
		<Card className={style.container + " vc sb"} variant="outlined">
			<input
				value={props.value}
				type="text"
				placeholder="search"
				style={{ height: "100%", fontFamily: "var(--font-inter)" }}
				className={"searchBar"}
				onChange={(e) => {
					props.onChange && props.onChange(e.target.value);
				}}
			/>
			<motion.div whileHover={{ rotate: 360 }}>
				<AssetIndex.SearchIcon />
			</motion.div>
		</Card>
	);
}

export default SearchBar;
