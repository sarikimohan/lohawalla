import React from "react";
import { useNavigate } from "react-router-dom";
import { ImageIndex } from "@src/assets/AssetIndex";
import { motion } from "framer-motion";
import ImageNameContainer from "../components/ImageNameContainer/ImageNameContainer";
import NumberDisplay from "../components/NumberDisplay/NumberDisplay";

function BannerCell(name: string, width: number) {
	return (
		<p style={{ width, color: "var(--light)" }} className="pretitle">
			{name}
		</p>
	);
}

export const columnConfig: ColumnConfig<Categories.CategoryGridData>[] = [
	{
		name: "SR NO",
		index: 0,
		width: 150,
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
		name: "category name",
		index: 1,
		width: 250,
		growthOrder: 1,
		component: ImageNameContainer,
		bannerComponent: BannerCell,
	},
	{
		name: "category code",
		index: 2,
		width: 200,
		growthOrder: 1,
		component: (data, width) => (
			<p className="small fcolor-text-body fw-medium" style={{ width }}>
				{data.categoryCode}
			</p>
		),
		bannerComponent: BannerCell,
	},
	{
		name: "entry time",
		index: 3,
		width: 200,
		growthOrder: 1,
		component: (data, width) => (
			<p className="small fcolor-text-body fw-medium" style={{ width }}>
				{data.entryTime}
			</p>
		),
		bannerComponent: BannerCell,
	},
	{
		name: "no of items",
		index: 4,
		width: 100,
		growthOrder: 1,
		component: NumberDisplay,
		bannerComponent: BannerCell,
	},
	{
		name: "",
		index: 5,
		width: 100,
		growthOrder: 1,
		component: (data, width) => <div style={{ width }}></div>,
		bannerComponent: BannerCell,
	},
];
