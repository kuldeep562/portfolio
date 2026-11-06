import Link from 'next/link'

export default function NotFound() {
  return <main className="not-found"><span className="eyebrow">404 · PAGE NOT FOUND</span><h1>This page isn’t here.</h1><p>The link may have moved, or the address may be incorrect.</p><Link className="button button-dark" href="/">Return home</Link></main>
}
