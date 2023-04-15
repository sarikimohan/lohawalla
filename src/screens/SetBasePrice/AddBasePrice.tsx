import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "./AddBasePrice.module.css";
import { columnConfig } from "./configuration/ChangeBasePriceGridConfiguration";
import TitleNavBar from "@src/Components/common/NavBar/TitleNavBar";
import SearchBar from "@src/Components/common/SearchBar/SearchBar";
import SearchFilters from "@src/Components/common/SearchFilters/SearchFilters";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import Grid from "@src/Components/common/Grid/Grid";
import BannerContainer from "@src/Components/common/BannerContainer/BannerContainer";
import RowContainer from "@src/Components/common/Grid/RowContainer.default";
import useWidth from "@src/modules/hooks/useWidth";

function AddBasePrice() {
	const widthService = useWidth();

	return (
		<>
			<div className={style.navContainer}>
				<TitleNavBar title={"Set Base Price"} />
			</div>
			<div className={style.pageContainer + " mt-5"}>
				<Card className="p-3 pt-5 mb-2" variant="outlined">
					<div ref={widthService.ref}>
						<div className="crow mb-3">
							<p className="subtitle fcolor-onyx">Total Products ({})</p>
						</div>
						<div className="crow mb-3 sb">
							<div className="d-flex vc">
								<div className="mr-2">
									<SearchBar />
								</div>
								<div>
									<SearchFilters options={[]} onItemClick={() => {}} />
								</div>
							</div>
							<div>
								{/* FIXME set loading states */}
								<DefaultButton
									onClick={function (): void {
										throw new Error("Function not implemented.");
									}}
									label={"save"}
								/>
							</div>
						</div>
						<div>
							<Grid<SetBasePrice.SetCompanyBasePrice>
								data={[]}
								config={columnConfig}
								BannerContainer={(children) => (
									<BannerContainer width={widthService.width}>
										{children}
									</BannerContainer>
								)}
								RowContainer={RowContainer<SetBasePrice.SetCompanyBasePrice>}
								width={widthService.width}
								paddingLeft={32}
								paddingRight={32}
							/>
						</div>
					</div>
				</Card>
			</div>
		</>
	);
}

export default AddBasePrice;
