const url = undefined
async function getBooks() {
    const response = await fetch(`${url}BookStore/v1/Books`)
    const result = await response.json();
 
    return [result, response.status]

}


async function getOneBook(isbn) {
    const response = await fetch(`${url}BookStore/v1/Book?ISBN=${isbn}`)
    const result = await response.json();
    return [result, response.status]
}


async function addUserListOfBooks(userId, books, token) {
    const data = {
        "userId": userId,
        "collectionOfIsbns": books
      }
    const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'authorization': 'Basic VGVzdExvbmdXb3JkJDU6VGVzdExvbmdXb3JkJDU=',
    'Authorization': token
    };
    const response = await fetch(`${url}BookStore/v1/Books`, 
    {
        method: "POST", // or 'PUT'
        headers: headers,
        body: JSON.stringify(data),
    }
    )
    const result = await response.json();
    
    return [result, response.status]
    }


async function deleteUserBooks(userId, token) {
    const headers = {
        'accept': 'application/json',
        'authorization': 'Basic VGVzdExvbmdXb3JkJDU6VGVzdExvbmdXb3JkJDU=',
        'Authorization': token
      };
    
    const response = await fetch(`${url}BookStore/v1/Books?UserId=${userId}`,{
        headers: headers,
        method: 'DELETE'

    })
    return response
}    


async function deleteUserBook(isbn, userId, token) {
    const data = {
        "isbn": isbn,
        "userId": userId,
      }
    const headers = {
        'accept': 'application/json',
        'authorization': 'Basic VGVzdExvbmdXb3JkJDU6VGVzdExvbmdXb3JkJDU=',
        'Authorization': token
      };
    
    const response = await fetch(`${url}BookStore/v1/Books?UserId=${userId}`,{
        method: 'DELETE',
        headers: headers,
        data:JSON.stringify(data)

    })
    return response
}


async function replaceUserBook(isbnBook, isbnReplace, userId, token) {
    const data = {
        "userId": userId,
        "isbn": isbnReplace
      }
    const headers = {
    'accept': 'application/json',
    'authorization': 'Basic VGVzdExvbmdXb3JkJDU6VGVzdExvbmdXb3JkJDU=',
    'Authorization': token,
    'Content-Type': 'application/json'
    
    };
    const response = await fetch(`${url}BookStore/v1/Books/${isbnBook}`,
    {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    })
    const result = await  response.json();
    
    return [result, response.status]
}
/*
addUserListOfBooks('82c3b5de-8f96-46d7-b9ad-bc56fcdf0a29', [
    {isbn: '9781449365035'}
    ],
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3RMb25nV29yZCQ1IiwicGFzc3dvcmQiOiJUZXN0TG9uZ1dvcmQkNSIsImlhdCI6MTY5NTk2NjU5NX0.TLN7Vy_YdxdbZ1EFKSI5ZTcDcXN8OIRmHOuXBnfVtnw')
    .then(((data)=>console.log(data)))

replaceUserBook('9781449365035', '9781491904244', '82c3b5de-8f96-46d7-b9ad-bc56fcdf0a29', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3RMb25nV29yZCQ1IiwicGFzc3dvcmQiOiJUZXN0TG9uZ1dvcmQkNSIsImlhdCI6MTY5NTk2NjU5NX0.TLN7Vy_YdxdbZ1EFKSI5ZTcDcXN8OIRmHOuXBnfVtnw').then((data)=> console.log(data))

*/


module.exports = {addUserListOfBooks, getOneBook, getBooks, replaceUserBook, deleteUserBook, deleteUserBooks}