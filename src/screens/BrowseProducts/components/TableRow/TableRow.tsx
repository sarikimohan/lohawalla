import TableData from "@src/Components/Grid/TableData/TableData";
import Text from "@src/Components/Grid/Text/Text";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import { ImageIndex } from "@src/assets/AssetIndex";
import React from "react";

interface Props {
	data: BrowseProducts.GridDataFormat;
	index: number;
	onChange: (position: number, data: string) => void;
}

export default function TableRow(props: Props) {
	const data = props.data;
	return (
		<tr>
			<TableData>
				<Text>{data.srNo}</Text>
			</TableData>
			<TableData>
				<div className="flex">
					<div className="mr-1 flex-shrink-0">
						<img
							src={
								data.productName.imgURL === ""
									? ImageIndex.CategoryImage
									: data.productName.imgURL
							}
							alt=""
							style={{
								height: 32,
								width: 32,
								borderRadius: 100,
								objectFit: "cover",
								objectPosition: "center",
							}}
						/>
					</div>
					<div>
						<Text>{data.productName.name}</Text>
					</div>
				</div>
			</TableData>
			{data.priceStructure.map((v, i) => (
				<TableData>
					<div style={{ width: "80%", minWidth: 80 }}>
						<FieldInput
							type={"number"}
							placeHolder={"value"}
							{...v.value}
							disabled={v.isFixed}
							onChange={(d) => {
								props.onChange(i, d.target.value);
							}}
						/>
					</div>
				</TableData>
			))}
		</tr>
	);
}
