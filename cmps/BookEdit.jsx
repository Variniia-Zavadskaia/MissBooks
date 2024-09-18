const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'

export function BookEdit() {
    const[books, setBooks] = useState()
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())

    useEffect(() => {
        setBooks(bookToEdit)
    }, [bookToEdit])

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

        if (field === 'listPrice') {
            setBookToEdit(prevBook => ({
                ...prevBook,
                listPrice: { ...prevBook.listPrice, amount: value }
            }))
        } else {
            setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
        }
    }

    function addBook(ev) {
        console.log('new book');
        
        ev.preventDefault()
        bookService
            .save(bookToEdit)
            .then(savedBook => {
                setBooks([...books, savedBook])
            })
            .catch(err => {
                console.error('Failed to save book', err)
                // TODO: show error msg to user
            })
    }

    const { title, listPrice } = bookToEdit
    const isValid = title

    // const isValid = book.title && book.listPrice>= 0

    return (
        <section className="book-edit">
            {/* <h2>Add New Book</h2> */}
            <form onSubmit={addBook}>
                {/* <label htmlFor="txt"></label> */}
                <input value={title} onChange={handleChange} type="text" name="title" id="title" placeholder="Title" />

                {/* <label htmlFor="price"></label> */}
                <input
                    value={listPrice.amount || ''}
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
