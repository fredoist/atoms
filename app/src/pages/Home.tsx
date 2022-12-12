import { ComponentCard } from "@components";
import { useSearch } from "@hooks";

export default function Home() {
  const { search, loading, components } = useSearch();

  return (
    <>
      <section className="px-4 py-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl lg:text-5xl text-center mb-12">
            Create and share your React components
          </h1>
          <input
            type="search"
            placeholder="Search for a component or username"
            onChange={(e) => search(e.target.value)}
            className="w-full p-3 border border-black focus:outline-none focus:ring-4 focus:ring-forest-green/20 rounded-xl"
          />
        </div>
      </section>
      <section className="mx-auto max-w-5xl py-12 flex flex-col gap-4">
        {components.length > 0 ? (
          components.map(({ name, username, code }) => (
            <ComponentCard
              key={name}
              name={name}
              username={username}
              code={code}
            />
          ))
        ) : (
          <div className="text-center">
            {loading ? <p>Loading...</p> : <p>No components found</p>}
          </div>
        )}
      </section>
    </>
  );
}
