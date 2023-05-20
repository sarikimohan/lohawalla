import React from "react";
import Button from "./components/Button/Button";
import Container from "./components/Container/Container";

interface GrouppedButtonProps {
	labels: string[];
	currentSelected: number;
	setCurrentSelected: (index: number) => void;
}

function GrouppedButton(p: GrouppedButtonProps) {
	return (
		<Container>
			{p.labels.map((val, index) => (
				<Button
					text={val}
					key={index}
					isActive={index === p.currentSelected}
					onClick={() => p.setCurrentSelected(index)}
				/>
			))}
		</Container>
	);
}

export default GrouppedButton;
