import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import React from "react";
import Text from "@src/Components/Grid/Text/Text";
import { ImageIndex } from "@src/assets/AssetIndex";
import TableData from "@src/Components/Grid/TableData/TableData";

interface Props {
	data: CategoryNumberOfItems.GridData;
}

const d = (
	<div
		className="cc p-2"
		style={{
			width: "70%",
			height: 40,
			borderRadius: 6,
			backgroundColor: "rgba(70, 213, 178, 0.28)",
		}}
	>
		<p className="body fcolor-iris" style={{ color: "#00D6A1" }}></p>
	</div>
);

export default function TableRow(props: Props) {
	const { data } = props;
	return (
		<tr>
			<TableData>
				<Text>{data.srNo}</Text>
			</TableData>
			<TableData>
				<div className="flex items-center w-fit">
					<div>
						<img
							src={
								data.itemName.images === ""
									? ImageIndex.CategoryImage
									: data.itemName.images
							}
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
						<Text>{data.itemName.name}</Text>
					</div>
				</div>
			</TableData>
			<TableData>
				<Text>{data.price}</Text>
			</TableData>
			<TableData>
				<Text className="underline text-indigo-400">
					{data.numberOfCompanies}
				</Text>
			</TableData>
			<TableData>
				<div
					className={`px-4 py-3 rounded-md ${
						data.activeCompany.name === "" ? "bg-red-100" : "bg-green-100"
					}`}
				>
					<Text>
						{data.activeCompany.name === "" ? "none" : data.activeCompany.name}
					</Text>
				</div>
			</TableData>
			<TableData>
				<Text>{data.inactiveCompany.join(" ").slice(0, 10)}</Text>
			</TableData>
		</tr>
	);
}
