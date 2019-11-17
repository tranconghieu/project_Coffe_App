
export default Get_Table =  fetch('http://apicoffeeshop.coffeeshop.zanluv.com/table.php')
.then((response) => response.json())
.then((responseJson) => {
    return responseJson
})
.catch((error) => {
    console.error(error);
});







