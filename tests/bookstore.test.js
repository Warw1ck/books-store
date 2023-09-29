import test from "node:test"
import {createAccount, deleteAccount, generateTokenAccount, authorizedAccount} from './account.js'
import {addUserListOfBooks, getOneBook, getBooks, replaceUserBook, deleteUserBook, deleteUserBooks} from './bookstore.js'

describe('BookShop Operations', async ()=>{
    const [name, password] = ['TestLongWord$8', 'TestLongWord$8']
    const [userData, statusCode] = await createAccount(name, password)

    const tokenData = await generateTokenAccount(name, password)
    const authorizationStatus = await authorizedAccount(name, password, tokenData.token)
    const [getUserData, getStatusCode] = await getAccount(userData.userId, tokenData.token)

    test('add book to user collection', async ()=>{
        addUserListOfBooks(userData.userId, [{isbn: '9781449365035'}], token)



    })

    deleteAccount(userData.userId, tokenData.token)

})