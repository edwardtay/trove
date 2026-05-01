import { redirect } from "next/navigation";

export default function BenchmarkRedirect() {
  redirect("/notes#benchmark");
}
