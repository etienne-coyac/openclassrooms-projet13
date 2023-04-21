import axios, { AxiosInstance } from "axios";
import { LoginPayload, User } from "../types/types";

export default class Client {
  private baseURL: string;
  private _user?: User;
  private token?: string;
  axios: AxiosInstance;
  constructor(baseUrl: string) {
    this.baseURL = baseUrl;
    this.axios = axios.create({
      baseURL: this.baseURL
    });
  }

  async login(payload: LoginPayload): Promise<Client> {
    if (!!this._user || !!this.token) {
      throw new Error("User already logged in.");
    }
    const res = await axios.post<{ body: { token: string } }>(`${this.baseURL}/user/login`, payload); //TODO: type response (data and error)
    console.log(res.data.body.token);

    this.token = res.data.body.token;
    this.axios = axios.create({
      baseURL: this.baseURL,
      headers: { Authorization: this.token }
    });
    return this;
  }

  parse(string: string): Client {
    if (this.token !== undefined || this._user !== undefined) {
      throw new Error("User already logged in.");
    }
    const json = JSON.parse(string);
    if (json.token === undefined) {
      throw new Error("Invalid string.");
    }
    this.token = json.token;
    this._user = json.user;
    this.axios = axios.create({
      baseURL: this.baseURL,
      headers: { Authorization: this.token }
    });
    return this;
  }

  stringify(): string {
    if (!this.token) {
      throw new Error("User is not logged in.");
    }
    return JSON.stringify({
      token: this.token
    });
  }

  //   get profile() {
  //     async function get() {
  //         const res = await axios.post()
  //     }
  //   }
}
