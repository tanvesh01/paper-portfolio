import { ExperimentsView } from "../view";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <ExperimentsView searchParams={await searchParams} layout="dock" name="Dock" />;
}
