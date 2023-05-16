import { Card } from "@mui/material";
import DefaultGrid from "@src/Components/Grid/Grid/DefaultGrid/DefaultGrid";
import TitleNavBar from "@src/Components/common/NavBar/TitleNavBar";
import SearchBar from "@src/Components/common/SearchBar/SearchBar";
import SearchFilters from "@src/Components/common/SearchFilters/SearchFilters";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import React from "react";

interface Props {}

export default function CategoryNumberOfItems(props: Props) {
	return (
		<div className="mx-6">
			<div className="w-full">
				<TitleNavBar title={"Category / Number of Item"} />
			</div>
			<div className={"p-7"}>
				<Card variant="outlined" sx={{ padding: 5 }}>
					<div>
						<div className="crow mb-6">
							<p className="subtitle fcolor-onyx">Number Of Items ()</p>
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
								<div className="flex">
									<div className="mr-2">
										<DefaultButton
											onClick={function (): void {}}
											label={"view margin"}
										/>
									</div>
									<DefaultButton
										onClick={function (): void {}}
										label={"+ add items"}
									/>
								</div>
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
									"price",
									"no of companies",
									"active company",
									"inactive company",
								]}
							></DefaultGrid>
						</div>
					</div>
					<div className="mt-5 flex justify-end">
						<DefaultButton
							onClick={() => {}}
							label={"save"}
							defaultStyles={{
								container: { background: "var(--iris)" },
								text: { color: "#fff" },
							}}
						/>
					</div>
				</Card>
			</div>
		</div>
	);
}
