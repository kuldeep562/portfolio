export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-code">404</div>
      <div className="not-found-message">[ ERROR: PAGE_NOT_FOUND ]</div>
      <a href="/" className="not-found-link">
        ← Return to home
      </a>
    </div>
  )
}