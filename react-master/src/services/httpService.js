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
    },
    getProducts: (data) => {
        return fetch("http://localhost:3333/api/product",
       {
           method: "GET",
           headers: {
               "Content-Type": "application/json",
               "Authorization": localStorage.getItem("token")

           },
                   })  
   },
   updateProduct: (data) => {
    return fetch("http://localhost:3333/api/product",
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        },  
        body: JSON.stringify(data)
    })

},
deleteProduct: (data) => {
    return fetch("http://localhost:3333/api/product",
    {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        },  
        body: JSON.stringify(data)
    })

},
    
}
export default httpService