const { useState } = React

import { bookService } from '../services/book.service.js'

export function BookAdd({ onAddBook }) {
    const [bookToAdd, setBookToAdd] = useState([
        { id: 1, title: 'To Kill a Mockingbird' },
        { id: 2, title: '1984' },
        { id: 3, title: 'The Great Gatsby' },
        { id: 4, title: 'The Catcher in the Rye' },
        { id: 5, title: 'Moby-Dick' },
      ])

    // function handleChange({ target }) {
    //     const field = target.name
    //     console.log(target.name)

    //     let value = target.value

    //     switch (target.type) {
    //         case 'number':
    //         case 'range':
    //             value = +value
    //             break

    //         case 'checkbox':
    //             value = target.checked
    //             break
    //     }
    //     console.log(value)

    //     if (field === 'listPrice') {
    //         setBookToAdd(prevBook => ({
    //             ...prevBook,
    //             listPrice: { ...prevBook.listPrice, amount: value },
    //         }))
    //     } else {
    //         setBookToAdd(prevBook => ({ ...prevBook, [field]: value }))
    //     }
    // }

    // function onSubmit(ev) {
    //     ev.preventDefault()
    //     onAddBook(bookToAdd)
    //     setBookToAdd({ title: '', listPrice: { amount: 0 } })
    // }

    const addBook = (book) => {
        console.log(`Adding book: ${book.title}`); // Replace with your add logic
        // Here you can call bookService.addGoogleBook(book) or similar
      };

    const { title, listPrice } = bookToAdd
    const isValid = title && listPrice.amount

    return (
        // <section onClick={onClose} className="backdrop">

        <section className="book-add">
            <h2>Add a New Book</h2>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        ID: {book.id} - Title: {book.title}
                        <button onClick={() => addBook(book)}> + </button>
                    </li>
                ))}
            </ul>

            <p>Search and add books to your collection!</p>
        </section>
        // </section>
    )
}

{
    /* <form onSubmit={onSubmit}>
                
                <input value={title} onChange={handleChange} type="text" name="title" id="title" placeholder="Title" />

                <input
                    value={listPrice.amount || ''}
                    onChange={handleChange}
                    type="number"
                    name="listPrice"
                    id="listPrice"
                    placeholder="Price"
                />

                <button disabled={!isValid}>Add book</button>
            </form> */
}
