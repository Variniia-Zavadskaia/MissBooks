const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'
import { BookDetails } from '../pages/BookDetails.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookEdit } from '../cmps/BookEdit.jsx'

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService
            .query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('Problems getting books:', err)
            })
    }

    function onRemoveBook(bookId) {
        bookService
            .remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log('Problems removing book:', err)
            })
    }

    // function onAddBook(newBook) {
    //     setBooks(addBook)
    // }

    function onSelectedBookId(bookId) {
        setSelectedBookId(bookId)
    }

    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }

    if (!books) return <h1>Loading...</h1>
    return (
        <section className="book-index">
            {selectedBookId ? (
                <BookDetails bookId={selectedBookId} onBack={() => setSelectedBookId(null)} />
            ) : (
                <React.Fragment>
                    <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                    <BookEdit />
                    <BookList books={books} onSelectedBookId={onSelectedBookId} onRemoveBook={onRemoveBook} />
                </React.Fragment>
            )}
        </section>
    )
}
