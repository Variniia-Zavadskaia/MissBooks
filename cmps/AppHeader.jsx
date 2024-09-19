export function AppHeader({ onSetPage }) {
    const linkes = [
        { title: 'Home', href: 'home' },
        { title: 'About Us', href: 'about' },
        { title: 'Books', href: 'book' },
    ]
    return (
        <header className="app-header full main-layout">
            <section>
                <h1>Miss Books</h1>
                <nav className="app-nav">
                    {linkes.map((link, idx) => {
                        return (
                            <a key={idx} title={link.title} onClick={() => onSetPage(link.href)}>
                                {link.title}
                            </a>
                        )
                    })}
                </nav>
            </section>
        </header>
    )
}
