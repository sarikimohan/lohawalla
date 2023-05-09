import AssetIndex from "@src/assets/AssetIndex";
import React, { useEffect, useState } from "react";
import style from "./FormFileUpload.module.css";
import Spacer from "@src/Components/common/Spacer/Spacer";
import ImageSmall from "@src/Components/common/ImageSmall/ImageSmall";

type UploadResponse = { Location: string }[];
interface FormFileUploadProps {
	onUploadStart?: () => void;
	onUploadEnd?: (data: UploadResponse) => void;
	onError?: (err: Error) => void;
	onChange?: (data: File[] | null) => void;
}

function FormFileUpload(props: FormFileUploadProps) {
	type FileSelectionState = { file: File; status: boolean };
	const [fileSelection, setFileSelection] = useState<
		FileSelectionState[] | null
	>(null);

	const removeImage = (f: File) => {
		const fileList: FileSelectionState[] = [];
		if (fileSelection) {
			for (let i = 0; i < fileSelection.length; ++i) {
				if (fileSelection[i].status === false) continue;
				if (fileSelection[i].file.name !== f.name) {
					fileList.push({ file: fileSelection[i].file, status: true });
				} else {
					fileList.push({ file: fileSelection[i].file, status: false });
				}
			}
			props.onChange && props.onChange(fileList.map((v) => v.file));
			setFileSelection(fileList);
		}
	};

	const setImageFiles = (files: FileList | null) => {
		if (files === null) return;
		const arr: File[] = [];
		for (let i = 0; i < files.length; ++i) {
			arr.push(files[i]);
		}
		props.onChange && props.onChange(arr);
		setFileSelection(arr.map((v) => ({ file: v, status: true })));
	};

	return (
		<div>
			<div className="mb-5">
				<p className="h3 text-slate-700">Upload a Photo of Item</p>
			</div>
			<div className={style.fileUploadContainer}>
				<div className={style.uploadBox}>
					<div className="vc flex-dir-col">
						<AssetIndex.ImageFileIcon />
						<Spacer height={12} />
						<p className="body fcolor-text-body">Select File</p>
					</div>
					<input
						type="file"
						accept=".jpg, .png"
						className={style.fileInput}
						onChange={(e) => {
							setImageFiles(e.target.files);
						}}
						name={"lhw-image"}
						multiple
					/>
				</div>
				{fileSelection && (
					<div className={"crow"}>
						{fileSelection.map((v, i) => (
							<div
								className="p-1"
								style={{
									position: "relative",
									display: v.status ? "block" : "none",
								}}
								key={i}
							>
								<ImageSmall
									index={i}
									src={URL.createObjectURL(v.file)}
									currentSelected={i}
									setSelected={function (): void {
										removeImage(v.file);
									}}
									sideLength={66}
								/>
								<div
									style={{
										position: "absolute",
										top: 0,
										right: 0,
										transform: "scale(0.8)",
										cursor: "pointer",
									}}
									onClick={() => {
										removeImage(v.file);
									}}
								>
									<AssetIndex.MinusCircleIcon />
								</div>
							</div>
						))}
					</div>
				)}
				<Spacer height={16} />
			</div>
		</div>
	);
}

export default FormFileUpload;
