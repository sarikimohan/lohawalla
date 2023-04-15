import AssetIndex, { ImageIndex } from "@src/assets/AssetIndex";
import React, { useEffect, useState } from "react";
import style from "./ItemSpecification.module.css";
import { useParams, useSearchParams } from "react-router-dom";
import useWidth from "@src/modules/hooks/useWidth";
import useHeight from "@src/modules/hooks/useHeight";
import BackNavBar from "@src/Components/common/NavBar/BackNavBar";
import ImagePreview from "@src/Components/common/ImagePreview/ImagePreview";
import Spacer from "@src/Components/common/Spacer/Spacer";
import { Card } from "@mui/material";
import Grid from "@src/Components/common/Grid/Grid";
import BannerContainer from "@src/Components/common/BannerContainer/BannerContainer";
import RowContainer from "@src/Components/common/Grid/RowContainer.default";
import { columnConfig } from "./configuration/CompanyProductGridConfig";

const ItemSpecificationContext = React.createContext({});

function ItemSpecification() {
	const widthService = useWidth();
	const { ref, height } = useHeight();
	const [formVisibility, setFormVisibility] = useState(false);
	const { pid } = useParams();
	const searchParams = useSearchParams()[0];
	const [refresh, setRefresh] = useState(false);
	const [showEditForm, setShowEditForm] = useState(false);

	return (
		<ItemSpecificationContext.Provider value={{}}>
			<div className={style.navContainer + " mb-3"} ref={ref}>
				<BackNavBar title={"Category/Item"} />
			</div>
			<div
				className={style.pageContainer}
				style={{ height: `calc(100vh - ${height}px)` }}
			>
				<div className={style.headingRow + " mb-3 mt-3"}>
					<p className="header-2 fcolor-fuschia">{}</p>
				</div>

				<div className="d-flex w-100 mb-5">
					<div className={style.col_1}>
						<div className="mb-2">
							<ImagePreview images={[]} />
						</div>
						<div className={style.descriptionCard + " mb-3"}>
							<div className={style.descriptionBanner}>
								<div className={style.descriptionCell}>
									<p className="fw-bold fcolor-light body">Margin</p>
								</div>
							</div>
							<div className={style.descriptionBody}>
								<div className="crow sb">
									<div className={style.descriptionCell}>
										<p className="fw-bold fcolor-text-subtitle body">Online</p>
									</div>
									<div className={style.descriptionCell}>
										<p className="fw-medium fcolor-onyx body">{}</p>
									</div>
								</div>

								<div className="crow sb">
									<div className={style.descriptionCell}>
										<p className="fw-bold fcolor-text-subtitle body">Cash</p>
									</div>
									<div className={style.descriptionCell}>
										<p className="fw-medium fcolor-onyx body">{}</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className={style.col_2}>
						<div className="crow">
							<div className="mb-3" style={{ marginRight: 100 }}>
								<p className="pretitle fcolor-text-subtitle mb-1">CATEGORY</p>
								<p className="body fw-bold fcolor-text-body">{}</p>
							</div>
							<div onClick={() => setShowEditForm(true)}>
								<AssetIndex.EditSquare />
							</div>
						</div>
						<div className={style.descriptionContainer + " mb-3"}>
							<p className="pretitle fcolor-text-subtitle mb-1">DESCRIPTION</p>
							<p className="body fw-medium fcolor-text-body">{}</p>
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
								{[].map((val, index) => (
									<div className="crow sb" key={index}>
										<div className={style.descriptionCell}>
											<p className="fw-bold fcolor-text-subtitle body">
												{val}
											</p>
										</div>
										<div className={style.descriptionCell}>
											<p className="fw-medium fcolor-onyx body">{val}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<Card className={style.cardContainer + " mb-8"}>
					<div ref={widthService.ref}>
						<p className="subtitle fcolor-onyx ">Company Products ({})</p>
						<Spacer height={40} />

						<Spacer height={24} />
						<Grid<ItemSpecification.CompanyProduct>
							BannerContainer={(children) => {
								return (
									<BannerContainer width={widthService.width}>
										{children}
									</BannerContainer>
								);
							}}
							RowContainer={RowContainer<ItemSpecification.CompanyProduct>}
							width={widthService.width}
							paddingLeft={32}
							paddingRight={32}
							data={[]}
							config={columnConfig}
						/>
					</div>
				</Card>
			</div>
		</ItemSpecificationContext.Provider>
	);
}

export default ItemSpecification;
