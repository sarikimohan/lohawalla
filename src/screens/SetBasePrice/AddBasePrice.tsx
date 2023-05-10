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

import SetBasePriceAction from "./managment/actions/SetBasePriceAction";
import { InitialState } from "./managment/state/initialState";

function AddBasePrice() {
	const widthService = useWidth();
	const [state, setState] = useState<SetBasePrice.State>(InitialState);
	const setBasePriceActions = new SetBasePriceAction(state, setState);

	useEffect(() => {
		setBasePriceActions.fetch();
	}, []);

	return (
		<>
			<div className={style.navContainer}>
				<TitleNavBar title={"Set Base Price"} />
			</div>
			<div className={style.pageContainer + " mt-5"}>
				<Card className="p-3 pt-5 mb-2" variant="outlined">
					<div ref={widthService.ref}>
						<div className="crow mb-3">
							<p className="subtitle fcolor-onyx">
								Total Products ({state.setList.length})
							</p>
						</div>
						<div className="crow mb-3 sb">
							<div className="d-flex vc">
								<div className="mr-2">
									<SearchBar
										onChange={(e) => setBasePriceActions.setQuery(e)}
									/>
								</div>
								<div>
									<SearchFilters options={[]} onItemClick={() => {}} />
								</div>
							</div>
							<div>
								<DefaultButton onClick={function (): void {}} label={"save"} />
							</div>
						</div>
						<div>
							<Grid<SetBasePrice.SetCompanyBasePrice>
								data={setBasePriceActions.filter()}
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
