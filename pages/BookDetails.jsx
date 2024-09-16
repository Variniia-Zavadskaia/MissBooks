const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'

export function BookDetails({ onBack, bookId }) {
    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService
            .get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('Problem getting book', err)
            })
    }

    if(!book) return <div>loading...</div>
    return(
        <section className='book-details'>
            <h1>Book title: {book.title}</h1>
            <img src={`${book.thumbnail}`} />
            <h3>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h3>
            {book.listPrice.isOnSale && <p style={{ color: 'red' }}>On Sale!</p>}
            <button onClick={onBack}>Back</button>
        </section>
    )
}
