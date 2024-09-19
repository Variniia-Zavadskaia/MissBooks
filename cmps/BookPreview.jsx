export function BookPreview({book}) {
   
    return (
        <article className="book-preview">
            <h2>Book title: {book.title}</h2>
            <img src={`${book.thumbnail}`} alt={book.title} />
            <h3>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h3>
            {/* {book.listPrice.isOnSale && <p style={{ color: 'red' }}>On Sale!</p>} */}
            
        </article>
    )
}