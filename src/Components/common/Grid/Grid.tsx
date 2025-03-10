import React, { useEffect, useMemo, useState } from "react";
import style from "./Grid.module.css";
import getWidths from "./LayoutService";
import { Small } from "../Typography/TypeStyles";

function Grid<T>(p: GridProps<T>) {
	const _config = p.config.sort((a, b) => a.index - b.index);
	const [widths, setWidths] = useState<number[]>(
		getWidths(p.width - p.paddingLeft - p.paddingRight - 20, _config)
	);

	useEffect(() => {
		setWidths(
			getWidths(p.width - p.paddingLeft - p.paddingRight - 20, _config)
		);
	}, [p.width]);

	const { RowContainer } = p;
	return (
		<div
			className={style.container}
			style={{ width: p.width, maxHeight: p.maxHeight }}
		>
			<div>
				{p.BannerContainer(
					<>
						{_config.map((conf, index) => (
							<React.Fragment key={index}>
								{conf.bannerComponent(conf.name, widths[index])}
							</React.Fragment>
						))}
					</>
				)}
				<div
					className={style.rowsContainer}
					style={{ paddingRight: p.paddingRight, paddingLeft: p.paddingLeft }}
				>
					{p.data.map((data, index) => {
						return (
							<RowContainer
								config={p.config}
								widths={widths}
								data={data}
								key={index}
							/>
						);
					})}
					{p.data.length === 0 && <Small>empty</Small>}
				</div>
			</div>
		</div>
	);
}

export default Grid;
