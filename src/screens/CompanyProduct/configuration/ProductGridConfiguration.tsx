import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImageIndex } from "@src/assets/AssetIndex";

function BannerCell(name: string, width: number) {
	return (
		<p
			style={{ width, color: "var(--light)", textAlign: "center" }}
			className="pretitle"
		>
			{name}
		</p>
	);
}

export const columnConfig: ColumnConfig<CompanyProducts.CompanyProduct>[] = [
	{
		name: "SR NO",
		index: 0,
		width: 100,
		isWidthFixed: true,
		growthOrder: 1,
		component: (data, width) => (
			<div style={{ width }} className="hc">
				<p className="small fcolor-text-body fw-medium">{data.srNo}</p>
			</div>
		),
		bannerComponent: BannerCell,
	},
	{
		name: "company",
		index: 1,
		width: 200,
		growthOrder: 1,
		component: (data, width) => {
			const navigate = useNavigate();
			return (
				<div
					style={{ width }}
					className="vc hc cursor-pointer group"
					onClick={() => navigate(`/categories/product/${data._id}`)}
				>
					<div
						style={{
							height: 32,
							width: 32,
							borderRadius: 200,
							overflow: "hidden",
							objectFit: "cover",
							objectPosition: "center center",
						}}
					>
						<img
							src={
								data.companyName.imageURL
									? data.companyName.imageURL
									: ImageIndex.CategoryImage
							}
							style={{ height: "100%", width: "100%" }}
						/>
					</div>
					<p className="small fcolor-text-body fw-medium ml-2 group-hover:font-bold ">
						{data.companyName.name}
					</p>
				</div>
			);
		},
		bannerComponent: BannerCell,
		// isWidthFixed: true
	},
	{
		name: "company product name",
		index: 2,
		width: 300,
		growthOrder: 1,
		component: (data, width) => {
			const navigate = useNavigate();
			return (
				<p
					className="small fcolor-text-body fw-medium hover:font-bold cursor-pointer"
					style={{ width }}
					onClick={() => navigate(`/categories/product/${data._id}`)}
				>
					{data.ProductName}
				</p>
			);
		},
		bannerComponent: BannerCell,
		isWidthFixed: true,
	},
	{
		name: "view pricing",
		index: 3,
		width: 100,
		growthOrder: 1,
		component: (data, width) => (
			<div className="hc cursor-pointer group" style={{ width }}>
				<Link to={"/priceCalculation/" + data._id}>
					<p className="body fcolor-iris w-fit group-hover:font-bold">
						View Price
					</p>
				</Link>
			</div>
		),
		bannerComponent: BannerCell,
	},
];

export {};
