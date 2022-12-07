export default function Home() {
  return (
    <>
      <section className="px-4 py-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl lg:text-5xl text-center mb-12">
            Create, share, and collab on your React components
          </h1>
          <form>
            <input
              type="search"
              placeholder="Search for a component"
              className="w-full p-3 border border-black focus:outline-none focus:ring-4 focus:ring-forest-green/20 rounded-xl"
            />
          </form>
        </div>
      </section>
    </>
  );
}
