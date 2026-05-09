import { cookies } from "next/headers";

async function testServerAction(formData: FormData) {
  "use server";

  console.log("[server-action] clicked");
  console.log("[server-action] value:", formData.get("message"));
  console.log("[server-action] time:", new Date().toISOString());
}

export default async function TestLogPage() {
  console.log("[server-component] render /test-log");
  const token = (await cookies()).get("access_token")?.value;
  console.log("[server-component] token:", token);
  return (
    <main style={{ padding: 24 }}>
      <h1>Test Server Log</h1>

      <form action={testServerAction}>
        <input name="message" defaultValue="hello from form" />
        <button type="submit">Run server action</button>
      </form>
    </main>
  );
}
