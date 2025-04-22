import { AuthForm } from "./components/AuthForm";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href={"/Board-Overview"}>
        <h1>Board Overview</h1>
      </Link>
    </main>
  );
}
