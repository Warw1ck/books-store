import test from "node:test"
import {createAccount, deleteAccount, generateTokenAccount, authorizedAccount} from './account.js'


describe('Properly Creating Account', async ()=>{
    const [name, password] = ['TestLongWord$8', 'TestLongWord$8']
    const [userData, statusCode] = await createAccount(name, password)
    test('creating new account',()=>{
        expect(statusCode).toEqual('201')
        expect(userData.username).toEqual(name)
        expect(userData.userId).not.ToBeNull()
        expect(user.books).toEqual([])
    })

    const tokenData = await generateTokenAccount(name, password)
    const authorizationStatus = await authorizedAccount(name, password, tokenData.token)
    const [getUserData, getStatusCode] = await getAccount(userData.userId, tokenData.token)

    test('validate if new account is created', ()=>{

        expect(getStatusCode).toBe('201')
        expect(getUserData.username).toBe(userData.username)
        expect(getUserData.userId).toBe(userData.userId)

    })

    deleteAccount(userData.userId, tokenData.token)

})

describe('Creating Account with ERRORS', async ()=>{
    const [name, password] = ['TestLongWord$8', 'TestLongWord$8']
    const [userData, statusCode] = await createAccount(name, password)

    test('trying to create user who exist', async ()=>{

        const [wrongUserData, wrongStatusCode] = await createAccount(name, password)
        expect(wrongStatusCode).toEqual('406')
        expect(wrongUserData.message).toEqual('User exists!')
        expect(wrongUserData.code).toEqual('1204')

    })
    deleteAccount(userData.userId, tokenData.token)

    describe('Trying to create user with invalid password',()=>{
        test('trying to create user without digit password', async ()=>{
            const invalidPassword = 'TestLongWord$'
            const [wrongUserData, wrongStatusCode] = await createAccount(name, invalidPassword)
            expect(wrongStatusCode).toEqual('400')
            expect(wrongUserData.message).toEqual("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.")
            expect(wrongUserData.code).toEqual('1204')
        })
        test('trying to create user without uppercase in password', async ()=>{
            const invalidPassword = 'testlongword$123'
            const [wrongUserData, wrongStatusCode] = await createAccount(name, invalidPassword)
            expect(wrongStatusCode).toEqual('400')
            expect(wrongUserData.message).toEqual("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.")
            expect(wrongUserData.code).toEqual('1300')
        })
        test('trying to create user with password less that eight characters', async ()=>{
            const invalidPassword = 'tes$123'
            const [wrongUserData, wrongStatusCode] = await createAccount(name, invalidPassword)
            expect(wrongStatusCode).toEqual('400')
            expect(wrongUserData.message).toEqual("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.")
            expect(wrongUserData.code).toEqual('1300')
        })
        test('trying to create user without lowercase in password', async ()=>{
            const invalidPassword = 'TESTWORDLONG$123'
            const [wrongUserData, wrongStatusCode] = await createAccount(name, invalidPassword)
            expect(wrongStatusCode).toEqual('400')
            expect(wrongUserData.message).toEqual("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.")
            expect(wrongUserData.code).toEqual('1300')
        })
        test('trying to create user without special character in  password', async ()=>{
            const invalidPassword = 'TestWordLong$123'
            const [wrongUserData, wrongStatusCode] = await createAccount(name, invalidPassword)
            expect(wrongStatusCode).toEqual('400')
            expect(wrongUserData.message).toEqual("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.")
            expect(wrongUserData.code).toEqual('1300')
        })
        
    })
})