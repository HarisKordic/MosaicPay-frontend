//TODO FETCH ROOT ROUTE FROM ENV

import axios from "axios";
import { dtoRegister } from "../dtos/dtoRegistser";
import { dtoLogin } from "../dtos/dtoLogin";

const rootRoute = "http://localhost:8000/";

export const register = (dtoRegister: dtoRegister) =>
	axios.post(`${rootRoute}auth/register`, dtoRegister).then((res) => res.data);

export const login = (dtoLogin: dtoLogin) =>
	axios.post(`${rootRoute}auth/login`, dtoLogin).then((res) => res.data);

export const getUserAccounts = () =>
	axios
		.get(`${rootRoute}account/`, { withCredentials: true })
		.then((res) => res.data);

export const getAccount = (accountId: number) =>
	axios
		.get(`${rootRoute}account/${accountId}`, { withCredentials: true })
		.then((res) => res.data);

export const postNewAccount = (dtoAccount: dtoAccount) =>
	axios
		.post(`${rootRoute}account/`, dtoAccount, { withCredentials: true })
		.then((res) => res.data);

export const putNewAccount = (
	accountId: number,
	dtoAccountUpdate: dtoAccountUpdate
) =>
	axios
		.put(`${rootRoute}account/${accountId}/`, dtoAccountUpdate, {
			withCredentials: true,
		})
		.then((res) => res.data);

export const getUser = () =>
	axios
		.get(`${rootRoute}auth/get-user`, { withCredentials: true })
		.then((res) => res.data);

export const postNewTransaction = (dtoTransaction: dtoTransaction) =>
	axios
		.post(`${rootRoute}transaction/`, dtoTransaction, {
			withCredentials: true,
		})
		.then((res: any) => res.data);
