import { Autocomplete, Card, TextField } from "@mui/material";
import DefaultGrid from "@src/Components/Grid/Grid/DefaultGrid/DefaultGrid";
import TitleNavBar from "@src/Components/common/NavBar/TitleNavBar";
import SearchBar from "@src/Components/common/SearchBar/SearchBar";
import SearchFilters from "@src/Components/common/SearchFilters/SearchFilters";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import DefaultFormLabel from "@src/Components/forms/FormLabel/DefaultFormLabel";
import React from "react";

interface Props {}

export default function BrowseProducts(props: Props) {
	return (
		<div className="mx-6">
			<div className="w-full">
				<TitleNavBar title={"Company Products"} />
			</div>
			<div className={"p-7"}>
				<Card variant="outlined" sx={{ padding: 5 }}>
					<div>
						<div className="crow mb-6">
							<p className="subtitle fcolor-onyx">Product Price ({})</p>
						</div>
						<div className="crow mb-6 sb">
							<div className="flex flex-wrap mb-4">
								<div className="p-3">
									<Autocomplete
                    sx={{width: 200}}
										// getOptionLabel={(d) => d.name}
										renderInput={(params) => (
											<TextField
												error={undefined}
												{...params}
												label="Company"
											/>
										)}
										options={[]}
										onOpen={() => {}}
										onChange={(e, val) => {}}
										onInputChange={(e, v, r) => {}}
										loading={false}
										clearOnEscape
										// isOptionEqualToValue={(o, v) => o._id === v._id}
										// value={state.firstForm.selectedCompany.value}
									/>
								</div>
								<div className="p-3">
									<Autocomplete
                    sx={{width: 200}}
										// getOptionLabel={(d) => d.name}
										renderInput={(params) => (
											<TextField
												error={undefined}
												{...params}
												label="Category"
											/>
										)}
										options={[]}
										onOpen={() => {}}
										onChange={(e, val) => {}}
										onInputChange={(e, v, r) => {}}
										loading={false}
										clearOnEscape
										// isOptionEqualToValue={(o, v) => o._id === v._id}
										// value={state.firstForm.selectedCompany.value}
									/>
								</div>
								<div className="p-3">
									<Autocomplete
                    sx={{width: 200}}
										// getOptionLabel={(d) => d.name}
										renderInput={(params) => (
											<TextField
												error={undefined}
												{...params}
												label="Item"
											/>
										)}
										options={[]}
										onOpen={() => {}}
										onChange={(e, val) => {}}
										onInputChange={(e, v, r) => {}}
										loading={false}
										clearOnEscape
										// isOptionEqualToValue={(o, v) => o._id === v._id}
										// value={state.firstForm.selectedCompany.value}
									/>
								</div>
							</div>
							<div>
								<DefaultButton
									onClick={function (): void {}}
									label={"add company product"}
								/>
							</div>
						</div>
						<div>
							<DefaultGrid
								columns={[
									{
										name: "sr no",
										width: 100,
									},
									"product name",
								]}
							></DefaultGrid>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
