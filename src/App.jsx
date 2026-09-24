import { useMemo, useState } from 'react'
import './App.css'

const games = [
  { title: 'Match 3', genre: 'PUZZLE · MATCH-3', description: 'Swap colorful tiles, make matches, and chase a bigger score.', color: 'violet', icon: '✳', status: 'PLAY NOW', players: '01', href: '/games/match3.html' },
]

function App() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('ALL GAMES')
  const filtered = useMemo(() => games.filter((game) => {
    const matchesQuery = `${game.title} ${game.genre} ${game.description}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (filter === 'ALL GAMES' || game.status === filter)
  }), [query, filter])

  return <main className="app-shell">
    <aside className="sidebar">
      <a className="wordmark" href="#top" aria-label="Tesla Dashboard home"><span className="mark">T</span><span>TESLA<span className="wordmark-light"> / ARCADE</span></span></a>
      <div className="side-label">WORKSPACE</div>
      <nav><a className="nav-item active" href="#games"><span>▤</span> Game library <b>03</b></a><a className="nav-item" href="#about"><span>⌘</span> About this space</a></nav>
      <div className="sidebar-bottom"><span className="live-dot"/> BUILDING IN PUBLIC <small>v0.1.0 · 2026</small></div>
    </aside>

    <section className="main-content" id="top">
      <header className="topbar"><div className="breadcrumb">WORKSPACE <span>/</span> GAME LIBRARY</div><a className="github-link" href="https://github.com/lcorreia007/tesla-dashboard" target="_blank" rel="noreferrer">VIEW ON GITHUB <span>↗</span></a></header>
      <div className="content-wrap">
        <section className="intro" id="about"><div className="eyebrow"><span className="live-dot"/> A LITTLE CORNER OF THE INTERNET</div><h1>Small games.<br/><em>Big energy.</em></h1><p className="intro-copy">A home for the tiny games I’m making. Pick something, take a break, and see what’s in the works.</p><div className="intro-meta"><span>INDEPENDENT GAME PROJECTS</span><span className="meta-divider"/><span>MADE WITH CURIOSITY <span className="spark">✳</span></span></div></section>
        <section className="library" id="games"><div className="section-head"><div><div className="eyebrow muted">THE COLLECTION</div><h2>Game library <sup>{String(filtered.length).padStart(2, '0')}</sup></h2></div><div className="library-tools"><label className="search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a game..." aria-label="Search games"/><kbd>/</kbd></label></div></div>
          <div className="filter-row">{['ALL GAMES', 'PLAY NOW'].map((item) => <button key={item} className={`filter ${filter === item ? 'selected' : ''}`} onClick={() => setFilter(item)}>{item}</button>)}</div>
          <div className="game-grid">{filtered.map((game) => <a className="card-link" href={game.href} key={game.title} aria-label={`Play ${game.title}`}><article className={`game-card ${game.color}`}><div className="card-art"><span className="art-index">{game.players} / 01</span><span className="art-icon">{game.icon}</span><span className="art-lines"/><span className="art-label">{game.genre}</span></div><div className="card-body"><div className="card-title-row"><h3>{game.title}</h3><span className="status-dot" title={game.status}/></div><p>{game.description}</p><div className="card-footer"><span>{game.status}</span><span className="arrow-button" aria-hidden="true">↗</span></div></div></article></a>)}</div>
          {filtered.length === 0 && <div className="empty-state">No games match that search. Try another title.</div>}
        </section>
        <footer><span>MADE FOR THE LOVE OF MAKING THINGS</span><span>ONE GAME AT A TIME <span className="spark">✳</span></span></footer>
      </div>
    </section>
  </main>
}

export default App
