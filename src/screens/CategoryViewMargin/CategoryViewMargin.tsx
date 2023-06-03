import { Card } from "@mui/material";
import DefaultGrid from "@src/Components/Grid/Grid/DefaultGrid/DefaultGrid";
import TitleNavBar from "@src/Components/common/NavBar/TitleNavBar";
import SearchBar from "@src/Components/common/SearchBar/SearchBar";
import SearchFilters from "@src/Components/common/SearchFilters/SearchFilters";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import React, { useState, useEffect } from "react";
import TableRow from "./components/TableRow/TableRow";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import BackNavBar from "@src/Components/common/NavBar/BackNavBar";
import { ServerActions } from "./actions/ServerActions";
import { useParams } from "react-router-dom";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import ErrorBoundary from "@src/Components/feedback/ErrorBoundary/ErrorBoundary";
import LoadingBoundary from "@src/Components/common/LoadingBoundary/LoadingBoundary";
import { useAuthGuardContext } from "@src/auth/AuthGuard/AuthGuard";
import useHeight from "@src/modules/hooks/useHeight";
import RowStat from "@src/Components/Grid/RowStat/RowStat";

interface Props {}

export default function CategoryViewMargin(props: Props) {
	const [state, setState] = useState<CategoryViewMargin.State>({
		data: [],
		loading: {
			fetch: AsyncStateFactory(),
			save: AsyncStateFactory(),
		},
		query: "",
	});

	const heightHandle = useHeight();

	const stateUtils = new StateUtils<CategoryViewMargin.State>(state, setState);
	const serverActions = new ServerActions(state, setState);
	const { id } = useParams();
	const { user } = useAuthGuardContext();

	useEffect(() => {
		if (id) serverActions.fetch(id);
	}, []);

	const gridList = serverActions.filter();

	return (
		<div>
			<div className="w-full" ref={heightHandle.ref}>
				<BackNavBar title={"Category / Number of Item/ View Margin"} />
			</div>
			<LoadingBoundary asyncState={state.loading.fetch}>
				<ErrorBoundary
					asyncStates={[state.loading.fetch, state.loading.save]}
					primaryAction={{
						onClick: () => {
							window.location.reload();
						},
						label: "Reload",
					}}
				>
					<div
						style={{
							height: `calc(100vh - ${heightHandle.height}px)`,
							padding: 60,
							paddingTop: 40,
							overflow: "auto",
						}}
						className="bg-offWhite"
					>
						<Card variant="outlined" sx={{ padding: 5, borderRadius: "12px" }}>
							<div>
								<div className="crow mb-6">
									<p className="subtitle fcolor-onyx">
										Total Items ({gridList.length})
									</p>
								</div>
								<div className="crow mb-6 sb">
									<div className="d-flex vc">
										<div className="mr-4">
											<SearchBar
												onChange={(e) => {
													serverActions.mutateState((p) => {
														p.query = e;
													});
												}}
											/>
										</div>
										<div>
											<SearchFilters options={[]} onItemClick={() => {}} />
										</div>
									</div>
									<div>
										<DefaultButton
											onClick={function (): void {
												const verdict = serverActions.validateSave();
												if (verdict) {
													serverActions.save(user);
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
											"item name",
											"cash margin",
											"online margin",
										]}
									>
										<RowStat
											colSpan={4}
											isEmpty={gridList.length === 0}
											asyncState={state.loading.save}
										>
											{gridList.map((v, i) => (
												<TableRow
													data={v}
													key={i}
													setCashValue={function (d: string): void {
														stateUtils.mutateState((p) => {
															p.data[i].cashMargin.value = d;
															if (p.data[i].cashMargin.hasChanged === false)
																p.data[i].cashMargin.hasChanged = true;
														});
													}}
													setOnlineValue={function (d: string): void {
														stateUtils.mutateState((p) => {
															p.data[i].onlineMargin.value = d;
															if (p.data[i].cashMargin.hasChanged === false)
																p.data[i].onlineMargin.hasChanged = true;
														});
													}}
												/>
											))}
										</RowStat>
									</DefaultGrid>
								</div>
							</div>
						</Card>
					</div>
				</ErrorBoundary>
			</LoadingBoundary>
		</div>
	);
}
