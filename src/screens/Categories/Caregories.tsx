import FilledScrollContainer from "@src/Components/common/Layout/FilledScrollContainer/FilledScrollContainer";
import TitleNavBar from "@src/Components/common/NavBar/TitleNavBar";
import LAYOUT_CONSTANTS from "@src/globals/constants/layout.constants";
import React from "react";

function Caregories() {
	return (
		<>
			<div>
				<TitleNavBar title={"Categories"} />
			</div>
			<FilledScrollContainer
				paddingTop={LAYOUT_CONSTANTS.NavBarBottomMargin}
				padding={LAYOUT_CONSTANTS.contentPadding}
			>
			</FilledScrollContainer>
		</>
	);
}

export default Caregories;
