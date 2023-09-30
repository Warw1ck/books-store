const { createAccount, deleteAccount, generateTokenAccount, authorizedAccount, getAccount, printText } = require('../js/account.js')

    
describe('Creating Account', () => {
    const [name, password] = ['TestWord$2345278', 'TestWord$34567'];

    test('creating new account and validate if its exist', async () => {
        const [userData, statusCode] = await createAccount(name, password);
        printText(userData)
        const [tokenData, tokenStatusCode] = await generateTokenAccount(name, password);
        const authorizationStatus = await authorizedAccount(name, password, tokenData.token);
        const [getUserData, getStatusCode] = await getAccount(userData.userId, tokenData.token);
        const deleteProfile = await deleteAccount(userData.userId, tokenData.token);
        printText(authorizationStatus)
        printText()
        printText(deleteAccount.status)
        
        expect(statusCode).toEqual(201);
        expect(userData.username).toEqual(name);
        expect(userData.userId).not.toBeNull();
        expect(userData.books).toEqual([]);

        expect(getStatusCode).toEqual(201);
        expect(getUserData.username).toEqual(userData.username);
        expect(getUserData.userId).toEqual(userData.userId);
        



    });

    test('trying to create user who exists', async () => {
        const [userData, statusCode] = await createAccount(name, password);
        const [tokenData,tokenStatusCode]= await generateTokenAccount(name, password)
        authorizedAccount(name, password, tokenData.token)

        const [wrongUserData, wrongStatusCode] = await createAccount(name, password);
        expect(wrongStatusCode).toEqual(406);
        expect(wrongUserData.message).toEqual('User exists!');
        expect(wrongUserData.code).toEqual('1204');

        deleteAccount(userData.userId, tokenData.token);

    });


    test('trying to create user without digit in the password', async () => {
        const invalidPassword = 'TestLongWord$';
        const [wrongUserData, wrongStatusCode] = await createAccount(name, invalidPassword);
        expect(wrongStatusCode).toEqual(400);
        expect(wrongUserData.message).toEqual("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.");
        expect(wrongUserData.code).toEqual('1300');
    });

});
      


  
  
  