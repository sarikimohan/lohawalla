import styled from "@emotion/styled";
import { TooltipProps, Tooltip, tooltipClasses } from "@mui/material";

const Tip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.arrow}`]: {
		color: "#000",
	},
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: "#000",
	},
}));

export default Tip;
