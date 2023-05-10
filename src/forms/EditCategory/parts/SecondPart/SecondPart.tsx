import { Card } from "@mui/material";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import React from "react";

interface Props {}

export default function SecondPart(props: Props) {
	return (
		<Card variant="outlined" sx={{ padding: 3 }}>
			<div className="mb-44">
				<FormCardHeader heading="Credit Working" subheading="Enter" />
			</div>
      <Card variant="outlined" sx={{ padding: 3 }}>
        
      </Card>
		</Card>
	);
}
