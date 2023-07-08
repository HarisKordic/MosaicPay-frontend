//TODO FETCH ROOT ROUTE FROM ENV

import axios from "axios";
import { dtoRegister } from "../dtos/dtoRegistser";

const rootRoute = "http://localhost:8000/";

export const register = (dtoRegister: dtoRegister) =>
	axios.post(`${rootRoute}auth/register`, dtoRegister).then((res) => res.data);
