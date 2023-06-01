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

export const columnConfig: ColumnConfig<ItemSpecification.CompanyProduct>[] = [
	{
		name: "SR NO",
		index: 0,
		width: 120,
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
		width: 150,
		growthOrder: 1,
		isWidthFixed: false,
		component: (data, width) => {
			const navigate = useNavigate();
			return (
				<div
					style={{ width }}
					className="vc cursor-pointer"
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
								data.company.imageURL === ""
									? ImageIndex.CategoryImage
									: data.company.imageURL
							}
							style={{ height: "100%", width: "100%" }}
						/>
					</div>
					<p className="small fcolor-text-body fw-medium ml-2">
						{data.company.name}
					</p>
				</div>
			);
		},
		bannerComponent: BannerCell,
	},
	{
		name: "company product name",
		index: 2,
		width: 210,
		growthOrder: 1,
		component: (data, width) => (
			<p className="small fcolor-text-body fw-medium" style={{ width }}>
				{data.productName}
			</p>
		),
		bannerComponent: BannerCell,
		isWidthFixed: false,
	},
	{
		name: "entry time",
		index: 2,
		width: 210,
		growthOrder: 1,
		component: (data, width) => (
			<p className="small fcolor-text-body fw-medium" style={{ width }}>
				{data.entryTime}
			</p>
		),
		bannerComponent: BannerCell,
		isWidthFixed: false,
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
