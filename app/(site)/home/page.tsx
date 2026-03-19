import { redirect } from "next/navigation";

/** Legacy URL from the coming-soon period — send to the real homepage. */
export default function LegacyHomeRedirect() {
  redirect("/");
}
