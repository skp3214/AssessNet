import axios from "axios";
import config from "../config/config.js";

class AuthService{
    constructor(){
        this.apiUrl=config.apiUrl;
        this.AXIOS=axios.create({
            baseURL:this.apiUrl,
            withCredentials:true
        }); 
    }

    signup=async({name,email,password})=>{
        try {
            const response=await this.AXIOS.post('/signup',{ name,email,password});
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    login=async({email,password})=>{
        try {
            const response=await this.AXIOS.post('/login',{ email,password});
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    logout=async()=>{
        try {
            const response=await this.AXIOS.post('/logout');
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    getCurrentUser=async()=>{
        try {
            const response=await this.AXIOS.get('/me');
            return response;
        } catch (error) {
            console.error(error);
        }
    }
}

const authService=new AuthService();
export default authService;