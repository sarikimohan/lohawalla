import React, { useRef, useEffect } from "react";
import FormFileUpload from "@src/Components/forms/FormFileUpload/FormFileUpload";
import { useEditItemContext } from "../../EditItem";
import ValidatedEntry from "@src/Components/special/ValidatedEntry/ValidatedEntry";
import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import checkNameIsUnique from "../../fetch/services/checkNameIsUnique";
import checkCodeIsUnique from "../../fetch/services/checkCodeIsUnique";
import AssetIndex from "@src/assets/AssetIndex";
import Spacer from "@src/Components/common/Spacer/Spacer";
import ImageSmall from "@src/Components/common/ImageSmall/ImageSmall";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {}

export default function FirstPart(props: Props) {
	const { state, editItemFormActions: _, setHandle } = useEditItemContext();

	return (
		<div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Item Name</p>
				<ValidatedEntry
					onChange={(d) => {
						_.mutateState((p) => {
							p.itemName.setValue(d);
						});
					}}
					value={state.itemName.getValue()}
					validateFunction={(d) => {
						return FieldDataService.registerValidator(
							d,
							{ isValid: true },
							Validators.validateNull
						);
					}}
					placeHolder="enter item name"
					setHandle={setHandle("v1")}
					asyncValidator={(d) =>
						checkNameIsUnique(d, state.itemName.hasChanged())
					}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">
					Item HSN Code
				</p>
				<ValidatedEntry
					onChange={(d) => {
						_.mutateState((p) => {
							p.itemHSNCode = d;
						});
					}}
					value={state.itemHSNCode}
					validateFunction={(d) => {
						return FieldDataService.registerValidator(
							d,
							{ isValid: true },
							Validators.validateNull,
							Validators.validateInt
						);
					}}
					placeHolder="enter item HSN Code"
					setHandle={setHandle("v2")}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Item Code</p>
				<ValidatedEntry
					onChange={(d) => {
						_.mutateState((p) => {
							p.itemCode.setValue(d);
						});
					}}
					value={state.itemCode.getValue()}
					validateFunction={(d) => {
						return FieldDataService.registerValidator(
							d,
							{ isValid: true },
							Validators.validateNull
						);
					}}
					placeHolder="enter item name"
					setHandle={setHandle("v3")}
					asyncValidator={(d) =>
						checkCodeIsUnique(d, state.itemCode.hasChanged())
					}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Description</p>
				<ValidatedEntry
					onChange={(d) => {
						_.mutateState((p) => {
							p.description = d;
						});
					}}
					value={state.description}
					validateFunction={(d) => {
						return FieldDataService.registerValidator(
							d,
							{ isValid: true },
							Validators.validateNull
						);
					}}
					placeHolder="enter item name"
					setHandle={setHandle("v4")}
				/>
			</div>

			<div className="border p-4 rounded-md">
				<div className="crow">
					{state.images.map((v, i) => (
						<div
							className="ml-3"
							onClick={() => {
								_.mutateState((p) => {
									p.images[i].deleted = true;
								});
							}}
							style={{ display: v.deleted ? "none" : "block" }}
							key={v.link}
						>
							<div
								style={{
									position: "relative",
								}}
							>
								<ImageSmall
									index={0}
									src={v.link}
									key={v.link}
									currentSelected={0}
									setSelected={function (): void {}}
								/>
								<motion.div
									className="flex justify-center items-center cursor-pointer"
									animate={{ color: "#ff0000" }}
									transition={{ duration: 0.1 }}
									style={{
										position: "absolute",
										width: "100%",
										height: "100%",
										background: "white",
										opacity: 0,
										zIndex: 200,
										top: 0,
										left: 0,
									}}
									whileHover={{
										opacity: 0.8,
										scale: 1.05,
										border: "1px solid lightgrey",
										borderRadius: 6,
									}}
								>
									<DeleteIcon />
								</motion.div>
							</div>
						</div>
					))}
				</div>
			</div>

			<Spacer height={20} />
			<div className="vc w-100">
				<p className="h3 fcolor-text-body fw-bold mr-4">
					Upload a Photo of Category
				</p>
				<AssetIndex.LinkIcon />
			</div>
			<Spacer height={16} />
			<div className="mb-5">
				<FormFileUpload
					values={state.imageFiles}
					onChange={(e) => {
						_.mutateState((p) => {
							p.imageFiles = e;
						});
					}}
				/>
			</div>
		</div>
	);
}
