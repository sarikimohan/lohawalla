import FormFileUpload from "@src/Components/forms/FormFileUpload/FormFileUpload";
import React from "react";
import { useEditCategoryContext } from "../../EditCategory";
import ValidatedEntry from "@src/Components/special/ValidatedEntry/ValidatedEntry";
import FieldTextArea from "@src/Components/forms/FieldInput/FieldTextArea";
import UnitInput, { PIUnitInput } from "./components/UnitInput/UnitInput";
import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import checkNameIsCode from "../../fetch/services/checkCodeIsUnique";
import checkNameIsUnique from "../../fetch/services/checkNameIsUnique";
import checkCodeIsUnique from "../../fetch/services/checkCodeIsUnique";

interface Props {}

export default function FirstPart(props: Props) {
	const { editCategoryActions, state, setInputHandle, setUnitHandle } =
		useEditCategoryContext();

	console.log(state.unit);

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
					asyncValidator={(d) => checkNameIsUnique(d, state.categoryName)}
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
					asyncValidator={(d) => checkCodeIsUnique(d, state.categoryCode)}
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
					unitList={state.unitList}
					value={state.unit}
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
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Negotiation</p>
				<ValidatedEntry
					placeHolder={"negotiation"}
					setHandle={setInputHandle("categoryNegotiation")}
					validateFunction={FieldDataService.clubValidators(
						Validators.validateNull,
						Validators.validateFloat,
						(d) => Validators.min(d, 0),
						(d) => Validators.max(d, 100)
					)}
					value={state.negotiation}
					onChange={(d) => {
						editCategoryActions.mutateState((p) => {
							p.negotiation = d;
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
