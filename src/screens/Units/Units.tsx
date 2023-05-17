import DefaultGrid from "@src/Components/Grid/Grid/DefaultGrid/DefaultGrid";
import TitleNavBar from "@src/Components/common/NavBar/TitleNavBar";
import SearchBar from "@src/Components/common/SearchBar/SearchBar";
import SearchFilters from "@src/Components/common/SearchFilters/SearchFilters";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import React from "react";
import { Card } from "@mui/material";

interface Props {}

export default function Units(props: Props) {
	return (
		<div className="mx-6">
			<div className="w-full">
				<TitleNavBar title={"Manage Units"} />
			</div>
			<div className={"p-7"}>
				<Card variant="outlined" sx={{ padding: 5 }}>
					<div>
						<div className="crow mb-6">
							<p className="subtitle fcolor-onyx">Total Units</p>
						</div>
						<div className="crow mb-6 sb">
							<div className="d-flex vc">
								<SearchBar />
							</div>
							<div className="flex">
								<div className="mr-2">
									<DefaultButton
										onClick={function (): void {}}
										label={"save changes"}
									/>
								</div>
								<div>
									<DefaultButton
										onClick={function (): void {}}
										label={"add unit"}
									/>
								</div>
							</div>
						</div>
						<div>
							<DefaultGrid
								columns={[
									{
										name: "sr no",
										width: 80,
									},
									"unit name",
									"weight",
									"entry time",
									"category count",
									"product count",
									{ name: "", width: 50 },
								]}
							></DefaultGrid>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
