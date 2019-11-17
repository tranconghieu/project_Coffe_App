const login = (user , password) => {
    const arr = { 'user' : user , 'password' : password};
    //debugger
    return fetch('http://apicoffeeshop.coffeeshop.zanluv.com/login.php' , {
        method : 'POST',
        headers :{
            Accept:'application/json',
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(arr)
    })
    .then(ress => ress.json())
    .catch (err => console.log(err))
}

export default login;