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



/*
    authorizedAccount('TestLongWord$5', 'TestLongWord$5'),
    createAccount('TestLongWord$6', 'TestLongWord$6'), 
    deleteAccount('6ed928b3-392e-44c5-ad23-c43001c709c0', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3RMb25nV29yZCQ1IiwicGFzc3dvcmQiOiJUZXN0TG9uZ1dvcmQkNSIsImlhdCI6MTY5NTkxMTk4NH0.hFAbdj1N84qtdC8QKzSw3QVMTi6bkWWQ7hKlfNS9mRk')
    getAccount('f1a754f1-06af-44bb-8a32-eb4e04ffce50', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3RMb25nV29yZCQ1IiwicGFzc3dvcmQiOiJUZXN0TG9uZ1dvcmQkNSIsImlhdCI6MTY5NTkxMTg2OX0.QnJXXUea6FRbaUz0Gs_9R3eiMJu6bOZFob6tZ1t5wuQ')
getAccount('82c3b5de-8f96-46d7-b9ad-bc56fcdf0a29', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3RMb25nV29yZCQ1IiwicGFzc3dvcmQiOiJUZXN0TG9uZ1dvcmQkNSIsImlhdCI6MTY5NTk2NjU5NX0.TLN7Vy_YdxdbZ1EFKSI5ZTcDcXN8OIRmHOuXBnfVtnw')
]
)
.then((data)=>console.log(data))
createAccount('TestLongWord$51', 'TestLongWord$51').then((data)=>console.log(data))



*/
function printText(text){
    console.log(text)

}


async function createAndDeleteAccount(name, password) {
    const [userData, userStatus] =  await createAccount(name, password)
    console.log(userData)
    const [tokenData, tokenStatus] = await generateTokenAccount(name, password)
    console.log(tokenData)
    const authorizationData = await authorizedAccount(name, password)
    console.log(`Authorization Data: ${authorizationData}`)
    const [getData, getStatus] = await getAccount(userData.userId, tokenData.token)
    console.log(getData)
    const deleteResult = await deleteAccount(userData.userId, tokenData.token)
    console.log(`Delete Data: ${deleteResult.status}`)
    
}

generateTokenAccount('TestLongWord$5', 'TestLongWord$5').then(
    authorizedAccount('TestLongWord$5', 'TestLongWord$5').then(
        deleteAccount('65f337e2-a74d-42ee-b696-1364da2fccab', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3RMb25nV29yZCQ1IiwicGFzc3dvcmQiOiJUZXN0TG9uZ1dvcmQkNSIsImlhdCI6MTY5NTk2NjU5NX0.TLN7Vy_YdxdbZ1EFKSI5ZTcDcXN8OIRmHOuXBnfVtnw')
        .then((data)=>console.log(data))
    )
    
    
)






