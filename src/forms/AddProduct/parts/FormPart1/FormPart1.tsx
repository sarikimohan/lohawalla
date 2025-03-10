import { Autocomplete, TextField } from "@mui/material";
import { AutocompleteRenderInputParams } from "@mui/material/Autocomplete";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import FormFileUpload from "@src/Components/forms/FormFileUpload/FormFileUpload";

import DefaultFormLabel from "@src/Components/forms/FormLabel/DefaultFormLabel";

import React, { useEffect } from "react";
import { useAddProductContext } from "../../AddProductForm";
import Spacer from "@src/Components/common/Spacer/Spacer";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FormFileUploadHeader from "@src/Components/forms/FormFileUploadHeader/FormFileUploadHeader";

interface FormPart1Props {}

function FormPart1(p: FormPart1Props) {
	const { state, addProductActions, validate } = useAddProductContext();
	return (
		<>
			<div className="flex flex-wrap mb-4">
				<div className="basis-1/2 p-3">
					<DefaultFormLabel className="mb-3">Select Company</DefaultFormLabel>
					<Autocomplete
						getOptionLabel={(d) => d.name}
						renderInput={(params) => (
							<TextField
								error={state.firstForm.selectedCompany.error !== undefined}
								{...params}
								label="Company"
							/>
						)}
						options={state.firstForm.companiesList}
						onOpen={() => {
							if (state.loading.fetchCompanies.status !== "success")
								addProductActions.fetchCompanies();
						}}
						onChange={(e, val) => {
							addProductActions.setSelectedCompany(val);
						}}
						onInputChange={(e, v, r) => {
							if (r === "clear") {
								addProductActions.setSelectedCompany(null);
							}
						}}
						loading={state.loading.fetchCompanies.status === "initialized"}
						clearOnEscape
						isOptionEqualToValue={(o, v) => o._id === v._id}
						value={state.firstForm.selectedCompany.value}
					/>
				</div>
				<div className="basis-1/2 p-3">
					<DefaultFormLabel className="mb-3">Select Category</DefaultFormLabel>
					<Autocomplete
						getOptionLabel={(d) => d.name}
						renderInput={(params) => (
							<TextField
								error={state.firstForm.selectedCategory.error !== undefined}
								{...params}
								label="Category"
							/>
						)}
						options={state.firstForm.categoryList}
						onOpen={() => {
							if (state.loading.fetchCategories.status !== "success") {
								addProductActions.fetchCategoies();
							}
						}}
						onChange={(e, val) => {
							addProductActions.setSelectedCategory(val);
						}}
						onInputChange={(e, v, r) => {
							if (r === "clear") {
								addProductActions.setSelectedCategory(null);
							}
						}}
						loading={state.loading.fetchCategories.status === "initialized"}
						clearOnEscape
						isOptionEqualToValue={(o, v) => o._id === v._id}
						value={state.firstForm.selectedCategory.value}
					/>
				</div>
				<div className="basis-1/2 p-3">
					<DefaultFormLabel className="mb-3">Select Item</DefaultFormLabel>
					<Autocomplete
						disabled={state.firstForm.selectedCategory.value === null}
						getOptionLabel={(d) => d.name}
						renderInput={(params) => (
							<TextField
								error={state.firstForm.selectedItem.error !== undefined}
								{...params}
								label="Item"
							/>
						)}
						options={state.firstForm.itemList}
						onOpen={() => {
							addProductActions.fetchItems();
						}}
						onChange={(e, val) => {
							addProductActions.setSelectedItem(val);
						}}
						onInputChange={(e, v, r) => {
							if (r === "clear") {
								addProductActions.setSelectedItem(null);
							}
						}}
						loading={state.loading.fetchItems.status === "initialized"}
						clearOnEscape
						isOptionEqualToValue={(o, v) => o._id === v._id}
						value={state.firstForm.selectedItem.value}
					/>
				</div>
			</div>
			<div className="mb-5">
				<p className="text-sm font-medium text-red-400">
					{state.firstForm.uniqueError}
				</p>
			</div>
			<div className="mb-5">
				<FormFileUploadHeader marginBottom={16}>
					Upload Images of product
				</FormFileUploadHeader>
				<FormFileUpload
					values={state.firstForm.imageList}
					onChange={(e) => {
						addProductActions.mutateState((p) => {
							p.firstForm.imageList = e;
						});
					}}
				/>
			</div>
			<div>
				<DefaultButton
					onClick={function (): void {
						validate.validateFirstForm().then((verdict) => {
							if (verdict) {
								addProductActions.mutateState((p) => p.page++);
							}
						});
					}}
					label={"Next"}
					styles={NextButtonStyleConfig}
					loading={state.loading.checkUnique.status === "initialized"}
					loadingColor={"white"}
					disabled={state.loading.checkUnique.status === "initialized"}
				/>
			</div>
		</>
	);
}

export default FormPart1;
