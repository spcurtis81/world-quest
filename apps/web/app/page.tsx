import { Button } from '@world-quest/ui';

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>World Quest</h1>
      <Button onClick={() => alert('Hello from UI package!')}>Hello</Button>
    </main>
  );
}
