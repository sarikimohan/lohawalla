import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "./AddBasePrice.module.css";
import TitleNavBar from "@src/Components/common/NavBar/TitleNavBar";
import SearchBar from "@src/Components/common/SearchBar/SearchBar";
import SearchFilters from "@src/Components/common/SearchFilters/SearchFilters";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import SetBasePriceAction from "./managment/actions/SetBasePriceAction";
import DefaultGrid from "@src/Components/Grid/Grid/DefaultGrid/DefaultGrid";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import TableRow from "./component/TableRow/TableRow";
import { useAuthGuardContext } from "@src/auth/AuthGuard/AuthGuard";
import Snackbar from "@mui/material/Snackbar";

function AddBasePrice() {
	const [state, setState] = useState<SetBasePrice.State>({
		setList: [
			// {
			// 	srNo: 1,
			// 	companyName: {
			// 		imageURL: "",
			// 		name: "lohawalla",
			// 	},
			// 	companyId: "asldkfa",
			// 	priceFieldId: "asl;dfjasd",
			// 	cost: { value: "12342", hasChanged: false },
			// 	entryTime: "today",
			// },
		],
		filter: {
			query: "",
			filters: [],
		},
		loading: {
			fetch: AsyncStateFactory(),
			save: AsyncStateFactory(),
		},
	});
	const setBasePriceActions = new SetBasePriceAction(state, setState);
	const { user } = useAuthGuardContext();

	useEffect(() => {
		setBasePriceActions.fetch();
	}, []);

	return (
		<div className="mx-6">
			<div className={style.navContainer}>
				<TitleNavBar title={"Set Base Price"} />
			</div>
			<div className={"p-7"}>
				<Card variant="outlined" sx={{ padding: 5 }}>
					<div>
						<div className="crow mb-6">
							<p className="subtitle fcolor-onyx">
								Total Products ({state.setList.length})
							</p>
						</div>
						<div className="crow mb-6 sb">
							<div className="d-flex vc">
								<div className="mr-4">
									<SearchBar
										onChange={(e) => setBasePriceActions.setQuery(e)}
									/>
								</div>
								<div>
									<SearchFilters options={[]} onItemClick={() => {}} />
								</div>
							</div>
							<div>
								<DefaultButton
									onClick={function (): void {
										const verdict = setBasePriceActions.validateSubmit();
										if (verdict) {
											setBasePriceActions.save(user);
										}
									}}
									label={"save changes"}
									loading={state.loading.save.status === "initialized"}
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
									"company name",
									"cost",
									"entry time",
								]}
							>
								{state.setList.map((v, i) => (
									<TableRow
										data={v}
										setValue={(d) => {
											setBasePriceActions.mutateState((p) => {
												p.setList[i].cost.value = d;
												p.setList[i].cost.hasChanged = true;
											});
										}}
									/>
								))}
							</DefaultGrid>
						</div>
					</div>
				</Card>
			</div>
			<Snackbar
				open={state.loading.save.status === "initialized"}
				autoHideDuration={6000}
				message={state.loading.save.message}
			/>
		</div>
	);
}

export default AddBasePrice;
