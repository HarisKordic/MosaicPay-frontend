"use client";

import {
	Alert,
	Box,
	Button,
	FormControl,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import { Cancel, Delete, Garage, Save, Upload } from "@mui/icons-material";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { deleteAccount, getAccount, getUser } from "../../src/app/api";
import { useRouter } from "next/router";
import AccountInfoCard from "@/app/components/AccountInfoCard";

export default function NewAccount() {
	const router = useRouter();
	const { accountId } = router.query;

	const [accountName, setAccountName] = useState("");
	const [balance, setBalance] = useState("");
	const [validationErrors, setValidationErrors] = useState(Object);
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");

	const getAccountData = async () => {
		//@ts-ignore
		const accountData = await getAccount(Number.parseInt(accountId));
		return accountData;
	};
	let data: dtoAccount;
	const setStates = async () => {
		try {
			if (accountId) data = await getAccountData();
			setAccountName(data?.name);
			setBalance(data?.balance.toString());
		} catch (error) {
			router.push("/404");
		}
	};

	useEffect(() => {
		setStates();
	}, [accountId]);

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
		const inputValue = event.target.value;
		if (inputValue !== data?.name) {
			setAccountName(inputValue);
		}
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
				const user: any = await getUser();
				let account: dtoAccountUpdate = {
					name: accountName,
					balance: Number.parseFloat(balance),
				};
				//@ts-ignore
				await putNewAccount(Number.parseInt(accountId), account);
				setShowAlert(true);
				setAlertMessage("Account successfuly updated!");
				setStates();
				return;
			} catch (error) {}
		}
	};

	const handleDelete = async () => {
		try {
			await deleteAccount(accountId);
			setShowAlert(true);
			setAlertMessage("Account is successfuly deleted!");
		} catch (error) {}
	};

	const fileData = {
		img: "https://youthscape.ams3.cdn.digitaloceanspaces.com/images/16723620780107.remini-enhanced.jpg",
	};

	return (
		<Grid
			display="flex"
			flexDirection="column"
			width="100%"
			height="100%"
			justifyContent="center"
			padding-top={5}
		>
			<Box
				margin={2}
				pb={3}
				width={"100%"}
				display={"flex"}
				flexDirection={"row"}
				justifyContent={"center"}
			>
				<AccountInfoCard
					balance={balance}
					date={new Date().toDateString()}
				></AccountInfoCard>
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
					onChange={(e: any) => {
						handleAccountNameChange(e);
					}}
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
						Upload/change file
					</Typography>
					<Upload fontSize="large" color="secondary"></Upload>
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
					{alertMessage}
				</Alert>
				<Box display={"flex"} justifyContent={"space-between"} sx={{ mt: 10 }}>
					<Button
						startIcon={<Save></Save>}
						color="secondary"
						variant="outlined"
						onClick={handleSubmit}
					>
						Save
					</Button>
					<Button
						startIcon={<Delete></Delete>}
						color="secondary"
						variant="outlined"
						onClick={() => handleDelete()}
					>
						Delete
					</Button>
				</Box>
			</Box>
		</Grid>
	);
}
