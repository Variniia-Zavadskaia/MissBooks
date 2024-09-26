const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    const [isExplanded, setIsExplanded] = useState(false)

    function onToggleExpansion() {
        setIsExplanded(prevExplanded => !prevExplanded)
    }

    const isLongText = txt.length > length
    const textToShow = isExplanded ? txt : txt.substring(0, length)

    return (
        <section className="long-text">
            <p>
                {textToShow}
                {isLongText && <button onClick={onToggleExpansion}>{isExplanded ? ' Less...' : ' More...'}</button>}
            </p>
        </section>
    )
}
