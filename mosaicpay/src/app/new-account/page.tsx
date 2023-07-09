"use client";

import { Box, Button, Grid, Icon, TextField, Typography } from "@mui/material";
import {
	AccessAlarm,
	Cancel,
	Save,
	ThreeDRotation,
	Upload,
} from "@mui/icons-material";

export default function NewAccount() {
	const itemData: any = {
		img: "https://youthscape.ams3.cdn.digitaloceanspaces.com/images/16723620780107.remini-enhanced.jpg",
	};

	return (
		<Grid
			display={"flex"}
			flexDirection={"column"}
			width={"100%"}
			height={"100%"}
			justifyContent={"center"}
			padding={5}
		>
			<Box>
				<Typography variant="h4" component={"h4"} sx={{ textAlign: "center" }}>
					Add account
				</Typography>
			</Box>
			<Box width={"100%"} padding={2}>
				<TextField
					sx={{ mb: 2 }}
					fullWidth
					id="account-name"
					name="account-name"
					label="Account name"
					placeholder="Savings account"
					variant="outlined"
					color="secondary"
				/>

				<TextField
					sx={{ mb: 2 }}
					fullWidth
					id="balance"
					name="balance"
					placeholder="784578.45"
					label="Balance"
					variant="outlined"
					color="secondary"
				/>
				<Box width={"100%"} sx={{ mt: 5 }}>
					<img
						width={"100%"}
						height={"100%"}
						src={`${itemData.img}`}
						alt={itemData.title}
						loading="lazy"
					/>
				</Box>
				<Box display={"flex"} justifyContent={"space-between"} sx={{ mt: 5 }}>
					<Typography variant="h6" component={"h6"}>
						Upload file
					</Typography>
					<Upload fontSize="large" color="secondary"></Upload>
				</Box>
				<Box display={"flex"} justifyContent={"space-between"} sx={{ mt: 10 }}>
					<Button
						startIcon={<Save></Save>}
						color="secondary"
						variant="outlined"
					>
						Save
					</Button>
					<Button
						startIcon={<Cancel></Cancel>}
						color="secondary"
						variant="outlined"
					>
						Cancel
					</Button>
				</Box>
			</Box>
		</Grid>
	);
}
