import { ExperimentsView } from "./view";

export default async function ExperimentsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <ExperimentsView searchParams={await searchParams} layout="split" name="Split" />;
}
