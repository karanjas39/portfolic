import { getUser } from "@/lib/utils";

export default async function Home() {
  const session = await getUser();

  return <div>{JSON.stringify(session)}</div>;
}
