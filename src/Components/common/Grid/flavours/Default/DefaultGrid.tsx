import React from "react";
import Grid from "../../Grid";
import BannerContainer from "@src/Components/common/BannerContainer/BannerContainer";
import RowContainer from "../../RowContainer.default";

interface DefaultGridProps<T> {
	data: T[];
	config: ColumnConfig<T>[];
	width: number;
	paddingLeft?: number;
	paddingRight?: number;
}

function DefaultGrid<T>(props: DefaultGridProps<T>) {
	return (
		<Grid<T>
			data={props.data}
			config={props.config}
			BannerContainer={(children) => (
				<BannerContainer width={props.width}>{children}</BannerContainer>
			)}
			RowContainer={RowContainer<T>}
			width={props.width}
			paddingLeft={props.paddingLeft ? props.paddingLeft : 0}
			paddingRight={props.paddingRight ? props.paddingRight : 0}
		/>
	);
}

export default DefaultGrid;
