import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
	<Box
		component="span"
		sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
	>
		•
	</Box>
);

interface IAccountInfoCardProps {
	balance: number;
	date: string;
}
export default function AccountInfoCard(props: IAccountInfoCardProps) {
	return (
		<Card elevation={14}>
			<CardContent>
				<Typography
					sx={{ fontSize: 14, mb: 2, textAlign: "center" }}
					color="text.secondary"
				>
					Balance
				</Typography>
				<Typography sx={{ mb: 4 }} variant="h5" component="div">
					{props.balance || "no current information" + " $"}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					{props.date || "no date information"}
				</Typography>
			</CardContent>
		</Card>
	);
}
