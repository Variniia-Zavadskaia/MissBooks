const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'
import { AppLoader } from '../cmps/AppLoader.jsx'
import { LongTxt } from "../cmps/LongTxt.jsx"
import { LongTxtCSS } from "../cmps/LongTxtCSS.jsx"

export function BookDetails({ onBack, bookId, onEdit }) {
    const [book, setBook] = useState(null)
    const [features, setFeatures] = useState({ level: '', ageCategory: '', priceClass: '' })

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService
            .get(bookId)
            .then(book => {
                setBook(book)
            })
            .catch(err => {
                console.log('Problem getting book', err)
            })
    }

    useEffect(() => {
        if (!book) return
        const featuresFromBook = {
            level: getReadingLevel(book.pageCount),
            ageCategory: getBookAgeCategory(book.publishedDate),
            priceClass: getPriceClass(book.listPrice.amount),
        }

        console.log(featuresFromBook)

        setFeatures(prev => ({ ...prev, ...featuresFromBook }))
    }, [book])

    const getReadingLevel = pageCount => {
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

    function getCurrencySymbol(currencyCode) {
        const currencySymbols = {
            USD: '$',
            EUR: '€',
            ILS: '₪',
            GBP: '£',
            JPY: '¥',
            AUD: 'A$',
            CAD: 'C$',
            CHF: 'Fr',
            CNY: '¥',
            SEK: 'kr',
            NZD: 'NZ$',
        }
        return currencySymbols[currencyCode] || currencyCode // Fallback to currency code if symbol is not found
    }

    function getDefaultUrl(ev) {
        ev.target.src = 'assets/img/defImg.jpeg'
    }

    if (!book) return <AppLoader />

    // const { title, thumbnail, listPrice, pageCount, publishedDate } = book
    // const readingCategory = getReadingCategory(pageCount)
    // const bookAgeCategory = getBookAgeCategory(publishedDate)
    // const priceClass = getPriceClass(listPrice.amount)

    
    return (
        <section className="book-details">
            <div className="book-header">
                <h2 className="book-title">{book.title}</h2>
                {book.subtitle && <h3 className="book-subtitle">{book.subtitle}</h3>}
                <img className="book-thumbnail" src={`${book.thumbnail} `} onError={getDefaultUrl} alt={`${book.title} cover`} />
            </div>
            <div className="book-info">
                <p>
                    <span className="bold">Authors:</span> {book.authors.join(', ')}
                </p>
                <p>
                    <span className="bold">Published:</span> {book.publishedDate} {features.ageCategory}
                </p>
                <p>
                    <span className="bold">Page Count:</span> {book.pageCount} {features.level}
                </p>
                <p>
                    <span className="bold">Categories: </span>
                    {book.categories.join(', ')}
                </p>

                <LongTxt txt={book.description} />
                <LongTxtCSS txt={book.description} length={50} />
            </div>
            <div className={`book-price ${features.priceClass}`}>
                <p>
                    Price: {book.listPrice.amount} {getCurrencySymbol(book.listPrice.currencyCode)}
                </p>
                {book.isOnSale && <p className="on-sale">On Sale!</p>}
            </div>

            <div className="action-btns ">
                <button onClick={onBack}>Back</button>
                <button onClick={onEdit}>Edit</button>
            </div>
        </section>
    )
}
