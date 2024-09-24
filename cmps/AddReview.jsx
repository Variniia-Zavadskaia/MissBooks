const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'

export function AddReview({ bookId, onAddReview }) {
    const [review, setReview] = useState(bookService.getEmptyReview())

    function handleChange({ target }) {
        const { name: field, type } = target
        console.log(target.name)

        let { value } = target

        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }
        setReview(prevBook => ({ ...prevBook, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault(ev)
        if (!review.fullname) {
            showErrorMsg(`'Fullname is required!'`)
        }
        onAddReview(bookId, review)
            .then(() => {
                setReview({ fullname: '', rating: 1, readAt: '' })
                showSuccessMsg(`Review added successfully!`)
            })
            .catch(err => {
                console.log('Problems adding review:', err)
                showErrorMsg(`Failed to add review. Please try again`)
            })
    }
    return (
        <section className="add-review">
            <h3>Add Review</h3>
            <form onSubmit={onSubmit}>
                <label>
                    Full Name:
                    <input
                        type="text"
                        name="fullname"
                        value={review.fullname}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                    />
                </label>

                <label>
                    Rating:
                    <select name="rating" value={review.rating} onChange={handleChange}>
                        <option value={1}>1 Star</option>
                        <option value={2}>2 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={5}>5 Stars</option>
                    </select>
                </label>

                <label>
                    Read At:
                    <input type="date" name="readAt" value={review.readAt} onChange={handleChange} required />
                </label>

                <button type="submit">Submit Review</button>
            </form>
        </section>
    )
}
