"use client";

import {
	Alert,
	Box,
	Button,
	Container,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import { Cancel, Save, Upload } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as yup from "yup";
import { getUser, postNewAccount } from "../../src/app/api";
import AccountMenu from "@/app/components/AccountMenu";

export default function NewAccount() {
	const router = useRouter();
	const [accountName, setAccountName] = useState("");
	const [balance, setBalance] = useState("");
	const [validationErrors, setValidationErrors] = useState(Object);
	const [showAlert, setShowAlert] = useState(false);

	const validationSchema = yup.object().shape({
		accountName: yup
			.string()
			.required("Account name is required")
			.max(255, "Maximum length of the account name is 255 characters")
			.min(5, "Minimum length of the account name is 5"),
		balance: yup
			.number()
			.typeError("Balance must be a number")
			.required("Balance is required"),
	});

	const handleAccountNameChange = (event: any) => {
		setAccountName(event.target.value);
	};

	const handleBalanceChange = (event: any) => {
		setBalance(event.target.value);
	};

	const validateForm = async (): Promise<boolean> => {
		try {
			await validationSchema.validate(
				{ accountName, balance },
				{ abortEarly: false }
			);
			setValidationErrors({});
			return true;
		} catch (error: any) {
			const errors = {};
			error.inner.forEach((err: any) => {
				//@ts-ignore
				errors[err.path] = err.message;
			});
			setValidationErrors(errors);
			return false;
		}
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		if (await validateForm()) {
			try {
				const user = await getUser();
				let account: dtoAccount = {
					name: accountName,
					balance: Number.parseFloat(balance),
					user: user?.user_id,
				};
				await postNewAccount(account);
				setShowAlert(true);

				setTimeout(() => {
					router.push("/home");
				}, 2000);
			} catch (error) {}
		}
	};

	const fileData = {
		img: "https://youthscape.ams3.cdn.digitaloceanspaces.com/images/16723620780107.remini-enhanced.jpg",
	};

	return (
		<Container disableGutters>
			<Box display={"flex"} justifyContent={"center"} mb={3}>
				<AccountMenu></AccountMenu>
			</Box>
			<Grid
				display="flex"
				flexDirection="column"
				width="100%"
				height="100%"
				justifyContent="center"
			>
				<Box>
					<Typography
						variant="h4"
						component="h4"
						mb={3}
						sx={{ textAlign: "center" }}
					>
						Add account
					</Typography>
				</Box>
				<Box width="100%" padding={2}>
					<TextField
						sx={{ mb: 2 }}
						fullWidth
						id="account-name"
						name="accountName"
						label="Account name"
						placeholder="Savings account"
						variant="outlined"
						color="secondary"
						value={accountName}
						onChange={handleAccountNameChange}
						error={!!validationErrors.accountName}
						helperText={validationErrors.accountName}
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
						value={balance}
						onChange={handleBalanceChange}
						error={!!validationErrors.balance}
						helperText={validationErrors.balance}
					/>

					<Box width={"100%"} sx={{ mt: 5 }}>
						<img
							width={"100%"}
							height={"100%"}
							src={`${fileData.img}`}
							//alt={//fileData.title}
							loading="lazy"
						/>
					</Box>
					<Box display={"flex"} justifyContent={"space-between"} sx={{ mt: 5 }}>
						<Typography variant="h6" component={"h6"}>
							Upload file
						</Typography>
						<Upload fontSize="large" color="secondary"></Upload>
					</Box>
					<Box
						display={"flex"}
						justifyContent={"space-between"}
						sx={{ mt: 10 }}
					>
						<Button
							startIcon={<Save></Save>}
							color="secondary"
							variant="outlined"
							onClick={handleSubmit}
						>
							Save
						</Button>
						<Button
							startIcon={<Cancel></Cancel>}
							color="secondary"
							variant="outlined"
							onClick={() => router.push("/home")}
						>
							Cancel
						</Button>
					</Box>
				</Box>
				<Alert
					sx={{ mt: 5, display: showAlert ? "flex" : "none" }}
					action={
						<Button
							color="success"
							size="small"
							onClick={() => setShowAlert(false)}
						>
							X
						</Button>
					}
					onClose={() => setShowAlert(false)}
					severity="success"
				>
					Account successfuly created!
				</Alert>
			</Grid>
		</Container>
	);
}
