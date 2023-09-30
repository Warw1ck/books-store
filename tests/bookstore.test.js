
const { createAccount, deleteAccount, generateTokenAccount, authorizedAccount, getAccount } = require('../js/account.js')
const {addUserListOfBooks, getOneBook, getBooks, replaceUserBook, deleteUserBook, deleteUserBooks} = require('../js/bookstore.js')

describe('BookShop Operations', () => {
    let userData,statusCode, tokenData, tokenStatusCode;
  
    beforeAll(async () => {
      const [name, password] = ['TestLongWord$8', 'TestLongWord$8'];
      [userData, statusCode] = await createAccount(name, password);
      [tokenData, tokenStatusCode] = await generateTokenAccount(name, password);
      
    });
  
    afterAll(() => {
      deleteAccount(userData.userId, tokenData.token);
    });
  
    describe('Add Book to User Collection', () => {
      test('properly add book to user collection', async () => {
        const exampleISBN = '9781449365035';
        const [bookData, statusCode] = await addUserListOfBooks(userData.userId, [{ isbn: exampleISBN }], tokenData.token);
  
        expect(statusCode).toEqual(201);
        expect(bookData).toEqual({
          books: [
            {
              isbn: exampleISBN,
            },
          ],
        });
  
        const [getUserData, getStatusCode] = await getAccount(userData.userId, tokenData.token);
        expect(getUserData.books.find((element) => element.isbn === exampleISBN)).toBeDefined();
      });
  
      test('add a book that is not existing in the BookShop', async () => {
        const [bookData, statusCode] = await addUserListOfBooks(userData.userId, [{ isbn: 'NotExistingISBN' }], tokenData.token);
  
        expect(statusCode).toEqual(400);
        expect(bookData).toEqual({
          code: '1205',
          message: "ISBN supplied is not available in Books Collection!",
        });
      });
    });
  
    describe('Change Book in User Collection', () => {
      test('properly change book in user collection', async () => {
        const exampleISBN = '9781449365035';
        const exampleChangeISBN = '9781491904244';
  
        const [changeBookData, statusCode] = await replaceUserBook(exampleISBN, exampleChangeISBN, userData.userId, tokenData.token);
  
        expect(statusCode).toEqual(200);
        expect(changeBookData.userId).toEqual(userData.userId);
        expect(changeBookData.username).toEqual(userData.username);
        expect(changeBookData.books.find((element) => element.isbn === exampleChangeISBN)).toBeDefined();
  
        const [getUserData, getStatusCode] = await getAccount(userData.userId, tokenData.token);
        expect(getUserData.books.find((element) => element.isbn === exampleChangeISBN)).toBeDefined();
      });
    });
  
    describe('Delete Book in User Collection', () => {
      test('properly delete book in user collection', async () => {
        const exampleISBN = '9781491904244';
  
        const response = await deleteUserBook(exampleISBN, userData.userId, tokenData.token);
  
        expect(response.status).toEqual(204);
      });
  
      test('delete a book that is not in the user collection', async () => {
        const exampleISBN = '9781491904244';
  
        const response = await deleteUserBook(exampleISBN, userData.userId, tokenData.token);
        const result = await response.json();
  
        expect(response.status).toEqual(400);
        expect(result).toEqual({
          code: '1206',
          message: "ISBN supplied is not available in User's Collection!",
        });
      });
    });
  
    describe('Find book in the BookShop', () => {
      test('properly find a book and validate its presence', async () => {
        const exampleISBN = '9781491904244';
        const [allBooksData, allBookStatusCode] = await getBooks();
        const [bookData, bookStatusCode] = await getOneBook(exampleISBN);
  
        expect(allBookStatusCode).toEqual(200);
        expect(bookData.isbn).toEqual(exampleISBN);
        expect(bookData.pages).toEqual(278);
  
        expect(allBooksData.books.find((element) => element.isbn === exampleISBN)).toBeDefined();
      });
    });
  });