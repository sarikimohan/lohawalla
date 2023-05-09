import React, { useEffect, useState } from "react";
import BackNavBar from "@src/Components/common/NavBar/BackNavBar";
import style from "./CategorySpecification.module.css";
import ImagePreview from "@src/Components/common/ImagePreview/ImagePreview";
import useWidth from "@src/modules/hooks/useWidth";
import Spacer from "@src/Components/common/Spacer/Spacer";
import Grid from "@src/Components/common/Grid/Grid";
import BannerContainer from "@src/Components/common/BannerContainer/BannerContainer";
import RowContainer from "@src/Components/common/Grid/RowContainer.default";
import useHeight from "@src/modules/hooks/useHeight";
import { useParams } from "react-router-dom";
import AssetIndex from "@src/assets/AssetIndex";
import { Card } from "@mui/material";
import { getColConfig } from "./configuration/ItemGridConfig";
import SpacingDiv from "@src/Components/common/Layout/SpacingDiv/SpacingDiv";
import SearchBar from "@src/Components/common/SearchBar/SearchBar";
import SearchFilters from "@src/Components/common/SearchFilters/SearchFilters";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import { InitialState } from "./management/state/InitialState";
import CategorySpecificationAction from "./management/actions/CategorySpecificationAction";
import { H2 } from "@src/Components/common/Typography/TypeStyles";

export const CategorySpecificationContext = React.createContext({});

function CategorySpecification() {
	const widthService = useWidth();
	const heightService = useHeight();
	const { id } = useParams();

	const [state, setState] = useState<CategorySpecification.State>(InitialState);
	const specActions = new CategorySpecificationAction(state, (p) =>
		setState(p)
	);

	useEffect(() => {
		specActions.fetchData(id as string);
	}, []);

	return (
		<CategorySpecificationContext.Provider value={{ label: "label" }}>
			<div ref={heightService.ref}>
				<BackNavBar title={"Category Specification"} />
			</div>
			<div
				style={{
					height: `calc(100vh - ${heightService.height}px)`,
					overflow: "auto",
					paddingTop: 40,
				}}
				className="p-7 pt-1"
			>
				<div className={style.headingRow + " mb-5"}>
					<H2>{state.categoryName}</H2>
				</div>

				<div className="d-flex w-100">
					<div className={style.col_1}>
						<div className="mb-2">
							<ImagePreview images={state.images} />
						</div>
						<div className={style.descriptionCard + " mb-3"}>
							<div className={style.descriptionBanner}>
								<div className={style.descriptionCell}>
									<p className="fw-bold fcolor-light body">Credit</p>
								</div>
							</div>
							<div className={style.descriptionBody}>
								{state.credits.map((val, index) => (
									<div className="crow sb" key={index}>
										<div className={style.descriptionCell}>
											<p className="fw-bold fcolor-text-subtitle body">
												{val.days} days
											</p>
										</div>
										<div className={style.descriptionCell}>
											<p className="fw-medium fcolor-onyx body">{val.value}%</p>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className={style.descriptionCard}>
							<div className={style.descriptionBanner}>
								<div className={style.descriptionCell}>
									<p className="fw-bold fcolor-light body">
										Negotiation Details
									</p>
								</div>
							</div>
							<div className={style.descriptionBody}>
								<div className="crow sb">
									<div className={style.descriptionCell}>
										<p className="fw-bold fcolor-text-subtitle body">
											Negotiation
										</p>
									</div>
									<div className={style.descriptionCell}>
										<p className="fw-medium fcolor-onyx body">
											{state.negotiation}%
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={style.col_2}>
						<div className="crow">
							<div className="mb-3" style={{ marginRight: 100 }}>
								<p className="pretitle fcolor-text-subtitle mb-1">CATEGORY</p>
								<p className="body fw-bold fcolor-text-body">
									{state.categoryName}
								</p>
							</div>
							<div>
								<AssetIndex.EditSquare />
							</div>
						</div>
						<div className={style.descriptionContainer + " mb-3"}>
							<p className="pretitle fcolor-text-subtitle mb-1">DESCRIPTION</p>
							<p className="body fw-medium fcolor-text-body">
								{state.description}
							</p>
						</div>

						<div className={style.descriptionCard}>
							<div className={style.descriptionBanner}>
								<div className={style.descriptionCell}>
									<p className="fw-bold fcolor-light body">Description</p>
								</div>
								<div className={style.descriptionCell}>
									<p className="fw-bold fcolor-light body">Data</p>
								</div>
							</div>
							<div className={style.descriptionBody}>
								{state.descriptionLabels.map((val, index) => (
									<div className="crow sb" key={index}>
										<div className={style.descriptionCell}>
											<p className="fw-bold fcolor-text-subtitle body">
												{val.key}
											</p>
										</div>
										<div className={style.descriptionCell}>
											<p className="fw-medium fcolor-onyx body">{val.value}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<Card className={style.cardContainer + " mb-8"} variant="outlined">
					<div ref={widthService.ref}>
						<p className="subtitle fcolor-onyx ">
							Items({state.itemList.length})
						</p>
						<Spacer height={40} />
						<SpacingDiv containerProps={{ className: "crow sb" }}>
							<div className="d-flex vc">
								<SpacingDiv marginRight={16}>
									<SearchBar
										onChange={(e) => {
											specActions.setQuery(e);
										}}
									/>
								</SpacingDiv>
								<div>
									<SearchFilters
										options={state.filter.filters}
										onItemClick={(e) => specActions.toggleFilter(e)}
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
						<Spacer height={24} />
						<Grid<CategorySpecification.ItemGridData>
							BannerContainer={(children) => (
								<BannerContainer width={widthService.width}>
									{children}
								</BannerContainer>
							)}
							RowContainer={RowContainer<CategorySpecification.ItemGridData>}
							width={widthService.width}
							paddingLeft={32}
							paddingRight={32}
							data={specActions.filterList()}
							config={id ? getColConfig(id, state.categoryName) : []}
						/>
					</div>
				</Card>
			</div>
		</CategorySpecificationContext.Provider>
	);
}

export default CategorySpecification;
