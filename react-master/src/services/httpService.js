const httpService = {
    login: (data) => {
        return fetch("http://localhost:3333/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }, 
    createUser: () => {

    },

    getUser: (data) => {
         return fetch("http://localhost:3333/api/users",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")

            },
            body: JSON.stringify(data)
        })  
    }
    
}
export default httpService