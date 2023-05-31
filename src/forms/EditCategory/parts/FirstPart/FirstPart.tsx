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
import { FormLabel } from "@mui/material";
import DefaultFormLabel from "@src/Components/forms/FormLabel/DefaultFormLabel";
import ImageSmall from "@src/Components/common/ImageSmall/ImageSmall";
import ImageSmallWithDelete from "@src/Components/common/ImageSmall/ImageSmallWithDelete";

interface Props {}

export default function FirstPart(props: Props) {
	const { editCategoryActions, state, setInputHandle, setUnitHandle } =
		useEditCategoryContext();

	return (
		<div>
			<div className="mb-4">
				<DefaultFormLabel>Category Name</DefaultFormLabel>
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
				<DefaultFormLabel>Category Code</DefaultFormLabel>
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
				<DefaultFormLabel>Description</DefaultFormLabel>
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
				<DefaultFormLabel>Negotiation</DefaultFormLabel>
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
			<DefaultFormLabel className="mb-2">Images</DefaultFormLabel>
			<div className="border p-4 rounded-md">
				<div className="crow">
					<ImageSmallWithDelete src={""} />
				</div>
			</div>
			<div>
				<FormFileUpload />
			</div>
		</div>
	);
}
