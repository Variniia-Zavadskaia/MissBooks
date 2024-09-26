const { useState } = React

import { bookService } from '../services/book.service.js'

export function BookAdd({ onAddBook }) {
    const [bookToAdd, setBookToAdd] = useState()

    
  

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
