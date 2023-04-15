import React from "react";

const RowContainer = function <T>(p: {
	config: ColumnConfig<T>[];
	widths: number[];
	data: T;
}) {
	return (
		<div className="vc" style={{ width: "fit-content", padding: "10px 0px" }}>
			{p.config.map((com, index) => {
				return (
					<React.Fragment key={index}>
						{com.component(p.data, p.widths[index])}
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default RowContainer;
