import DefaultGrid from "@src/Components/Grid/Grid/DefaultGrid/DefaultGrid";
import TitleNavBar from "@src/Components/common/NavBar/TitleNavBar";
import SearchBar from "@src/Components/common/SearchBar/SearchBar";
import SearchFilters from "@src/Components/common/SearchFilters/SearchFilters";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";
import AddUnit from "@src/forms/AddUnit/AddUnit";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import UnitActions from "./actions/UnitActions";
import RowStat from "@src/Components/Grid/RowStat/RowStat";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import TableRow from "./components/TableRow/TableRow";

interface Props {}

export default function Units(props: Props) {
	const [state, setState] = useState<Unit.State>({
		query: "",
		showAddUnitForm: false,
		unitList: [],
		loading: {
			fetch: AsyncStateFactory(),
		},
		refresh: false,
	});

	const unitActions = new UnitActions(state, setState);

	const refresh = () => {
		unitActions.mutateState((p) => void (p.refresh = !p.refresh));
	};
	const close = () => {
		unitActions.toggleFormVisibility();
	};
	const setQuery = (d: string) => {
		unitActions.setQuery(d);
	};

	useEffect(() => {
		unitActions.fetchData();
	}, []);

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
										setQuery(d);
									}}
								/>
							</div>
							<div className="flex">
								<div className="mr-2">
									{/* <DefaultButton
										onClick={function (): void {}}
										label={"save changes"}
									/> */}
								</div>
								<div>
									<DefaultButton
										onClick={() => {
											unitActions.toggleFormVisibility();
										}}
										label={"+ add unit"}
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
									"item count",
									// "product count",
									// "delete",
								]}
							>
								<RowStat
									isEmpty={state.unitList.length === 0}
									asyncState={state.loading.fetch}
									colSpan={4}
								>
									{state.unitList.map((v, i) => (
										<TableRow data={v} key={i} />
									))}
								</RowStat>
							</DefaultGrid>
						</div>
					</div>
				</Card>
			</div>
			<div>
				{state.showAddUnitForm && <AddUnit refresh={refresh} close={close} />}
			</div>
		</div>
	);
}
