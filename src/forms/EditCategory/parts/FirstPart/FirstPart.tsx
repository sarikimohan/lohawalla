import FormFileUpload from "@src/Components/forms/FormFileUpload/FormFileUpload";
import React from "react";
import { useEditCategoryContext } from "../../EditCategory";
import ValidatedEntry from "@src/Components/special/ValidatedEntry/ValidatedEntry";
import FieldTextArea from "@src/Components/forms/FieldInput/FieldTextArea";
import UnitInput, { PIUnitInput } from "./components/UnitInput/UnitInput";
import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";

interface Props {}

export default function FirstPart(props: Props) {
	const { editCategoryActions, state, setInputHandle, setUnitHandle } =
		useEditCategoryContext();

	return (
		<div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">
					Category Name
				</p>
				<ValidatedEntry
					type={"text"}
					placeHolder={"enter category name"}
					setHandle={setInputHandle("categoryName")}
					validateFunction={FieldDataService.clubValidators(
						Validators.validateNull
					)}
					onChange={(d) => {
						editCategoryActions.mutateState((p) => (p.categoryName = d));
					}}
					value={state.categoryName}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">
					Category Code
				</p>
				<ValidatedEntry
					type={"text"}
					placeHolder={"enter category code"}
					setHandle={setInputHandle("categoryCode")}
					validateFunction={FieldDataService.clubValidators(
						Validators.validateNull,
						Validators.validateInt,
						(d) => Validators.min(d, 0)
					)}
					onChange={(d) => {
						editCategoryActions.mutateState((p) => {
							p.categoryCode = d;
						});
					}}
					value={state.categoryCode}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Unit</p>
				<UnitInput
					unitList={[
						{ id: "", name: "unit1", weight: -1 },
						{ id: "2", name: "unit2", weight: 1000 },
					]}
					value={null}
					setHandle={setUnitHandle}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Description</p>
				<ValidatedEntry
					placeHolder={"description"}
					setHandle={setInputHandle("categoryDescription")}
					validateFunction={FieldDataService.clubValidators(
						Validators.validateNull
					)}
					value={state.description}
					onChange={(d) => {
						editCategoryActions.mutateState((p) => {
							p.description = d;
						});
					}}
				/>
			</div>
			<div>
				<FormFileUpload />
			</div>
		</div>
	);
}
