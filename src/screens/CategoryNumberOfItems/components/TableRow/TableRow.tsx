import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import React from "react";
import Text from "@src/Components/Grid/Text/Text";

interface Props {}

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
	return (
		<tr>
			<td align="center" className="py-3 border-b">
				<Text>{}</Text>
			</td>
			<td align="center" className="py-3 border-b">
				<div className="flex items-center w-fit">
					<div>
						<img
							src={""}
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
						<Text>{}</Text>
					</div>
				</div>
			</td>
			<td align="center" className="py-3 border-b">
				<div style={{ width: "50%" }}>
					<FieldInput
						onChange={(d) => {}}
						type={"number"}
						placeHolder={"enter value"}
						rightIcon="₹"
					/>
				</div>
			</td>
			<td align="center" className="py-3 border-b">
				<div style={{ width: "50%" }}>
					<FieldInput
						onChange={(d) => {}}
						type={"number"}
						placeHolder={"enter value"}
						rightIcon="₹"
					/>
				</div>
			</td>
		</tr>
	);
}
