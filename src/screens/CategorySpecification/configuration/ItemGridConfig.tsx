import React from "react";
import { useNavigate } from "react-router-dom";
import { ImageIndex } from "@src/assets/AssetIndex";

function BannerCell(name: string, width: number) {
	return (
		<p style={{ width, color: "var(--light)" }} className="pretitle">
			{name}
		</p>
	);
}

export function getColConfig(categoryId: string, categoryName: string) {
	const columnConfig: ColumnConfig<CategorySpecification.ItemGridData>[] = [
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
			name: "item name",
			index: 1,
			width: 250,
			growthOrder: 1,
			component: (data, width) => {
				const navigate = useNavigate();
				return (
					<div
						style={{ width }}
						className="vc cursor-pointer"
						onClick={() =>
							navigate(
								`/categories/item/${data._id}?categoryId=${categoryId}&categoryName=${categoryName}`
							)
						}
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
									data.itemName.imageURL === ""
										? ImageIndex.CategoryImage
										: data.itemName.imageURL
								}
								style={{ height: "100%", width: "100%" }}
							/>
						</div>
						<p className="small fcolor-text-body fw-medium ml-2">
							{data.itemName.name}
						</p>
					</div>
				);
			},
			bannerComponent: BannerCell,
		},
		{
			name: "item code",
			index: 2,
			width: 150,
			growthOrder: 1,
			component: (data, width) => (
				<p className="small fcolor-text-body fw-medium" style={{ width }}>
					{data.itemCode}
				</p>
			),
			bannerComponent: BannerCell,
		},
		{
			name: "entry time",
			index: 3,
			width: 180,
			growthOrder: 1,
			component: (data, width) => (
				<p className="small fcolor-text-body fw-medium" style={{ width }}>
					{data.entryTime}
				</p>
			),
			bannerComponent: BannerCell,
		},
		{
			name: "",
			index: 4,
			width: 100,
			growthOrder: 1,
			component: (data, width) => <div style={{ width }}></div>,
			bannerComponent: BannerCell,
		},
	];
	return columnConfig;
}
export {};
