import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import React from "react";
import style from "./FirstPart.module.css";
import Spacer from "@src/Components/common/Spacer/Spacer";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import FormFileUpload from "@src/Components/common/FormFileUpload/FormFileUpload";
import AssetIndex from "@src/assets/AssetIndex";
import { useAddCategoryContext } from "../../AddCategoryForm";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FieldTextArea from "@src/Components/forms/FieldInput/FieldTextArea";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import { AnimatePresence, motion } from "framer-motion";

function FirstPart() {
	const {
		state,
		setStateActions,
		addCategoryActions,
		validate,
		selectUnitActions,
	} = useAddCategoryContext();

	return (
		<div className={style.inputBox}>
			<p className="body fw-medium fcolor-fuschia">Category Name</p>
			<Spacer height={8} />

			<FieldInput
				width={"100%"}
				type={"text"}
				placeHolder="Enter Category Name"
				{...state.firstForm.categoryName}
				onChange={(d) => {
					addCategoryActions.mutateState((p) => {
						p.firstForm.categoryName.value = d.target.value;
					});
				}}
			/>
			<Spacer height={8 * 2} />

			<p className="body fw-medium fcolor-fuschia">Category Code</p>
			<Spacer height={8} />
			<FieldInput
				width={"100%"}
				type={"text"}
				{...state.firstForm.categoryCode}
				onChange={(d) => {
					addCategoryActions.mutateState((p) => {
						p.firstForm.categoryCode.value = d.target.value;
					});
				}}
				placeHolder="Enter “52636325”"
				inputClassName={style.formInput}
				name="categoryCode"
				isLoading={state.loading.checkCode.status === "initialized"}
			/>

			<Spacer height={8 * 2} />

			<p className="body fw-medium fcolor-fuschia">Unit</p>
			<Spacer height={8} />
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
						inputClassName={style.formInput}
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
						inputClassName={style.formInput}
						name="categoryCode"
						rightIcon={"kg"}
					/>
					<Spacer height={8 * 2} />
				</>
			)}

			<p className="body fw-medium fcolor-fuschia">Description</p>
			<Spacer height={8} />
			<FieldTextArea
				isValid={state.firstForm.description.isValid}
				error={state.firstForm.description.error}
				data={state.firstForm.description.value}
				onChange={(d) => {
					addCategoryActions.mutateState((p) => {
						p.firstForm.description.value = d.target.value;
					});
				}}
				width={"100%"}
				height={120}
				placeHolder="Enter discription"
				inputClassName={style.formInput}
				name="description"
			/>
			<Spacer height={24} />

			<div className="vc w-100">
				<p className="h3 fcolor-text-body fw-bold mr-4">
					Upload a Photo of Category
				</p>
				<AssetIndex.LinkIcon />
			</div>
			<Spacer height={16} />

			<FormFileUpload
				onChange={(d) => {
					setStateActions.mutateState((p) => {
						p.images = d;
					});
				}}
			/>
			<Spacer height={16} />
			<div className="crow jfe">
				<DefaultButton
					loading={
						state.loading.checkName.status === "initialized" ||
						state.loading.checkCode.status === "initialized"
					}
					loadingColor={"#fff"}
					onClick={() => {
						validate.validateFirstForm(() => {
							addCategoryActions.mutateState((p) => {
								p.page++;
							});
						});
					}}
					label={"Next"}
					styles={NextButtonStyleConfig}
				/>
			</div>
		</div>
	);
}

export default FirstPart;
