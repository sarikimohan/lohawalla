import React from "react";
import Text from "@src/Components/Grid/Text/Text";
import { ImageIndex } from "@src/assets/AssetIndex";
import BorderOnHover from "@src/Components/interactions/BorderOnHover/BorderOnHover";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";

interface Props {
	data: Categories.CategoryGridData;
}

export default function TableRow(props: Props) {
	const { data } = props;
	return (
		<tr>
			<td align="center" className="py-3 border-b">
				<Text>{data.srNo}</Text>
			</td>
			<td align="center" className="py-3 border-b">
				<RotateAndScale config={{ rotate: 0, scale: 1.01 }}>
					<div className="flex items-center w-fit cursor-pointer group select-none">
						<img
							src={
								data.categoryName.imageURL === "" ||
								data.categoryName.imageURL === null
									? ImageIndex.CategoryImage
									: data.categoryName.imageURL
							}
							alt="item image"
							style={{
								objectFit: "cover",
								objectPosition: "center",
								width: 32,
								height: 32,
								borderRadius: 200,
							}}
							className="mr-3"
						/>
						<Text className="group-hover:font-bold transition-all	">
							{data.categoryName.name}
						</Text>
					</div>
				</RotateAndScale>
			</td>
			<td align="center" className="py-3 border-b">
				<Text>{data.categoryCode}</Text>
			</td>
			<td align="center" className="py-3 border-b">
				<Text>{data.entryTime}</Text>
			</td>
			<td align="center" className="py-3 border-b">
				<RotateAndScale config={{ rotate: 0, scale: 1.1 }}>
					<BorderOnHover
						borderConfig={{
							borderWidth: 1,
							borderColor: "#0000ff",
						}}
					>
						<Text className="text-blue-500 underline select-none">
							{data.noOfItems}
						</Text>
					</BorderOnHover>
				</RotateAndScale>
			</td>
			<td align="center" className="py-3 border-b" style={{ width: 80 }}>
				<Text>pin</Text>
			</td>
		</tr>
	);
}
