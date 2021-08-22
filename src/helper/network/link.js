import axios from "axios"
import { AsyncStorage } from "react-native"

const executeRequest = async (
    url,
    data,
    config
) => {
    return new Promise(
        (resolve, reject) => {
            AsyncStorage.getItem("token").then(
                (token) => {
                    const requestConfig  = {
                        url: url,
                        headers: {
                            key: "dsv213a213sfv21123fs31d3fd132c3dv31dsf33",
                            Accept: "application/json",
                            "X-CSRF-TOKEN": token
                        },
                        ...config,
                        
                    }
                    if(
                        data
                    ){
                        requestConfig['data'] = data
                    }
        
                    console.log("Request config: ",requestConfig)
                    axios.request(
                        requestConfig
                    ).then(
                        (
                            response
                        ) => {
                            console.log("Response: ", response)
                            resolve(response)
                        }
                    ).catch(
                        (error) => {
                            console.log("Error: ", error)
                            reject(error)
                        }
                    );
                }
            )
        }
    )
}

export {
    executeRequest
}