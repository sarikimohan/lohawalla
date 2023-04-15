import FilledScrollContainer from "@src/Components/common/Layout/FilledScrollContainer/FilledScrollContainer";
import TitleNavBar from "@src/Components/common/NavBar/TitleNavBar";
import LAYOUT_CONSTANTS from "@src/globals/constants/layout.constants";
import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { Subtitle } from "@src/Components/common/Typography/TypeStyles";
import SpacingDiv from "@src/Components/common/Layout/SpacingDiv/SpacingDiv";
import SearchBar from "@src/Components/common/SearchBar/SearchBar";
import SearchFilters from "@src/Components/common/SearchFilters/SearchFilters";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import Grid from "@src/Components/common/Grid/Grid";
import { columnConfig } from "./configurations/GridColumnConfig";
import useWidth from "@src/modules/hooks/useWidth";
import BannerContainer from "@src/Components/common/BannerContainer/BannerContainer";
import RowContainer from "@src/Components/common/Grid/RowContainer.default";
import { InitialState } from "./management/state/InitialState";
import CategoryActions from "./management/actions/CategoryActions";

function Categories() {
	const widthService = useWidth();

	const [state, setState] = useState<Categories.State>(InitialState);
	const categoryAction = new CategoryActions(state, (s) => setState(s));

	useEffect(() => {
		categoryAction.fetchCategoryGridData();
	}, []);

	return (
		<>
			<div>
				<TitleNavBar title={"Categories"} />
			</div>
			<FilledScrollContainer
				paddingTop={LAYOUT_CONSTANTS.NavBarBottomMargin}
				padding={LAYOUT_CONSTANTS.contentPadding}
			>
				<Card variant="outlined" sx={{ padding: 4 }}>
					<SpacingDiv marginBottom={24}>
						<Subtitle>
							Category({categoryAction.getCategoryGridData().length})
						</Subtitle>
					</SpacingDiv>
					<SpacingDiv
						containerProps={{ className: "crow sb" }}
						marginBottom={24}
					>
						<div className="d-flex vc">
							<SpacingDiv marginRight={16}>
								<SearchBar
									onChange={(e) => {
										categoryAction.setQuery(e);
									}}
								/>
							</SpacingDiv>
							<div>
								<SearchFilters
									options={categoryAction.getOptions()}
									onItemClick={(e) => categoryAction.toggleFilter(e)}
								/>
							</div>
						</div>
						<div>
							<DefaultButton
								onClick={function (): void {}}
								label={"+ ADD CATEGORY"}
							/>
						</div>
					</SpacingDiv>
					<div ref={widthService.ref}>
						<Grid<Categories.CategoryGridData>
							data={categoryAction.filterCategoryData()}
							config={columnConfig}
							width={widthService.width}
							BannerContainer={(children) => (
								<BannerContainer width={widthService.width}>
									{children}
								</BannerContainer>
							)}
							RowContainer={RowContainer<Categories.CategoryGridData>}
							paddingLeft={32}
							paddingRight={32}
						/>
					</div>
				</Card>
			</FilledScrollContainer>
		</>
	);
}

export default Categories;
