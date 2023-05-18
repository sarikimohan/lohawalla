import AssetIndex from "@src/assets/AssetIndex";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./ProductSpecification.module.css";
import useHeight from "@src/modules/hooks/useHeight";
import BackNavBar from "@src/Components/common/NavBar/BackNavBar";
import ImagePreview from "@src/Components/common/ImagePreview/ImagePreview";
import { InitialState } from "./managment/state/initialState";
import ProdSpecActions from "./managment/actions/ProductSpecificationAction";

const ProductSpecificationContext = React.createContext({});

function ProductSpecification() {
	const { ref, height } = useHeight();
	const [showForm, setShowForm] = useState(false);
	const { id } = useParams();
	const [state, setState] = useState<ProductSpecification.State>(InitialState);
	const prodSpecActions = new ProdSpecActions(state, setState);

	useEffect(() => {
		prodSpecActions.fetch(id as string);
	}, []);
	
	return (
		<ProductSpecificationContext.Provider value={{}}>
			<div className={style.navContainer} ref={ref}>
				<BackNavBar title={"Category/Item/Company Product"} />
			</div>
			<div
				className={style.pageContainer}
				style={{ height: `calc(100vh - ${height}px)` }}
			>
				<div className={style.headingRow + " mb-6 mt-5"}>
					<p className="h2 fcolor-fuschia">{state.productName}</p>
				</div>

				<div className="d-flex w-100 mb-5">
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
								{state.priceStructure.map((v, i) => (
									<div className="crow sb" key={i}>
										<div className={style.descriptionCell}>
											<p className="fw-bold fcolor-text-subtitle body">
												{v.name}
											</p>
										</div>
										<div className={style.descriptionCell}>
											<p className="fw-medium fcolor-onyx body">{v.value}</p>
										</div>
									</div>
								))}
							</div>
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
										<p className="fw-medium fcolor-onyx body">
											{state.margin.online}
										</p>
									</div>
								</div>

								<div className="crow sb">
									<div className={style.descriptionCell}>
										<p className="fw-bold fcolor-text-subtitle body">Cash</p>
									</div>
									<div className={style.descriptionCell}>
										<p className="fw-medium fcolor-onyx body">
											{state.margin.cash}
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className={style.descriptionCard}>
							<div className={style.descriptionBanner}>
								<div className={style.descriptionCell_Header}>
									<p className="fw-bold fcolor-light body">GST Details</p>
								</div>
							</div>
							<div className={style.descriptionBody}>
								<div className="crow sb">
									<div className={style.descriptionCell}>
										<p className="fw-bold fcolor-text-subtitle body">
											{state.gst.key}
										</p>
									</div>
									<div className={style.descriptionCell}>
										<p className="fw-medium fcolor-onyx body">
											{state.gst.value}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={style.col_2}>
						<div className="crow">
							<div className="mb-3">
								<p className="pretitle fcolor-text-subtitle mb-1">PRODUCT</p>
								<p className="body fw-bold fcolor-text-body">
									{state.productName}
								</p>
							</div>
							<div onClick={() => setShowForm(true)}>
								<AssetIndex.EditSquare />
							</div>
						</div>
						<div className={style.descriptionContainer + " mb-3"}>
							<p className="pretitle fcolor-text-subtitle mb-1">COMPANY</p>
							<p className="body fw-bold fcolor-text-body">
								{state.companyName}
							</p>
						</div>
						<div className={style.descriptionContainer + " mb-3"}>
							<p className="pretitle fcolor-text-subtitle mb-1">
								CATEGORY ITEM
							</p>
							<p className="body fw-bold fcolor-text-body">{}</p>
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
								{state.descriptionLabels.map((v, i) => (
									<div className="crow sb" key={i}>
										<div className={style.descriptionCell}>
											<p className="fw-bold fcolor-text-subtitle body">
												{v.key}
											</p>
										</div>
										<div className={style.descriptionCell}>
											<p className="fw-medium fcolor-onyx body">{v.value}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</ProductSpecificationContext.Provider>
	);
}

export default ProductSpecification;
