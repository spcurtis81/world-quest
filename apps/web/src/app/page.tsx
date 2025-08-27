export default function Home() {
  return (
    <main data-testid="app-shell" style={{ padding: 16 }}>
      <h1>Web is live</h1>
      <p>Welcome to World Quest.</p>
      <ul>
        <li>
          <a href="/launch">Open launcher (App Router)</a>
        </li>
        <li>
          <a href="/launcher">Open launcher (legacy Pages)</a>
        </li>
        <li>
          <a href="/flag-quiz">Go to Flag Quiz</a>
        </li>
      </ul>
    </main>
  );
}
