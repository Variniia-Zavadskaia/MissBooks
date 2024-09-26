const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { LongTxt } from '../cmps/LongTxt.jsx'
import { AddReview } from '../cmps/AddReview.jsx'
import { AppLoader } from '../cmps/AppLoader.jsx'

export function BookDetails() {
    const [book, setBook] = useState(null)
    const [features, setFeatures] = useState({ level: '', ageCategory: '', priceClass: '' })

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        bookService
            .get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('Problem getting book', err)
                showErrorMsg('Could not load book. Please try again.')
                navigate('/book')
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
        if (amount > 200) return 'price-red'
        if (amount < 50) return 'price-green'
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

    function onAddReview(bookId, review) {
        bookService
            .addReview(bookId, review)
            .then(updatedBook => {
                setBook(updatedBook)
                showSuccessMsg(`Review added successfully!`)
            })
            .catch(err => {
                console.error('Error adding review:', err)

                showErrorMsg(`Failed to add review. Please try again`)
            })
    }

    function onDeleteReview(reviewIdx) {
        const updatedReviews = book.reviews.filter((_, idx) => idx !== reviewIdx)
        const updatedBook = { ...book, reviews: updatedReviews }
        bookService
            .save(updatedBook)
            .then(() => {
                setBook(updatedBook)
                showSuccessMsg(`Review removed successfully!`)
            }) // Update state after deletion
            .catch(err => {
                console.error('Error deleting review:', err)
                showErrorMsg(`Problems removing review (${reviewIdx})`)
            })
    }

    function getDefaultUrl(ev) {
        ev.target.src = 'assets/img/defImg.jpeg'
    }

    function onBack() {
        navigate('/book')
    }

    if (!book) return <AppLoader />

    return (
        <article className="book-details">
            <nav className="book-details-nav">
                <Link to={`/book/${book.prevBookId}`}>
                    <button>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                </Link>
                <Link to={`/book/${book.nextBookId}`}>
                    <button>
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </Link>
            </nav>

            <h2 className="book-title">{book.title}</h2>
            {/* {book.subtitle && <h3 className="book-subtitle">{book.subtitle}</h3>} */}
            {/* <span className="bold">Published: {book.publishedDate} {features.ageCategory}</span> */}
            <span className="bold">{features.ageCategory}</span>
            {/* <span className="bold">Page Count: {book.pageCount} {features.level}</span>  */}
            <h4 className="bold">{features.level}</h4>
            <img
                className="book-thumbnail"
                src={`${book.thumbnail} `}
                onError={getDefaultUrl}
                alt={`${book.title} cover`}
            />

            <p className={`book-price ${features.priceClass}`}>
                <span className="bold-txt">Price: </span> {book.listPrice.amount}{' '}
                {getCurrencySymbol(book.listPrice.currencyCode)}
            </p>

            <p>
                <span className="bold-txt">Language:</span>
                {book.language}
            </p>

            {book.categories && (
                <p>
                    <span className="bold-txt">Categoric:</span> {book.categories}
                </p>
            )}
            {book.authors && (
                <p>
                    <span className="bold-txt">Authors:</span> {book.authors}
                </p>
            )}

            {book.description && <LongTxt txt={book.description} />}
            {book.listPrice.isOnSale && (
                <img className="on-sale-icon" src="/assets/booksImages/onSale.png.png" alt="" />
            )}
              <button className='close'>
                <Link to='/book'>
                    X
                </Link>
            </button>
             {/* <div className="action-btns ">
                <button onClick={onBack}>Back</button> */}
                {/* <button onClick={onEdit}>Edit</button> */}
            {/* </div> */}
            <div className='brake-line'></div>
            <div className="add-review">
                <h3>Reviews</h3>
                <AddReview bookId={book.id} onAddReview={onAddReview} />
                {book.reviews && book.reviews.length > 0 ? (
                    <ul>
                        {book.reviews.map((review, idx) => (
                            <li key={idx}>
                                <p>
                                    <strong>{review.fullname}</strong> rated {review.rating} stars on {review.readAt}
                                </p>
                                <button onClick={() => onDeleteReview(idx)}>Delete Review</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>

           
        </article>
    )
}
