"use client";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import AccountMenu from "../../src/app/components/AccountMenu";
import { Add } from "@mui/icons-material";
import MainCard from "@/app/components/MainCard";
import { useRouter } from "next/router";

export default function AccountsTransactions() {
	const router = useRouter();
	return (
		<Container disableGutters>
			<Box display={"flex"} justifyContent={"center"}>
				<AccountMenu></AccountMenu>
			</Box>
			<Grid
				display={"flex"}
				flexDirection={"column"}
				sx={{ width: "100%" }}
				justifyContent={"center"}
				padding={5}
			>
				<Box>
					<Typography
						variant="h6"
						component={"h6"}
						sx={{ textAlign: "center" }}
						fontWeight={"bold"}
					>
						Accounts & Transactions
					</Typography>
				</Box>
				<Box
					width={"100%"}
					padding={0}
					mt={5}
					sx={{
						maxHeight: "600px",
						overflowY: "auto",
					}}
				>
					<MainCard></MainCard>
					<MainCard></MainCard>
					<MainCard></MainCard>
				</Box>

				<Box
					display={"flex"}
					flexDirection={"row"}
					width={"100%"}
					justifyContent={"space-between"}
					mt={3}
					mb={3}
				>
					<IconButton
						aria-label="add-account"
						size="large"
						color="secondary"
						onClick={() => router.push("/new-account")}
					>
						<Add fontSize="inherit" />
						<Typography fontSize={14}>Add account</Typography>
					</IconButton>
					<IconButton
						aria-label="add-account"
						size="large"
						color="primary"
						onClick={() => router.push("/new-transaction")}
					>
						<Typography fontSize={14}>Add transaction</Typography>
						<Add fontSize="inherit" />
					</IconButton>
				</Box>
			</Grid>
		</Container>
	);
}
