const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())

    useEffect(() => {
        setBookToEdit(bookToEdit)
    }, [])

    function handleChange({ target }) {
        const field = target.name
        console.log(target.name)

        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }
        console.log(value)

        setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
    }

    function onAddBook(ev) {
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

    const { txt, listPrice } = bookToEdit
    const isValid = txt

    return (
        <section className="book-edit">
            {/* <h2>Add New Book</h2> */}
            <form onSubmit={onAddBook}>
                <label htmlFor="txt"></label>
                <input value={txt} onChange={handleChange} type="text" name="title" id="title" placeholder="Title" />

                <label htmlFor="price"></label>
                <input
                    value={listPrice}
                    onChange={handleChange}
                    type="number"
                    name="listPrice"
                    id="listPrice"
                    placeholder="Price"
                />

                <button disabled={!isValid}>Add book</button>
            </form>
        </section>
    )
}
