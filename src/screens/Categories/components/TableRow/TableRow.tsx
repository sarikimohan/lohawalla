import React from "react";
import Text from "@src/Components/Grid/Text/Text";
import { ImageIndex } from "@src/assets/AssetIndex";
import BorderOnHover from "@src/Components/interactions/BorderOnHover/BorderOnHover";
import ScaleOnHover from "@src/Components/interactions/ScaleOnHover/ScaleOnHover";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";

interface Props {}

export default function TableRow(props: Props) {
	return (
		<tr>
			<td align="center" className="py-3 border-b">
				<Text>1</Text>
			</td>
			<td align="center" className="py-3 border-b">
				<RotateAndScale config={{ rotate: 0, scale: 1.01 }}>
					<div className="flex items-center w-fit cursor-pointer group select-none">
						<img
							src={ImageIndex.CategoryImage}
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
							Tmt Bar
						</Text>
					</div>
				</RotateAndScale>
			</td>
			<td align="center" className="py-3 border-b">
				<Text>23087042</Text>
			</td>
			<td align="center" className="py-3 border-b">
				<Text>2 May</Text>
			</td>
			<td align="center" className="py-3 border-b">
				<RotateAndScale config={{ rotate: 0, scale: 1.1 }}>
					<BorderOnHover
						borderConfig={{
							borderWidth: 1,
							borderColor: "#0000ff",
						}}
					>
						<Text className="text-blue-500 underline select-none">21</Text>
					</BorderOnHover>
				</RotateAndScale>
			</td>
			<td align="center" className="py-3 border-b" style={{ width: 80 }}>
				<Text>pin</Text>
			</td>
		</tr>
	);
}
