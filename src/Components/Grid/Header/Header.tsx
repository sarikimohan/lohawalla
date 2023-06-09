import React from "react";
import style from "./Header.module.css";

export interface HeaderConfig {
	name: string;
	width?: number;
	align?: "center" | "left" | "right" | "justify" | "char" | undefined;
}

interface Props {
	columns: (string | HeaderConfig)[];
}

export default function Header(props: Props) {
	return (
		<thead>
			<tr className={style.row}>
				{props.columns.map((v, i) => (
					<th
						className="px-0 py-4 bg-fuschia"
						key={i}
						style={{ width: typeof v === "string" ? undefined : v.width }}
						align={typeof v === "string" ? undefined : v.align}
					>
						<p className="text-xs font-bold text-white uppercase">
							{typeof v === "string" ? v : v.name}
						</p>
					</th>
				))}
			</tr>
		</thead>
	);
}
