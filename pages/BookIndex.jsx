const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from '../pages/BookDetails.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookEdit } from './BookEdit.jsx'
import { AppLoader } from '../cmps/AppLoader.jsx'

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService
            .query(filterBy)
            .then(books => setBooks(books))
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

    function onSaveBook(bookToSave) {
        bookService
            .save(bookToSave)
            .then(() => {
                setIsEdit(false)
                setSelectedBookId(null)
                loadBooks()
            })
            .catch(err => {
                console.log('Had issues with book save:', err)
            })
    }

    function onSelectedBookId(bookId) {
        setSelectedBookId(bookId)
    }

    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }

    if (!books) return <AppLoader />
    return (
        <section className="book-index">
            {selectedBookId ? (
                isEdit ? (
                    <BookEdit 
                        bookId={selectedBookId} 
                        onSaveBook={onSaveBook} 
                        onCancel={() => setIsEdit(false)} />
                ) : (
                    <BookDetails
                        bookId={selectedBookId}
                        onBack={() => setSelectedBookId(null)}
                        onEdit={() => setIsEdit(true)}
                    />
                )
            ) : (
                <React.Fragment>
                    <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                    <BookList books={books} onSelectedBookId={onSelectedBookId} onRemoveBook={onRemoveBook} />
                </React.Fragment>
            )}
        </section>
    )
}
