import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Contacts from "./contactsclient";

export default async function ContactsPage() {
  const session = await getServerSession(authOptions);

  // Not logged in → send to sign in
  if (!session) redirect("/auth/signin");
  return <Contacts />;
}