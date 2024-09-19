const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

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
        console.log(value)

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { title, maxPrice, minPrice, category, isOnSale } = filterByToEdit

    function isValidFilter() {
        return (
            title ||
            category ||
            typeof isOnSale === 'boolean' ||
            (typeof maxPrice === 'number' && maxPrice >= 0) ||
            (typeof minPrice === 'number' && minPrice >= 0)
        )
    }

    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="title">Title</label>
                <input value={title} onChange={handleChange} type="text" name="title" id="title" />

                <label htmlFor="minPrice">Max Price</label>
                <input value={maxPrice || ''} onChange={handleChange} type="number" name="maxPrice" id="maxPrice" />

                <label htmlFor="minPrice">Min Price</label>
                <input value={minPrice || ''} onChange={handleChange} type="number" name="minPrice" id="minPrice" />

                <label htmlFor="category">Category: </label>
                <select id="category" name="category" value={category} onChange={handleChange}>
                    <option value="">Select Category</option>
                    <option value="Computers">Computers</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Love">Love</option>
                    <option value="Poetry">Poetry</option>
                    <option value="Religion">Religion</option>
                </select>

                <label htmlFor="isOnSale">On Sale: </label>
                <input type="checkbox" id="isOnSale" name="isOnSale" checked={isOnSale} onChange={handleChange} />

                <button type="submit" disabled={!isValidFilter()}>
                    Submit
                </button>
            </form>
        </section>
    )
}
