import * as axios from "axios";
import {getToken} from "../utils/authentication"


export default class Api {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = process.env.REACT_APP_API_ENDPOINT;
  }

  init = () => {
    this.api_token = getToken();

    let headers = {
      Accept: "application/json",
    };

    if (this.api_token) {
      headers.Authorization = `Bearer ${this.api_token}`;
    }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    return this.client;
  };

  register = (data) => {
    return this.init().post("/register/", data);
  };

  login = (data) => {
    return this.init().post("/login/", data);
  };

}