import confg from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(confg.appWriteUrl)
            .setProject(confg.appWriteProjectId);

        this.account = new Account(this.client);
    }


    async createUserAccount({name, email, password}) {

        

        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.loginUser({email, password});
            }
            else return userAccount;

        }
        catch (error) {
            console.log("Appwrite serive :: createUserAccount :: error", typeof(error) === 'object' ? error.message : error);

        }


    }

    async getCurrentUser() {

        try {
            const currentUsers = await this.account.get();

            return currentUsers;

        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", typeof(error) === 'object' ? error.message : error);
        }

    }


    async logoutUser() {
        try {
            await this.account.deleteSessions();

        } catch (error) {
            console.log("Appwrite serive :: logoutUser :: error", typeof(error) === 'object' ? error.message : error);
        }

    }


    async loginUser({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password)

        } catch (error) {
             console.log("Appwrite serive :: loginUser :: error", typeof(error) === 'object' ? error.message : error);
        }


    }




}



const authServiceInstance = new AuthService();

export default authServiceInstance ;