import React from "react";
import Text from "@src/Components/Grid/Text/Text";
import { ImageIndex } from "@src/assets/AssetIndex";
import BorderOnHover from "@src/Components/interactions/BorderOnHover/BorderOnHover";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import { Link, useNavigate } from "react-router-dom";

interface Props {
	data: Companies.CompanyListRow;
}

export default function TableRow(props: Props) {
	const { data } = props;

	return (
		<tr>
			<td align="center" className="py-3 border-b">
				<Text>{data.srNo}</Text>
			</td>
			<td align="center" className="py-3 border-b">
				<div style={{ maxWidth: 150 }}>
					<Link to={`/company/${data._id}`}>
						<RotateAndScale config={{ rotate: 0, scale: 1.01 }}>
							<div className="flex items-center w-fit cursor-pointer group select-none">
								<img
									src={
										data.companyName.imageURL === "" ||
										data.companyName.imageURL === null
											? ImageIndex.CategoryImage
											: data.companyName.imageURL
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
									{data.companyName.name}
								</Text>
							</div>
						</RotateAndScale>
					</Link>
				</div>
			</td>
			<td align="center" className="py-3 border-b">
				<Text>{data.price}</Text>
			</td>
			<td align="center" className="py-3 border-b">
				<Text>{data.entryTime}</Text>
			</td>
			<td align="center" className="py-3 border-b">
				<Link
					to={`/companyProducts/${data._id}?companyName=${data.companyName.name}`}
				>
					<RotateAndScale config={{ rotate: 0, scale: 1.1 }}>
						<BorderOnHover
							borderConfig={{
								borderWidth: 1,
								borderColor: "#0000ff",
							}}
						>
							<Text className="text-blue-500 underline select-none w-fit">
								{data.noOfProducts}
							</Text>
						</BorderOnHover>
					</RotateAndScale>
				</Link>
			</td>
			<td align="center" className="py-3 border-b" style={{ width: 80 }}>
				<Text>pin</Text>
			</td>
		</tr>
	);
}
