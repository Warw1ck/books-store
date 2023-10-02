const url = 'https://demoqa.com/'
async function createAccount(name, password) {
    const data = {
        userName: name,
        password: password
    }
    const response = await fetch(`${url}Account/v1/User`, 
    {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }
    )
    const result = await response.json();
    return [result, response.status]
    }

async function generateTokenAccount(name, password) {
    const data = {
        userName: name,
        password: password
    }
    const response = await fetch(`${url}Account/v1/GenerateToken`, 
    {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }
    )
    const result = await response.json();
    return [result, response.status]

}


async function getAccount(userId, token) {
    const headers = {
        'accept': 'application/json',
        'authorization': 'Basic VGVzdExvbmdXb3JkJDU6VGVzdExvbmdXb3JkJDU=',
        'Authorization': token
      };
    const response = await fetch(`${url}Account/v1/User/${userId}`,{
        method: 'GET',
        headers: headers
      })
    const result = await response.json();

    return [result, response.status]
}

async function deleteAccount(userId, token) {
    const headers = {
        'accept': 'application/json',
        'authorization': 'Basic VGVzdExvbmdXb3JkJDU6VGVzdExvbmdXb3JkJDU=',
        'Authorization': token
      };
    const response = await fetch(`${url}Account/v1/User/${userId}`,{
        method: 'Delete',
        headers: headers
      })

    return response
}


async function authorizedAccount(name, password) {
    const data = {
        userName: name,
        password: password
    }
    const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      };
    const response = await fetch(`${url}Account/v1/Authorized`, 
    {
        method: "POST", // or 'PUT'
        headers:headers,
        body: JSON.stringify(data),
    }
    )
    const result = await response.json();

    return result
    }


module.exports = { createAccount, deleteAccount, generateTokenAccount, authorizedAccount, getAccount}




