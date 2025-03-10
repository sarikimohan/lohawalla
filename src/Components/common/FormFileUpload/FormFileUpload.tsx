import AssetIndex from "@src/assets/AssetIndex";
import React, { useEffect, useState } from "react";
import style from "./FormFileUpload.module.css";
import ImageSmall from "@src/Components/common/ImageSmall/ImageSmall";
import Spacer from "@src/Components/common/Spacer/Spacer";

type UploadResponse = { Location: string }[];
interface FormFileUploadProps {
	values?: File[] | null;
	onUploadStart?: () => void;
	onUploadEnd?: (data: UploadResponse) => void;
	onError?: (err: Error) => void;
	onChange?: (data: File[] | null) => void;
}

function FormFileUpload(props: FormFileUploadProps) {
	type FileSelectionState = { file: File; status: boolean };

	const getStateFromProps = (): FileSelectionState[] | null => {
		if (props.values) {
			return props.values.map((v) => ({ file: v, status: true }));
		} else {
			return null;
		}
	};

	const [fileSelection, setFileSelection] = useState<
		FileSelectionState[] | null
	>(getStateFromProps());

	useEffect(() => {
		setFileSelection(getStateFromProps());
	}, [props.values && props.values.length, props.values]);

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
			props.onChange &&
				props.onChange(fileList.filter((v) => v.status).map((v) => v.file));
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
	);
}

export default React.memo(FormFileUpload);
