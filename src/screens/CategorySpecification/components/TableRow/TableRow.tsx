import React from "react";
import Text from "@src/Components/Grid/Text/Text";
import { ImageIndex } from "@src/assets/AssetIndex";
import BorderOnHover from "@src/Components/interactions/BorderOnHover/BorderOnHover";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import { Link, useNavigate } from "react-router-dom";

interface Props {
	data: CategorySpecification.ItemGridData;
	link: string;
}

export default function TableRow(props: Props) {
	const { data } = props;

	return (
		<tr>
			<td align="center" className="py-3 border-b">
				<Text>{data.srNo}</Text>
			</td>
			<td align="center" className="py-3 border-b">
				<div style={{ maxWidth: 250 }}>
					<Link to={props.link}>
						<RotateAndScale config={{ rotate: 0, scale: 1.01 }}>
							<div className="flex items-center w-fit cursor-pointer group select-none">
								<img
									src={
										data.itemName.imageURL === "" ||
										data.itemName.imageURL === null
											? ImageIndex.CategoryImage
											: data.itemName.imageURL
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
									{data.itemName.name}
								</Text>
							</div>
						</RotateAndScale>
					</Link>
				</div>
			</td>
			<td align="center" className="py-3 border-b">
				<Text>{data.itemCode}</Text>
			</td>
			<td align="center" className="py-3 border-b">
				<Text>{data.entryTime}</Text>
			</td>

			<td align="center" className="py-3 border-b" style={{ width: 80 }}>
				<Text>pin</Text>
			</td>
		</tr>
	);
}
