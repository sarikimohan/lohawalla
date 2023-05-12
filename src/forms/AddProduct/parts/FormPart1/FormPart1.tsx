import { Autocomplete, TextField } from "@mui/material";
import { AutocompleteRenderInputParams } from "@mui/material/Autocomplete";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import FormFileUpload from "@src/Components/forms/FormFileUpload/FormFileUpload";

import DefaultFormLabel from "@src/Components/forms/FormLabel/DefaultFormLabel";

import React from "react";

interface FormPart1Props {}

function FormPart1(p: FormPart1Props) {
	return (
		<>
			<div className="flex flex-wrap mb-4">
				<div className="basis-1/2 p-3">
					<DefaultFormLabel className="mb-2">Select Company</DefaultFormLabel>
					<Autocomplete
						renderInput={(params) => (
							<TextField error={undefined} {...params} label="Company" />
						)}
						options={[]}
					/>
				</div>
				<div className="basis-1/2 p-3">
					<DefaultFormLabel className="mb-2">Select Category</DefaultFormLabel>
					<Autocomplete
						renderInput={(params) => (
							<TextField error={undefined} {...params} label="Category" />
						)}
						options={[]}
					/>
				</div>
				<div className="basis-1/2 p-3">
					<DefaultFormLabel className="mb-2">Select Item</DefaultFormLabel>
					<Autocomplete
						renderInput={(params) => (
							<TextField error={undefined} {...params} label="Item" />
						)}
						options={[]}
					/>
				</div>
			</div>
			<div className="mb-5">
				<FormFileUpload />
			</div>
			<div>
				<DefaultButton
					onClick={function (): void {}}
					label={"Next"}
					styles={NextButtonStyleConfig}
				/>
			</div>
		</>
	);
}

export default FormPart1;
