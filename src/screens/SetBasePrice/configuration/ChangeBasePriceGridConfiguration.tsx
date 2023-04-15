import React from "react";
import { useNavigate } from "react-router-dom";
import { ImageIndex } from "@src/assets/AssetIndex";
import Input from "@src/Components/common/inputs/Input";

function BannerCell(name: string, width: number) {
	return (
		<p style={{ width, color: "var(--light)" }} className="pretitle">
			{name}
		</p>
	);
}

export const columnConfig: ColumnConfig<SetBasePrice.SetCompanyBasePrice>[] = [
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
		name: "company name",
		index: 1,
		width: 250,
		growthOrder: 1,
		component: (data, width) => {
			const navigate = useNavigate();
			return (
				<div
					style={{ width }}
					className="vc cursor-pointer"
					onClick={() => navigate(`/company/${data.companyName._id}`)}
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
								data.companyName.imageURL === ""
									? ImageIndex.CategoryImage
									: data.companyName.imageURL
							}
							style={{ height: "100%", width: "100%", objectFit: "cover" }}
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
		name: "cost",
		index: 2,
		width: 200,
		growthOrder: 1,
		component: (data, width) => {
			return (
				<div style={{ width }}>
					<Input
						width={""}
						error={{
							hasError: false,
							errorMessage: "",
						}}
						isValid={false}
						setData={function (e: string): void {
							throw new Error("Function not implemented.");
						}}
						data={""}
						type={"number"}
						placeHolder={"enter value"}
					/>
				</div>
			);
		},
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
];
