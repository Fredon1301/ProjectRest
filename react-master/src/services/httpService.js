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
    createUser: (data) => {
        return fetch("http://localhost:3333/api/users",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

    },

    createProduct: (data) => {
        return fetch("http://localhost:3333/api/product",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },  
            body: JSON.stringify(data)
        })

    },

    getUser: (data) => {
         return fetch("http://localhost:3333/api/users",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")

            },
                    })  
    }
    
}
export default httpService