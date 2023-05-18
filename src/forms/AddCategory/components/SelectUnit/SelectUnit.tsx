import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import React from "react";
import { useAddCategoryContext } from "../../AddCategoryForm";
import Spacer from "@src/Components/common/Spacer/Spacer";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";

interface Props {
  list: {name: string, weight?: number}[];
  setUnit: (name: string, weight: string) => void;
  
}

export default function SelectUnit(props: Props) {
	const { state } = useAddCategoryContext();
	return (
		<>
			{/* <p className="body fw-medium fcolor-fuschia mb-2">Unit</p>
			<div
				className="border border-slate-300 rounded-md p-3"
				style={{ height: 48, position: "relative" }}
				onClick={() => {
					selectUnitActions.toggleShowDD();
				}}
			>
				<div className="flex justify-between">
					<p className="text-md text-slate-500 font-semibold select-none">
						{state.firstForm.unitSelect.selected === null
							? "select unit"
							: state.firstForm.unitSelect.selected.name}
					</p>
					<RotateAndScale
						config={{
							rotate: 0,
							scale: 1.05,
						}}
					>
						<div className="cursor-pointer">
							<ExpandCircleDownIcon sx={{ color: "#aeaeae" }} />
						</div>
					</RotateAndScale>
				</div>
				{state.firstForm.unitSelect.showDropDown && (
					<div
						style={{ position: "absolute", top: "100%", left: 0 }}
						className="bg-white w-full mt-3 shadow-lg"
					>
						{state.firstForm.unitSelect.list.map((v, i) => (
							<div
								key={i}
								className="pl-5 py-3 hover:bg-slate-100 group cursor-pointer"
								onClick={(e) => {
									e.stopPropagation();
									selectUnitActions.setSelectedUnit(v);
								}}
							>
								<p className="text-md font-medium text-slate-700 group-hover:text-indigo-400 group-hover:scale-110 w-fit select-none">
									{v.name}
								</p>
							</div>
						))}
					</div>
				)}
			</div>
			<Spacer height={8 * 2} />

			{state.firstForm.unitSelect.selected?.name === "custom" && (
				<>
					<p className="body fw-medium fcolor-fuschia">Enter Unit Name</p>
					<Spacer height={8} />
					<FieldInput
						width={"100%"}
						type={"text"}
						placeHolder="Enter “52636325”"
						name="categoryCode"
					/>
					<Spacer height={8 * 2} />
				</>
			)}
			{(state.firstForm.unitSelect.selected?.name === "bundle" ||
				state.firstForm.unitSelect.selected?.name === "custom") && (
				<>
					<p className="body fw-medium fcolor-fuschia">
						Enter {state.firstForm.unitSelect.selected?.name} Weight
					</p>
					<Spacer height={8} />
					<FieldInput
						width={"100%"}
						type={"text"}
						placeHolder="Enter “52636325”"
						name="categoryCode"
						rightIcon={"kg"}
					/>
					<Spacer height={8 * 2} />
				</>
			)} */}
		</>
	);
}
