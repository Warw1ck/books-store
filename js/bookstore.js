const url = 'https://demoqa.com/'
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

module.exports = {addUserListOfBooks, getOneBook, getBooks, replaceUserBook, deleteUserBook, deleteUserBooks}