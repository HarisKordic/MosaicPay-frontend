"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
	Button,
	Grid,
	Typography,
	FormControl,
	FormHelperText,
	InputAdornment,
	IconButton,
} from "@mui/material";
import Image from "next/image";
import * as Yup from "yup";
import { VisibilityOff, Visibility } from "@mui/icons-material";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");
	const [validationErrors, setValidationErrors] = useState(Object);
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

	const handleEmailChange = (event: any) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: any) => {
		setPassword(event.target.value);
	};

	const handlePasswordRepeatChange = (event: any) => {
		setPasswordRepeat(event.target.value);
	};

	const handleShowPassword = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	const handleShowPasswordRepeat = () => {
		setShowPasswordRepeat((prevShowPasswordRepeat) => !prevShowPasswordRepeat);
	};

	const validateForm = async () => {
		const schema = Yup.object().shape({
			email: Yup.string().email("Invalid email").required("Email is required"),
			password: Yup.string()
				.min(8, "Password must be at least 8 characters")
				.required("Password is required"),
			passwordRepeat: Yup.string()
				.oneOf([Yup.ref("password")], "Passwords must match")
				.required("Repeat password is required"),
		});

		try {
			await schema.validate(
				{ email, password, passwordRepeat },
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
			console.log("Form submitted successfully");
		}
	};

	return (
		<FormControl component="form" onSubmit={handleSubmit} error>
			<Grid
				sx={{
					"& .MuiTextField-root": {
						m: 1,
						width: "auto",
						height: "100%",
						p: 0.5,
					},
				}}
				display={"flex"}
				justifyContent={"center"}
				flexDirection={"column"}
				flexWrap={"wrap"}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						borderRadius: "80%",
						overflow: "hidden",
						width: "400px",
						height: "200px",
						margin: "0 auto",
						mt: 2,
					}}
				>
					<Image
						src="/images/MosaicPay_logo.png"
						alt="Logo"
						width={200}
						height={200}
					/>
				</Box>
				<Box display={"flex"} justifyContent={"center"} sx={{ mt: 2 }}>
					<Typography variant="h5" component="h5">
						Sign up
					</Typography>
				</Box>

				<TextField
					id="email"
					name="email"
					label="Email"
					placeholder="email@example.com"
					variant="outlined"
					value={email}
					onChange={handleEmailChange}
					color="secondary"
					error={!!validationErrors.email} // Mark as error if validation error exists
				/>
				{validationErrors.email && (
					<FormHelperText>{validationErrors.email}</FormHelperText>
				)}
				<TextField
					id="password"
					name="password"
					label="Password"
					helperText="* Password should be at least 8 characters long. Use numbers, letters, special characters and capitals."
					variant="outlined"
					value={password}
					onChange={handlePasswordChange}
					color="secondary"
					type={showPassword ? "text" : "password"}
					error={!!validationErrors.password} // Mark as error if validation error exists
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={handleShowPassword}>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				{validationErrors.password && (
					<FormHelperText>{validationErrors.password}</FormHelperText>
				)}

				<TextField
					id="password-repeat"
					name="passwordRepeat"
					label="Repeat password"
					variant="outlined"
					value={passwordRepeat}
					onChange={handlePasswordRepeatChange}
					color="secondary"
					type={showPasswordRepeat ? "text" : "password"}
					error={!!validationErrors.passwordRepeat} // Mark as error if validation error exists
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={handleShowPasswordRepeat}>
									{showPasswordRepeat ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				{validationErrors.passwordRepeat && (
					<FormHelperText>{validationErrors.passwordRepeat}</FormHelperText>
				)}
				<Button
					sx={{ width: "50%", mr: "auto", ml: "auto" }}
					variant="contained"
					type="submit"
					color="secondary"
					onClick={handleSubmit}
				>
					Sign up
				</Button>
			</Grid>
		</FormControl>
	);
}
