import React from "react";
import style from "./Header.module.css";

interface Props {
	columns: string[];
}

export default function Header(props: Props) {
	return (
		<thead>
			<tr className={style.row}>
				{props.columns.map((v, i) => (
					<th className="px-0 py-4 bg-fuschia">
						<p className="text-xs font-bold text-white uppercase">{v}</p>
					</th>
				))}
			</tr>
		</thead>
	);
}
