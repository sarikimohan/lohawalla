import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./CompanySpecification.module.css";
import { columnConfig } from "./configuration/ProductGridConfiguration";
import AssetIndex from "@src/assets/AssetIndex";
import useWidth from "@src/modules/hooks/useWidth";
import useHeight from "@src/modules/hooks/useHeight";
import BackNavBar from "@src/Components/common/NavBar/BackNavBar";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import ImagePreview from "@src/Components/common/ImagePreview/ImagePreview";
import SearchBar from "@src/Components/common/SearchBar/SearchBar";
import SearchFilters from "@src/Components/common/SearchFilters/SearchFilters";
import Grid from "@src/Components/common/Grid/Grid";
import BannerContainer from "@src/Components/common/BannerContainer/BannerContainer";
import RowContainer from "@src/Components/common/Grid/RowContainer.default";
import { Card } from "@mui/material";
import CompanySpecActions from "./managment/actions/CompanySpecificationAction";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import AddProductForm from "@src/forms/AddProduct/AddProductForm";

const CompanySpecificationContext = React.createContext({});

function CompanySpecification() {
	const { ref, height } = useHeight();
	const widthService = useWidth();
	const { id } = useParams();

	if (!id) return <p className="text-xl">no id found for company</p>;

	const [state, setState] = useState<CompanySpecification.State>({
		companyName: "",
		description: "",
		descriptionLabels: [],
		priceStructure: [],
		companyList: [],
		filter: {
			query: "",
			filters: [],
		},
		images: [],
		loading: {
			fetch: AsyncStateFactory(),
		},
		refresh: true,
		show: false,
	});
	const companySpecActions = new CompanySpecActions(state, setState);

	useEffect(() => {
		companySpecActions.fetch(id as string);
	}, []);

	useEffect(() => {
		companySpecActions.fetchAllCompanyItem(id as string);
	}, [state.refresh]);

	return (
		<CompanySpecificationContext.Provider value={{}}>
			<div className={style.navContainer} ref={ref}>
				<BackNavBar title={"Comapny / Company Specifications"} />
			</div>
			<div
				className={style.pageContainer}
				style={{ height: `calc(100vh - ${height}px)` }}
			>
				<div className={style.headingRow + " mb-8 mt-3"}>
					<p className="h2 fcolor-fuschia">{state.companyName}</p>
				</div>
				<div className={"crow mb-5 mt-3 sb"}>
					<p className="h2 fcolor-fuschia">About</p>
					<Link
						to={`/browseProducts?companyId=${id}&companyName=${state.companyName}`}
					>
						<DefaultButton onClick={() => {}} label={"change product price"} />
					</Link>
				</div>

				<div className="d-flex w-100 mb-3">
					<div className={style.col_1}>
						<div className="mb-2">
							<ImagePreview images={state.images} />
						</div>

						<div className={style.descriptionCard + " mb-3"}>
							<div className={style.descriptionBanner}>
								<div className={style.descriptionCell_Header}>
									<p className="fw-bold fcolor-light body">Price Structure</p>
								</div>
							</div>
							<div className={style.descriptionBody}>
								{state.priceStructure
									.sort((a, b) => a.position - b.position)
									.map((val, index) => (
										<div className="crow sb" key={index}>
											<div className={style.descriptionCell}>
												<p className="fw-bold fcolor-text-subtitle body">
													{val.operation === "add" ? "+" : "-"} {val.name}
													{val.type === "percentage" && "%"}
												</p>
											</div>
											<div className={style.descriptionCell}>
												<p className="fw-medium fcolor-onyx body">
													{val.value === -1 ? "custom" : val.value}
												</p>
											</div>
										</div>
									))}
							</div>
						</div>
					</div>
					<div className={style.col_2}>
						<div className="crow">
							<div className="mb-3 mr-5">
								<p className="pretitle fcolor-text-subtitle mb-1">COMPANY</p>
								<p className="body fw-bold fcolor-text-body">
									{state.companyName}
								</p>
							</div>
							<div onClick={() => {}}>
								<AssetIndex.EditSquare />
							</div>
						</div>
						{/* <div className={style.descriptionContainer + " mb-3"}>
							<p className="pretitle fcolor-text-subtitle mb-1">TYPE</p>
							<p className="body fw-bold fcolor-text-body">STEEL INDUSTRY</p>
						</div> */}
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

				<Card className="p-3 w-100 mb-8" variant="outlined">
					<div ref={widthService.ref}>
						<div className="crow mb-3">
							<p className="subtitle fcolor-onyx">
								Company Products ({state.companyList.length})
							</p>
						</div>
						<div className="crow sb mb-3">
							<div className="vc">
								<div className="pr-2">
									<SearchBar
										onChange={(e) => {
											companySpecActions.setQuery(e);
										}}
									/>
								</div>
								<div>
									<SearchFilters options={[]} onItemClick={(e) => {}} />
								</div>
							</div>
							<DefaultButton
								onClick={() => {
									companySpecActions.mutateState((p) => {
										p.show = true;
									});
								}}
								label={"+ add company product"}
							/>
						</div>
						<Grid<CompanySpecification.CompanyProduct>
							data={companySpecActions.filter()}
							config={columnConfig}
							BannerContainer={(children) => (
								<BannerContainer>{children}</BannerContainer>
							)}
							RowContainer={RowContainer<CompanySpecification.CompanyProduct>}
							width={widthService.width}
							paddingLeft={32}
							paddingRight={32}
						/>
					</div>
				</Card>
			</div>
			{state.show && (
				<AddProductForm
					close={function (): void {
						companySpecActions.mutateState((p) => {
							p.show = false;
						});
					}}
					refresh={function (): void {
						companySpecActions.mutateState((p) => {
							p.refresh = !p.refresh;
						});
					}}
					selected={{
						company: {
							_id: id,
							name: state.companyName,
						},
					}}
				/>
			)}
		</CompanySpecificationContext.Provider>
	);
}

export default React.memo(CompanySpecification);
