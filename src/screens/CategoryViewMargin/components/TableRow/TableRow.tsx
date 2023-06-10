import Text from "@src/Components/Grid/Text/Text";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import { ImageIndex } from "@src/assets/AssetIndex";
import React from "react";

interface Props {
	data: CategoryViewMargin.ItemMarginGridData;
	setCashValue: (d: string) => void;
	setOnlineValue: (d: string) => void;
}

export default function TableRow(props: Props) {
	const { data: value } = props;
	const imageUrl =
		value.itemName.imageURL === ""
			? ImageIndex.CategoryImage
			: value.itemName.imageURL;
	return (
		<tr>
			<td align="center" className="py-3 border-b">
				<Text>{value.srNo}</Text>
			</td>
			<td align="center" className="py-3 border-b">
				<div className="flex items-center w-fit" style={{ minWidth: 200 }}>
					<div>
						<img
							src={imageUrl}
							className="mr-3"
							alt=""
							style={{
								height: 32,
								width: 32,
								objectFit: "cover",
								borderRadius: 200,
							}}
						/>
					</div>
					<div>
						<Text>{value.itemName.name}</Text>
					</div>
				</div>
			</td>
			<td align="center" className="py-3 border-b">
				<div style={{ width: "50%" }}>
					<FieldInput
						{...value.cashMargin}
						onChange={(d) => {
							props.setCashValue(d.target.value);
						}}
						type={"number"}
						placeHolder={"enter value"}
						rightIcon="%"
					/>
				</div>
			</td>
			<td align="center" className="py-3 border-b">
				<div style={{ width: "50%" }}>
					<FieldInput
						{...value.onlineMargin}
						onChange={(d) => {
							props.setOnlineValue(d.target.value);
						}}
						type={"number"}
						placeHolder={"enter value"}
						rightIcon="%"
					/>
				</div>
			</td>
		</tr>
	);
}
