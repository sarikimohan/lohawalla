import { Card } from "@mui/material";
import DefaultGrid from "@src/Components/Grid/Grid/DefaultGrid/DefaultGrid";
import TitleNavBar from "@src/Components/common/NavBar/TitleNavBar";
import SearchBar from "@src/Components/common/SearchBar/SearchBar";
import SearchFilters from "@src/Components/common/SearchFilters/SearchFilters";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import React, { useState } from "react";
import TableRow from "./components/TableRow/TableRow";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

interface Props {}

export default function CategoryViewMargin(props: Props) {
	const [state, setState] = useState<CategoryViewMargin.State>({
		data: [
			{
				_id: "as;dfkjasdf",
				srNo: 1,
				itemName: {
					name: "8mm tmt bar",
					imageURL: "",
				},
				itemId: "",
				marginId: "",
				cashMargin: { value: "234", hasChanged: false },
				onlineMargin: { value: "525", hasChanged: false },
			},
		],
		loading: {},
	});

	const stateUtils = new StateUtils<CategoryViewMargin.State>(state, setState);

	console.log(state);

	return (
		<div className="mx-6">
			<div className="w-full">
				<TitleNavBar title={"Category / Number of Item/ View Margin"} />
			</div>
			<div className={"p-7"}>
				<Card variant="outlined" sx={{ padding: 5 }}>
					<div>
						<div className="crow mb-6">
							<p className="subtitle fcolor-onyx">Total Items ()</p>
						</div>
						<div className="crow mb-6 sb">
							<div className="d-flex vc">
								<div className="mr-4">
									<SearchBar onChange={(e) => {}} />
								</div>
								<div>
									<SearchFilters options={[]} onItemClick={() => {}} />
								</div>
							</div>
							<div>
								<DefaultButton
									onClick={function (): void {}}
									label={"save changes"}
								/>
							</div>
						</div>
						<div>
							<DefaultGrid
								columns={[
									{
										name: "sr no",
										width: 100,
									},
									"item name",
									"cash margin",
									"online margin",
								]}
							>
								{state.data.map((v, i) => (
									<TableRow
										data={v}
										key={i}
										setCashValue={function (d: string): void {
											stateUtils.mutateState((p) => {
												p.data[i].cashMargin.value = d;
												if (p.data[i].cashMargin.hasChanged === false)
													p.data[i].cashMargin.hasChanged = true;
											});
										}}
										setOnlineValue={function (d: string): void {
											stateUtils.mutateState((p) => {
												p.data[i].onlineMargin.value = d;
												if (p.data[i].cashMargin.hasChanged === false)
													p.data[i].onlineMargin.hasChanged = true;
											});
										}}
									/>
								))}
							</DefaultGrid>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
