import DefaultGrid from "@src/Components/Grid/Grid/DefaultGrid/DefaultGrid";
import TitleNavBar from "@src/Components/common/NavBar/TitleNavBar";
import SearchBar from "@src/Components/common/SearchBar/SearchBar";
import SearchFilters from "@src/Components/common/SearchFilters/SearchFilters";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import React, { useState } from "react";
import { Card } from "@mui/material";
import AddUnit from "@src/forms/AddUnit/AddUnit";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import UnitActions from "./actions/UnitActions";

interface Props {}

export default function Units(props: Props) {
	const [state, setState] = useState<Unit.State>({
		query: "",
		showAddUnitForm: "",
		unitList: [],
		loading: {},
	});

	// using the setState functoin
	// each time we have to create a new state
	// we have to write all the logic in the component
	const setQuery = (d: string) => {
		setState((p) => {
			const newState = { ...p };
			newState.query = d;
			return newState;
		});
	};

	const unitActions = new UnitActions(state, setState);

	console.log(state.query);

	return (
		<div className="mx-6">
			<div className="w-full">
				<TitleNavBar title={"Manage Units"} />
			</div>
			<div className={"p-7"}>
				<Card variant="outlined" sx={{ padding: 5 }}>
					<div>
						<div className="crow mb-6">
							<p className="subtitle fcolor-onyx">Total Units</p>
						</div>
						<div className="crow mb-6 sb">
							<div className="d-flex vc">
								<SearchBar
									onChange={(d) => {
										unitActions.setQuery(d);
									}}
								/>
							</div>
							<div className="flex">
								<div className="mr-2">
									<DefaultButton
										onClick={function (): void {}}
										label={"save changes"}
									/>
								</div>
								<div>
									<DefaultButton
										onClick={function (): void {}}
										label={"add unit"}
									/>
								</div>
							</div>
						</div>
						<div>
							<DefaultGrid
								columns={[
									{
										name: "sr no",
										width: 80,
									},
									"unit name",
									"weight",
									"entry time",
									"category count",
									"product count",
									{ name: "", width: 50 },
								]}
							></DefaultGrid>
						</div>
					</div>
				</Card>
			</div>
			<div><AddUnit /></div>
		</div>
	);
}
