import useWidth from "@src/modules/hooks/useWidth";
import style from "./Company.module.css";
import React, { useEffect, useState } from "react";
import TitleNavBar from "@src/Components/common/NavBar/TitleNavBar";
import { Card } from "@mui/material";
import SearchBar from "@src/Components/common/SearchBar/SearchBar";
import SearchFilters from "@src/Components/common/SearchFilters/SearchFilters";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import Grid from "@src/Components/common/Grid/Grid";
import { columnConfig } from "./configuration/CompanyGridConfig";
import BannerContainer from "@src/Components/common/BannerContainer/BannerContainer";
import RowContainer from "@src/Components/common/Grid/RowContainer.default";
import { InitialState } from "./management/state/initialState";
import CompanyActions from "./management/actions/CompanyActions";

function Company() {
	const widthService = useWidth();

	const [state, setState] = useState<Companies.State>(InitialState);
	const companyActions = new CompanyActions(state, setState);

	useEffect(() => {
		companyActions.fetchCompanyGridData();
	}, []);

	return (
		<>
			<div className={style.navContainer + " mb-4"}>
				<TitleNavBar title={"Company"} />
			</div>
			<div className={style.pageContainer}>
				<Card className="p-4">
					<div ref={widthService.ref}>
						<div className="crow sb mb-3">
							<div>
								<p className="subtitle fcolor-onyx">
									Companies({state.companyList.length})
								</p>
							</div>
							<div>
								{/* <DefaultButton
									onClick={() => {}}
									label={"change product price"}
								/> */}
							</div>
						</div>
						<div className="crow sb mb-3">
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
								<DefaultButton onClick={() => {}} label={"+ add company"} />
							</div>
						</div>

						<Grid<Companies.CompanyListRow>
							data={companyActions.filterCompanylistRow()}
							config={columnConfig}
							BannerContainer={(children) => (
								<BannerContainer>{children}</BannerContainer>
							)}
							RowContainer={RowContainer<Companies.CompanyListRow>}
							width={widthService.width}
							paddingLeft={32}
							paddingRight={32}
						/>
					</div>
				</Card>
			</div>
		</>
	);
}

export default Company;
