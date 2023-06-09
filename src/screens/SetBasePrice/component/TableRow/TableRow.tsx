import Text from "@src/Components/Grid/Text/Text";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import { ImageIndex } from "@src/assets/AssetIndex";
import React from "react";
import style from './TableRow.module.css'

interface Props {
	data: SetBasePrice.SetCompanyBasePrice;
	setValue: (d: string) => void;
}

export default function TableRow(props: Props) {
	const { data } = props;
	const imageUrl =
		data.companyName.imageURL === ""
			? ImageIndex.CategoryImage
			: data.companyName.imageURL;
	return (
		<tr>
			<td align="center" className="py-3 border-b">
				<Text>{data.srNo}</Text>
			</td>
			<td align="center" className="py-3 border-b">
				<div className="flex items-center w-full cursor-pointer" style={{ maxWidth: 200 }}>
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
						<Text>{data.companyName.name}</Text>
					</div>
				</div>
			</td>
			<td align="center" className="py-3 border-b">
				<div style={{ width: "50%" }}>
					<FieldInput
						{...data.cost}
						onChange={(d) => {
							props.setValue(d.target.value);
						}}
						type={"number"}
						placeHolder={"enter value"}
						rightIcon="₹"
					/>
				</div>
			</td>
			<td align="center" className="py-3 border-b">
				<Text>{data.entryTime}</Text>
			</td>
		</tr>
	);
}
