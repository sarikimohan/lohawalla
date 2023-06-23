import FormFileUpload from "@src/Components/forms/FormFileUpload/FormFileUpload";
import React from "react";
import ValidatedEntry from "@src/Components/special/ValidatedEntry/ValidatedEntry";
import { Groups, useEditCompanyContext } from "../../EditCompany";
import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import AssetIndex from "@src/assets/AssetIndex";
import ImageSmall from "@src/Components/common/ImageSmall/ImageSmall";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import DefaultFormLabel from "@src/Components/forms/FormLabel/DefaultFormLabel";
import checkIsNameUnique from "@src/forms/AddCompany/fetch/services/checkIsNameUnique";

function FirstPart() {
	const { setHandle, state, stateUtils } = useEditCompanyContext();
	return (
		<div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">
					Company Name
				</p>
				<ValidatedEntry
					type={"text"}
					placeHolder={"enter company name"}
					setHandle={setHandle(Groups.plain, "name")}
					validateFunction={FieldDataService.clubValidators(
						Validators.validateNull
					)}
					value={state.companyName.getValue()}
					onChange={(d) => {
						stateUtils.mutateState((p) => {
							p.companyName.setValue(d);
						});
					}}
					asyncValidator={async (d) => {
						if (!state.companyName.hasChanged()) return undefined;
						const res = await checkIsNameUnique(d);
						if (!res.data) {
							return "name " + d + " already exists";
						}
					}}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Description</p>
				<ValidatedEntry
					type="text"
					placeHolder="enter description"
					setHandle={setHandle(Groups.plain, "description")}
					value={state.description}
					onChange={(d) => {
						stateUtils.mutateState((p) => {
							p.description = d;
						});
					}}
					validateFunction={Validators.validateNull}
				/>
			</div>

			<div className="mb-4">
				<DefaultFormLabel>Delete Images</DefaultFormLabel>
				<div className="border p-4 rounded-md">
					<div className="crow">
						{state.images.map((v, i) => (
							<div
								className="ml-3"
								onClick={() => {
									stateUtils.mutateState((p) => {
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
			</div>

			<div className="mb-5">
				<div className="vc w-100 mb-3">
					<p className="h3 fcolor-text-body fw-bold mr-4">
						Upload a Photo of Company
					</p>
					<AssetIndex.LinkIcon />
				</div>
				<FormFileUpload
					values={state.imageFiles}
					onChange={(e) => {
						stateUtils.mutateState((p) => {
							p.imageFiles = e;
						});
					}}
				/>
			</div>
		</div>
	);
}

export default FirstPart;
