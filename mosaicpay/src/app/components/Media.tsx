import { Alert, Box, ImageList, ImageListItem } from "@mui/material";
import { useState } from "react";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import { postDocument } from "../api";

interface IProps {
	accountId: string;
	userId: string;
	url?: string;
	type: string;
}
export default function Media(props: IProps) {
	const [maxUploadNumReached, setMaxUploadNumReached] = useState(false);

	const [isSavingLoading, setIsSavingLoading] = useState(false);

	const handleFileUpload = async (event: any) => {
		console.log(event.target.files);
		uploadImages(event.target.files);
	};
	const uploadImages = async (file: any) => {
		setIsSavingLoading(true);

		try {
			let form = new FormData();
			form.append("url", file[0]);
			form.append("type", props.type);
			form.append("user", props.userId);
			form.append("account", props.accountId);
			const result = await postDocument(form);
			console.log(form);

			console.log(result);

			//location.reload();
		} catch (error: any) {
			if (error.response.status === 405) {
				setMaxUploadNumReached(true);
			}
		} finally {
			setIsSavingLoading(false);
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				flexWrap: "wrap",
			}}
		>
			{maxUploadNumReached ? (
				<Alert severity="error">Reached maximum of 10 files per product!</Alert>
			) : (
				<LoadingButton
					sx={{
						my: 1,
					}}
					loading={isSavingLoading}
					loadingPosition="start"
					startIcon={<UploadOutlinedIcon />}
					variant="outlined"
					component="label"
					color="secondary"
				>
					Upload media
					<input
						hidden
						accept=".jpeg, .jpg, .pdf"
						type="file"
						onChange={(e: any) => handleFileUpload(e)}
					/>
				</LoadingButton>
			)}
			<ImageList
				variant="quilted"
				sx={{
					p: 1,
					display: "flex",
					justifyContent: "center",
					flexWrap: "wrap",
				}}
			>
				<ImageListItem key={1}>
					<img
						src={
							"https://youthscape.ams3.cdn.digitaloceanspaces.com/images/16723620780107.remini-enhanced.jpg"
						}
						alt={"1"}
						loading="lazy"
					/>
				</ImageListItem>
			</ImageList>
		</Box>
	);
}
