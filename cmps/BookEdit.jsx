const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'

export function BookEdit({ onAddBook }) {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())

    function handleInput(ev) {
        ev.preventDefault()
        bookService
            .save(this.bookToEdit)
            .then(savedBook => {
                setBookToEdit([...books, savedBook])
            })
            .catch(err => {
                console.error('Failed to save book', err)
                // TODO: show error msg to user
            })
    }

    const isValid = book.title && book.listPrice.amount >= 0

    return (
        <section className="book-edit">
            <h2>Add New Book</h2>
            <form onSubmit={onAddBook}>
                <label htmlFor="txt">Title</label>
                <input value={this.bookToEdit.title} onChange={this.handleInput} type="text" name="title" id="title" placeholder="Title"/>

                <label htmlFor="price">Price</label>
                <input value={this.bookToEdit.price} onChange={this.handleInput} type="number" name="price" id="price" />

                <button disabled={!isValid}>Add book</button>
            </form>
        </section>
    )
}
