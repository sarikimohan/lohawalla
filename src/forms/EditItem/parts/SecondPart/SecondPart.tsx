import { Card, Tooltip } from "@mui/material";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import Tip from "@src/Components/feedback/Tooltip/Tip";
import { useEditItemContext } from "../../EditItem";
import ValidatedEntry from "@src/Components/special/ValidatedEntry/ValidatedEntry";
import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";

interface Props {}

export default function SecondPart(props: Props) {
	const { state, editItemFormActions: _ } = useEditItemContext();
	return (
		<>
			<Card variant="outlined" sx={{ padding: 3 }}>
				<div className="mb-4">
					<FormCardHeader heading="Margin Working" subheading="Enter" />
				</div>
				<Card variant="outlined" sx={{ padding: 3 }}>
					<div className="mb-4">
						<p className="text-md font-bold">Margin</p>
					</div>
					<table className="w-full table-fixed">
						<thead
							className="bg-slate-100 h-10 border-b border-slate-400"
							style={{ boxSizing: "border-box" }}
						>
							<tr className="px-4 py-2 rounded-md">
								<th style={{ borderTopLeftRadius: 8 }}>
									<p className="text-md font-semibold text-slate-500">
										Time (Day)
									</p>
								</th>
								<th style={{ borderTopRightRadius: 8 }}>
									<p className="text-md font-semibold text-slate-500 ">
										Percentage
									</p>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="mb-2 border-b">
								<td align="center">
									<Tip title={"enter values in percentage"}>
										<p className="text-md font-bold text-slate-700	py-4">
											Online
										</p>
									</Tip>
								</td>
								<td align="center" className="">
									<ValidatedEntry
										onChange={(d) => {
											_.mutateState((p) => {
												p.margin.online = d;
											});
										}}
										value={state.margin.online}
										triggerValidation={state.triggerSubmit}
										validateFunction={(d) => {
											return FieldDataService.registerValidator(
												d,
												{ isValid: true },
												Validators.validateNull,
												Validators.validateFloat,
												(d) => Validators.max(d, 100),
												(d) => Validators.min(d, 0)
											);
										}}
										placeholder="enter online"
										onValidation={_.setValidation(4)}
									/>
								</td>
							</tr>
							<tr className="mb-2 border-b">
								<td align="center">
									<Tip title={"enter values in percentage"}>
										<p className="text-md font-bold text-slate-700 py-5">
											Cash
										</p>
									</Tip>
								</td>
								<td align="center">
									<ValidatedEntry
										onChange={(d) => {
											_.mutateState((p) => {
												p.margin.cash = d;
											});
										}}
										value={state.margin.cash}
										triggerValidation={state.triggerSubmit}
										validateFunction={(d) => {
											return FieldDataService.registerValidator(
												d,
												{ isValid: true },
												Validators.validateNull,
												Validators.validateFloat,
												(d) => Validators.max(d, 100),
												(d) => Validators.min(d, 0)
											);
										}}
										placeholder="enter cash"
										onValidation={_.setValidation(5)}
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</Card>
			</Card>
		</>
	);
}
