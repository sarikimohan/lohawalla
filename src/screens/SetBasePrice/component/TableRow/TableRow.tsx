import Text from "@src/Components/Grid/Text/Text";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import { ImageIndex } from "@src/assets/AssetIndex";
import React from "react";
import style from "./TableRow.module.css";
import { Link } from "react-router-dom";
import ScaleOnHover from "@src/Components/interactions/ScaleOnHover/ScaleOnHover";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";

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
				<div
					className="flex items-center w-full cursor-pointer group"
					style={{ maxWidth: 200 }}
				>
					<RotateAndScale config={{ rotate: 0 }}>
						<Link to={`/company/${data.companyId}`}>
							<div className="flex items-center w-full cursor-pointer group">
								<div style={{ flexShrink: 0 }}>
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
									<Text className="group-hover:font-bold transition-all	">
										{data.companyName.name}
									</Text>
								</div>
							</div>
						</Link>
					</RotateAndScale>
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
