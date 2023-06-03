import useWidth from "@src/modules/hooks/useWidth";
import style from "./Company.module.css";
import React, { useEffect, useState } from "react";
import TitleNavBar from "@src/Components/common/NavBar/TitleNavBar";
import { Card } from "@mui/material";
import SearchBar from "@src/Components/common/SearchBar/SearchBar";
import SearchFilters from "@src/Components/common/SearchFilters/SearchFilters";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import { InitialState } from "./management/state/initialState";
import CompanyActions from "./management/actions/CompanyActions";
import Header from "@src/Components/Grid/Header/Header";
import RowStat from "@src/Components/Grid/RowStat/RowStat";
import TableRow from "./components/TableRow/TableRow";
import AddCompany from "@src/forms/AddCompany/AddCompany";
import { Link } from "react-router-dom";

function Company() {
	const widthService = useWidth();

	const [state, setState] = useState<Companies.State>(InitialState);
	const companyActions = new CompanyActions(state, setState);

	useEffect(() => {
		companyActions.fetchCompanyGridData();
	}, [state.refresh]);

	const companyList = companyActions.filterCompanylistRow();

	return (
		<>
			<div className={style.navContainer + " mb-4"}>
				<TitleNavBar title={"Company"} />
			</div>
			<div className={style.pageContainer + " bg-offWhite"}>
				<Card sx={{ padding: 4, borderRadius: "12px" }} variant="outlined">
					<div ref={widthService.ref}>
						<div className="crow sb mb-3">
							<div>
								<p className="subtitle fcolor-onyx">
									Companies({state.companyList.length})
								</p>
							</div>
							<div>
								<Link to={"/browseProducts"}>
									<DefaultButton
										onClick={() => {}}
										label={"$ change product price"}
									/>
								</Link>
							</div>
						</div>
						<div className="crow sb mb-6">
							<div className="vc">
								<div className="pr-2">
									<SearchBar
										onChange={(e) => {
											companyActions.setQuery(e);
										}}
									/>
								</div>
								<div>
									<SearchFilters options={[]} onItemClick={(e) => {}} />
								</div>
							</div>
							<div>
								<DefaultButton
									onClick={() => {
										companyActions.setFormVisibility(true);
									}}
									label={"+ add company"}
								/>
							</div>
						</div>

						<table className="w-full table-fixed">
							<Header
								columns={[
									{ name: "sr no", width: 100 },
									"company name",
									"price",
									"entry time",
									"number of products",
									{ name: "", width: 80 },
								]}
							/>
							<tbody>
								<RowStat
									colSpan={6}
									asyncState={state.loading.get}
									isEmpty={companyList.length === 0}
								>
									{companyList.map((v, i) => (
										<TableRow data={v} key={i} />
									))}
								</RowStat>
							</tbody>
						</table>
					</div>
				</Card>
				<div>
					{state.showAddCompanyForm && (
						<AddCompany
							close={function (): void {
								companyActions.setFormVisibility(false);
							}}
							refresh={function (): void {
								companyActions.refresh();
							}}
						/>
					)}
				</div>
			</div>
		</>
	);
}

export default Company;
