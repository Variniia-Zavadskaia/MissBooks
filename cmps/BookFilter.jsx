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

                <label htmlFor="minPrice">Min Price</label>
                <input value={minPrice || ''} onChange={handleChange} type="number" name="minPrice" id="minPrice" />

                <button type="submit" disabled={!isValidFilter()}>Submit</button>
            </form>
        </section>
    )
}
