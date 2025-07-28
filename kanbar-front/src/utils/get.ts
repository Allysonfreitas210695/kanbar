import httpClient from "./httpClient";

function get(url: string){
    return httpClient.get(url)
}

export default get;