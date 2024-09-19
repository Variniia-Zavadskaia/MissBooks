import { loadFromStorage, makeId, makeLorem, getRandomIntInclusive, saveToStorage, DEFAULT_BOOK_IMG } from '../services/util.service.js'
import { storageService } from '../services/async-storage.service.js'

const BOOK_KEY = 'myBookDB'
// const DEFAULT_BOOK_IMG = 'assets/img/defImg.jpeg'
// var gFilterBy = { txt: '', minPrice: 0 }
_createBooks()
console.log(query())

export const bookService = {
    query,
    get,
    remove,
    save,
    createBook,
    getEmptyBook,
    // getNextBookId,
    getDefaultFilter,
    // setFilterBy,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY).then(books => {
        books = _getFilteredBooks(books, filterBy)
        return books
        // if (filterBy.txt) {
        //     const regex = new RegExp(filterBy.txt, 'i')
        //     books = books.filter(book => regex.test(book.title))
        // }
        // if (filterBy.minPrice) {
        //     books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
        // }
        // return books
    })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function _getFilteredBooks(books, filterBy) {
    if (filterBy.title) {
        const regExp = new RegExp(filterBy.title, 'i')
        books = books.filter(book => regExp.test(book.title))
    }
    if (filterBy.maxPrice) {
        books = books.filter(book => book.listPrice.amount <= filterBy.maxPrice)
    }
    if (filterBy.minPrice) {
        books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
    }
    if (filterBy.category) {
        books = books.filter(book => book.categories.includes(filterBy.category))
    }
    if (filterBy.isOnSale) {
        books = books.filter(book => book.listPrice.isOnSale)
    }

    return books
}

function getEmptyBook(title = '', listPrice = '') {
    return { title, listPrice }
}

function getDefaultFilter() {
    return {
        title: '',
        minPrice: '',
    }
}

// function getFilterBy() {
//     return { ...gFilterBy }
// }

// function setFilterBy(filterBy = {}) {
//     if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
//     if (filterBy.minPrice !== undefined) gFilterBy.minPrice = filterBy.minPrice
//     return gFilterBy
// }

// function getNextBookId(bookId) {
//     return storageService.query(BOOK_KEY).then(books => {
//         let nextBookIdx = books.findIndex(book => book.id === bookId) + 1
//         if (nextBookIdx === books.length) nextBookIdx = 0
//         return books[nextBookIdx].id
//     })
// }

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY) || []
    if (books && books.length) {
        console.log('books', books)
        return
    }

    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    for (let i = 0; i < 20; i++) {
        const book = {
            id: makeId(),
            title: makeLorem(2),
            subtitle: makeLorem(4),
            authors: [makeLorem(1)],
            publishedDate: getRandomIntInclusive(1950, 2024),
            description: makeLorem(20),
            pageCount: getRandomIntInclusive(20, 600),
            categories: [ctgs[getRandomIntInclusive(0, ctgs.length - 1)]],
            thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg` || DEFAULT_BOOK_IMG,
            language: 'en',
            listPrice: {
                amount: getRandomIntInclusive(80, 500),
                currencyCode: 'EUR',
                isOnSale: Math.random() > 0.7,
            },
        }
        books.push(book)
    }
    saveToStorage(BOOK_KEY, books)
    console.log('books', books)
}

function createBook(title, listPrice) {
    const book = getEmptyBook(title, listPrice)
    return book
}
