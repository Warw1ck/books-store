const url = undefined
async function getBooks() {
    const response = await fetch(`${url}BookStore/v1/Books`)
    const result = await response.json();
    if (!response.ok) {
        console.log((`HTTP error: ${response.status}`));
    }
    return result
}

async function getOneBook(isbn) {
    const response = await fetch(`${url}BookStore/v1/Book?ISBN=${isbn}`)
    const result = await response.json();
    if (!response.ok) {
        console.log((`HTTP error: ${response.status}`));
    }
    return result
}

async function addListOfBooks(userId, books) {
    const data = {
        "userId": userId,
        "collectionOfIsbns": books
      }
    const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
    };
    const response = await fetch('${url}BookStore/v1/Books', 
    {
        method: "POST", // or 'PUT'
        headers: headers,
        body: JSON.stringify(data),
    }
    )
    const result = await response.json();
    if (!response.ok) {
        console.log((`HTTP error: ${response.status}`));
    }
    return result
    }


addListOfBooks('82c3b5de-8f96-46d7-b9ad-bc56fcdf0a29', [
{isbn: '97815932758461',
title: 'Eloquent JavaScript, Second Edition',
subTitle: 'A Modern Introduction to Programming',
author: 'Marijn Haverbeke',
publish_date: '2014-12-14T00:00:00.000Z',
publisher: 'No Starch Press',
pages: 472,
description: 'JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale ',
website: 'http://eloquentjavascript.net/'}
]).then(((data)=>console.log(data)))

