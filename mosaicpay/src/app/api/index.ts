//TODO FETCH ROOT ROUTE FROM ENV

import axios from "axios";
import { dtoRegister } from "../dtos/dtoRegistser";
import { dtoLogin } from "../dtos/dtoLogin";

const rootRoute = "http://localhost:8000/";

export const register = (dtoRegister: dtoRegister) =>
	axios.post(`${rootRoute}auth/register`, dtoRegister).then((res) => res.data);

export const login = (dtoLogin: dtoLogin) =>
	axios.post(`${rootRoute}auth/login`, dtoLogin).then((res) => res.data);

export const getUserAccounts = async () =>
	await axios
		.get(`${rootRoute}account/`, { withCredentials: true })
		.then((res) => res.data);
