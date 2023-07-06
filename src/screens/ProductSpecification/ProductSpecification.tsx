import AssetIndex from "@src/assets/AssetIndex";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./ProductSpecification.module.css";
import useHeight from "@src/modules/hooks/useHeight";
import BackNavBar from "@src/Components/common/NavBar/BackNavBar";
import ImagePreview from "@src/Components/common/ImagePreview/ImagePreview";
import ProdSpecActions from "./managment/actions/ProductSpecificationAction";
import LoadingBoundary from "@src/Components/common/LoadingBoundary/LoadingBoundary";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import LoadingWidget from "@src/Components/widget/LoadingWidget/LoadingWidget";
import EditProduct from "@src/forms/EditProduct/EditProduct";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import DeleteEntity from "@src/Components/feedback/Alerts/DeleteEntity";
import AsyncProcessBoundary from "@src/Components/feedback/AsyncProcessBoundary/AsyncProcessBoundary";

const ProductSpecificationContext = React.createContext({});

function ProductSpecification() {
	const { ref, height } = useHeight();
	const [showForm, setShowForm] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();
	if (!id)
		return (
			<>
				<p className="text-xl">id not found</p>
			</>
		);
	const [state, setState] = useState<ProductSpecification.State>({
		productName: "",
		companyName: "",
		itemName: "",
		description: "",
		descriptionLabels: [],
		priceStructure: [],
		margin: { online: 0, cash: 0 },
		gst: { key: "", value: "" },
		images: [],
		loading: {
			fetch: AsyncStateFactory(),
			deleteCompanyProduct: AsyncStateFactory(),
		},
		category: {
			name: "",
			_id: "",
		},
		showDelete: false,
	});
	const prodSpecActions = new ProdSpecActions(state, setState);

	useEffect(() => {
		prodSpecActions.fetch(id as string);
	}, [refresh]);

	return (
		<LoadingBoundary
			asyncState={state.loading.fetch}
			loadingWidget={<LoadingWidget />}
		>
			<ProductSpecificationContext.Provider value={{}}>
				<div className={style.navContainer} ref={ref}>
					<BackNavBar title={"Category/Item/Company Product"} />
				</div>
				<div
					className={style.pageContainer + " bg-offWhite"}
					style={{
						height: `calc(100vh - ${height}px)`,
						padding: 80,
						paddingTop: 40,
					}}
				>
					<div className={style.headingRow + " mb-6 mt-5"}>
						<p className="h2 fcolor-fuschia">{state.productName}</p>
					</div>

					<div className="d-flex w-100 mb-5">
						<div className={style.col_1 + " mr-10"}>
							<div className="mb-6">
								<ImagePreview images={state.images} />
							</div>

							<div className={style.descriptionCard + " mb-6"}>
								<div className={style.descriptionBanner}>
									<div className={style.descriptionCell_Header}>
										<p className="fw-bold fcolor-light body">Price Structure</p>
									</div>
								</div>
								<div className={style.descriptionBody}>
									{state.priceStructure.map((v, i) => (
										<div className="crow sb" key={i}>
											<div className={""}>
												<p className="text-md font-bold text-slate-700 py-3">
													<span
														className={
															v.operation === "add"
																? "text-green-500"
																: "text-red-500"
														}
													>
														{v.operation === "add" ? "+" : "-"} {v.name}{" "}
														{v.type === "numeric" ? "(₹)" : "(%)"}
													</span>
												</p>
											</div>
											<div className={style.descriptionCell}>
												<p className="fw-medium fcolor-onyx body">
													{v.value} {v.type === "numeric" ? "₹" : "%"}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>

							<div className={style.descriptionCard + " mb-6"}>
								<div className={style.descriptionBanner}>
									<div className={style.descriptionCell}>
										<p className="fw-bold fcolor-light body">Margin</p>
									</div>
								</div>
								<div className={style.descriptionBody}>
									<div className="crow sb">
										<div className={style.descriptionCell}>
											<p className="fw-bold fcolor-text-subtitle body">
												Online
											</p>
										</div>
										<div className={style.descriptionCell}>
											<p className="fw-medium fcolor-onyx body">
												{state.margin.online} %
											</p>
										</div>
									</div>

									<div className="crow sb">
										<div className={style.descriptionCell}>
											<p className="fw-bold fcolor-text-subtitle body">Cash</p>
										</div>
										<div className={style.descriptionCell}>
											<p className="fw-medium fcolor-onyx body">
												{state.margin.cash} %
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
										<div className={""}>
											<p className="fw-bold fcolor-text-subtitle body">
												GST ({state.gst.key})
											</p>
										</div>
										<div className={style.descriptionCell}>
											<p className="fw-medium fcolor-onyx body">
												{state.gst.value}{" "}
												{state.gst.key === "numeric" ? "₹" : "%"}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className={style.col_2}>
							<div className="flex items-center mb-5">
								<div className="mr-6">
									<p className="pretitle fcolor-text-subtitle mb-2">PRODUCT</p>
									<p className="body fw-bold fcolor-text-body">
										{state.productName}
									</p>
								</div>
								<div className="flex items-center">
									<div className="mr-2">
										<RotateAndScale>
											<div onClick={() => setShowForm(true)}>
												<AssetIndex.EditSquare />
											</div>
										</RotateAndScale>
									</div>
									<RotateAndScale>
										<div
											onClick={() => {
												prodSpecActions.mutateState((p) => {
													p.showDelete = true;
												});
											}}
										>
											<AssetIndex.DeleteIcon />
										</div>
									</RotateAndScale>
								</div>
							</div>
							<div className={style.descriptionContainer + " mb-5"}>
								<p className="pretitle fcolor-text-subtitle mb-1">COMPANY</p>
								<p className="body fw-bold fcolor-text-body">
									{state.companyName}
								</p>
							</div>

							<div className={style.descriptionContainer + " mb-5"}>
								<p className="pretitle fcolor-text-subtitle mb-1">
									CATEGORY ITEM
								</p>
								<p className="body fw-bold fcolor-text-body">
									{state.productName}
								</p>
							</div>
							<div className={style.descriptionContainer + " mb-6"}>
								<p className="pretitle fcolor-text-subtitle mb-1">
									DESCRIPTION
								</p>
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
			{showForm && (
				<EditProduct
					onClose={function (): void {
						setShowForm(false);
					}}
					refresh={function (): void {
						setRefresh((p) => !p);
					}}
					id={id}
				/>
			)}
			{state.showDelete && (
				<AsyncProcessBoundary
					asyncStates={[state.loading.deleteCompanyProduct]}
					primaryAction={{
						onClick: () => {
							prodSpecActions.mutateState((p) => {
								p.showDelete = false;
							});
						},
						label: "Close",
					}}
				>
					<DeleteEntity
						config={{
							primaryAction: {
								label: "Confirm",
								onClick: () => {
									prodSpecActions.deleteCompanyProduct(id, () => {
										navigate(-1);
									});
								},
							},
							secondaryActions: {
								label: "Cancel",
								onClick: () => {
									prodSpecActions.mutateState((p) => {
										p.showDelete = false;
									});
								},
							},
						}}
						heading={"Delete Product"}
						subheading={
							"Do you confirm you want to delete this company product?"
						}
					/>
				</AsyncProcessBoundary>
			)}
		</LoadingBoundary>
	);
}

export default ProductSpecification;
