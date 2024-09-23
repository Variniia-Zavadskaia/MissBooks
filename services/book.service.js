import { loadFromStorage, makeId, makeLorem, getRandomIntInclusive, saveToStorage } from '../services/util.service.js'
import { storageService } from '../services/async-storage.service.js'

const BOOK_KEY = 'myBookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    createBook,
    getEmptyBook,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY).then(books => {
        books = _getFilteredBooks(books, filterBy)
        return books
    })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId).then(book => _setNextPrevBookId(book))
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

// function getEmptyBook(title = '', listPrice = '') {
//     return {title, listPrice }
// }

function getDefaultFilter() {
    return {
        title: '',
        minPrice: '',
    }
}

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
            thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
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

// function createBook(title, listPrice) {
//     const book = getEmptyBook(title, listPrice)
//     book.id = makeId()
//     return book
// }

function createBook(title, amount = 100, currencyCode = 'EUR', isOnSale = false) {
    const book = getEmptyBook(title, {
        amount,
        currencyCode,
        isOnSale,
    })
    book.id = makeId()
    return book
}

function getEmptyBook(title = '', listPrice = { amount: 0, currencyCode: 'EUR', isOnSale: false }) {
    return {
        id: '',
        title,
        subtitle: '',
        authors: [],
        publishedDate: '',
        description: '',
        pageCount: 0,
        categories: [],
        thumbnail: '',
        language: 'en',
        listPrice,
    }
}

function _setNextPrevBookId(book) {
    return query().then(books => {
        const bookIdx = books.findIndex(currBook => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}
