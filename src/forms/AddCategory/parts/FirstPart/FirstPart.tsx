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
import SelectUnit from "../../components/SelectUnit/SelectUnit";
import {
	Autocomplete,
	AutocompleteRenderInputParams,
	TextField,
} from "@mui/material";
import DefaultFormLabel from "@src/Components/forms/FormLabel/DefaultFormLabel";

function FirstPart() {
	const { state, setStateActions, addCategoryActions, validate } =
		useAddCategoryContext();

	console.log(state.firstForm.unit && state.firstForm.unit.weight === -1);

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
			/>

			<Spacer height={8 * 2} />

			<p className="body fw-medium fcolor-fuschia">Unit</p>
			<Spacer height={8} />
			<Autocomplete
				getOptionLabel={(d) => d.name}
				renderInput={(params) => (
					<TextField error={undefined} {...params} label="Unit" />
				)}
				options={state.firstForm.unitList}
				onOpen={() => {
					if (state.loading.fetchUnits.status !== "success")
						addCategoryActions.fetchUnits();
				}}
				onChange={(e, val) => {
					addCategoryActions.setSelectedUnit(val);
				}}
				onInputChange={(e, v, r) => {
					if (r === "clear") {
						addCategoryActions.setSelectedUnit(null);
					}
				}}
				loading={state.loading.fetchUnits.status === "initialized"}
				clearOnEscape
				isOptionEqualToValue={(o, v) => o.id === v.id}
				value={state.firstForm.unit}
			/>
			<Spacer height={20} />
			{state.firstForm.unit && state.firstForm.unit.weight === -1 && (
				<>
					<p className="body fw-medium fcolor-fuschia">
						{"Enter " + state.firstForm.unit.name + " weight"}
					</p>
					<FieldInput
						type="number"
						{...state.firstForm.unitWeightInputField}
						onChange={(d) => {
							addCategoryActions.setUnitWeightInput(d.target.value);
						}}
						width={"100%"}
						placeHolder={`${state.firstForm.unit.name} weight in kg`}
						inputClassName={style.formInput}
						name="description"
					/>
				</>
			)}
			{state.firstForm.unit && state.firstForm.unit.weight !== -1 && (
				<>
					<p className="body fw-medium fcolor-fuschia">Unit weight is</p>
					<FieldInput
						type="number"
						value={state.firstForm.unit.weight.toString()}
						onChange={(d) => {}}
						width={"100%"}
						placeHolder={`Enter ${state.firstForm.unit.name} weight`}
						inputClassName={style.formInput}
						name="description"
						disabled
					/>
				</>
			)}

			<Spacer height={8 * 2} />
			{/* <SelectUnit /> */}
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
							const verdict = addCategoryActions.validateUnitWeightInput();
							if (verdict) {
								addCategoryActions.mutateState((p) => p.page++);
							}
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
