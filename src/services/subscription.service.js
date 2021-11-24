import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/users/";

class SubscriptionService{

    getSubscriptionsList=()=>{
        return axios.get(API_URL+"subscription/all",{headers:authHeader()});
    }
    postSaveSubscription=(subscription)=>{
        return axios.post(API_URL+"subscription/save",subscription,{headers:authHeader()});
    }
    putUpdateSubscription=(subscription)=>{
        return axios.put(API_URL+"subscription/update",subscription,{headers:authHeader()});
    }
    getSearchSubscription=(subscriptionId)=>{
        return axios.get(API_URL+"subscription/find/"+subscriptionId,{headers:authHeader()});
    }
}
export default new SubscriptionService();