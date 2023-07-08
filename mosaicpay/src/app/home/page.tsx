"use client";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import BasicCard from "../components/BasicCard";

export default function Home() {
	return (
		<Grid
			display={"flex"}
			flexDirection={"column"}
			width={"100%"}
			padding={10}
			justifyContent={"center"}
		>
			<Box
				sx={{
					"& > :not(style)": {
						width: "100%",
					},
					mb: 3,
				}}
			>
				<Typography variant="h4" component={"h4"} fontWeight={"bold"}>
					Hello, Amanda
				</Typography>
			</Box>
			<Box sx={{ mb: 5 }}>
				<BasicCard></BasicCard>
			</Box>
			<Box
				sx={{
					"& > :not(style)": {
						width: "100%",
					},
				}}
			>
				<Paper
					sx={{ height: "200px", width: "100%" }}
					elevation={15}
					variant="elevation"
					children={
						<Grid
							display={"flex"}
							flexDirection={"column"}
							width={"100%"}
							height={"100%"}
							justifyContent={"center"}
						>
							<Box width={"100%"} height={"100%"}></Box>
							<Box
								display={"flex"}
								flexDirection={"row"}
								justifyContent={"space-around"}
							>
								<Image
									src="/images/MosaicPay_logo.png"
									alt="Logo"
									width={50}
									height={50}
								/>
								<Image
									src="/images/MosaicPay_logo.png"
									alt="Logo"
									width={50}
									height={50}
								/>
							</Box>
							<Box
								display={"flex"}
								flexDirection={"column"}
								justifyContent={"flex-end"}
								height={"100%"}
								sx={{ padding: "10px" }}
							>
								<Typography component={"p"} fontWeight={"bold"}>
									Accounts & Transactions
								</Typography>
							</Box>
						</Grid>
					}
				/>
			</Box>
		</Grid>
	);
}
