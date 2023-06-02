import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImageIndex } from "@src/assets/AssetIndex";

function BannerCell(name: string, width: number) {
	return (
		<p style={{ width, color: "var(--light)" }} className="pretitle">
			{name}
		</p>
	);
}

export const columnConfig: ColumnConfig<CompanyProducts.CompanyProduct>[] = [
	{
		name: "SR NO",
		index: 0,
		width: 200,
		isWidthFixed: true,
		growthOrder: 1,
		component: (data, width) => (
			<div style={{ width }}>
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
			console.log(data);
			return (
				<div
					style={{ width }}
					className="vc cursor-pointer"
					onClick={() => navigate(`/category/product/${data._id}`)}
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
					<p className="small fcolor-text-body fw-medium ml-2">
						{data.companyName.name}
					</p>
				</div>
			);
		},
		bannerComponent: BannerCell,
	},
	{
		name: "company product name",
		index: 2,
		width: 300,
		growthOrder: 1,
		component: (data, width) => (
			<p className="small fcolor-text-body fw-medium" style={{ width }}>
				{data.ProductName}
			</p>
		),
		bannerComponent: BannerCell,
	},
	{
		name: "",
		index: 3,
		width: 100,
		growthOrder: 1,
		component: (data, width) => (
			<Link to={"/priceCalculation/" + data._id}>
				<div style={{ width }} className="cursor-pointer">
					<p className="body fcolor-iris">View Price</p>
				</div>
			</Link>
		),
		bannerComponent: BannerCell,
	},
];

export {};
