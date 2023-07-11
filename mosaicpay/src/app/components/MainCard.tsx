import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardHeader, Chip, IconButton } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useRouter } from "next/router";

interface IProps {
	accountName: string;
	transactionAmount: string;
	transactionType: string;
	transactionState: string;
	transactionId: string;
	accountId: string;
}

export default function MainCard(props: IProps) {
	var items = ["https://mui.com/static/images/cards/contemplative-reptile.jpg"];
	const router = useRouter();
	function Item(props: any) {
		return <CardMedia component="img" height="140" image={props.item} />;
	}

	return (
		<Card sx={{ maxWidth: 400, width: "100%", mb: 3 }}>
			<CardHeader
				title={props.accountName || "Account name"}
				subheader={props.transactionState || "Draft"}
			></CardHeader>
			<Carousel>
				{items.map((item, i) => (
					<Item key={i} item={item} />
				))}
			</Carousel>

			<CardContent>
				<Typography variant="body2" color="text.secondary">
					Amount: {props.transactionAmount || "1000"} {" $"}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Transaction type:{" "}
					{props.transactionType === "D" ? (
						<Chip size="small" color="primary" label="Debit"></Chip>
					) : (
						<Chip
							size="small"
							variant="outlined"
							color="secondary"
							label="Credit"
						></Chip>
					)}
				</Typography>
				<Typography variant="body2" color="text.secondary"></Typography>
			</CardContent>
			<CardActions>
				<Box
					display={"flex"}
					flexDirection={"row"}
					width={"100%"}
					justifyContent={"space-between"}
				>
					<IconButton
						onClick={() => router.push(`/edit-account/${props.accountId}`)}
						aria-label="add-account"
						size="large"
						color="secondary"
					>
						<Typography fontSize={14}>View account</Typography>
					</IconButton>
					<IconButton
						onClick={() =>
							router.push(`/edit-transaction/${props.transactionId}`)
						}
						aria-label="add-account"
						size="large"
						color="primary"
					>
						<Typography fontSize={14}>View transaction</Typography>
					</IconButton>
				</Box>
			</CardActions>
		</Card>
	);
}
