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
   
    const getReadingCategory = pageCount => {
        if (pageCount > 500) return 'Serious Reading'
        if (pageCount > 200) return 'Decent Reading'
        if (pageCount < 100) return 'Light Reading'
        return 'Moderate Reading' 
    }

    const getBookAgeCategory = publishedDate => {
        const publishedYear = new Date(publishedDate).getFullYear()
        const currentYear = new Date().getFullYear()
        const age = currentYear - publishedYear

        if (age > 10) return 'Vintage'
        if (age < 1) return 'New'
        return 'Modern' 
    }

    const getPriceClass = amount => {
        if (amount > 150) return 'price-red'
        if (amount < 20) return 'price-green'
        return 'price-normal' 
    }

    if (!book) return <div>Loading...</div>

    const { title, thumbnail, listPrice, pageCount, publishedDate } = book
    const readingCategory = getReadingCategory(pageCount)
    const bookAgeCategory = getBookAgeCategory(publishedDate)
    const priceClass = getPriceClass(listPrice.amount)

    if (!book) return <div>loading...</div>
    return (
        <section className="book-details">
            <h1>Book title: {title}</h1>
            <img src={`${thumbnail}`} />
            <h3 className={priceClass}>
                Price: {book.listPrice.amount} {book.listPrice.currencyCode}
            </h3>
            {book.listPrice.isOnSale && <p className="on-sale-sign">On Sale!</p>}
            <p>
                <strong>Page Count:</strong> {pageCount}
            </p>
            <p>
                <strong>Category:</strong> {readingCategory}
            </p>
            <p>
                <strong>Published:</strong> {bookAgeCategory}
            </p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}
