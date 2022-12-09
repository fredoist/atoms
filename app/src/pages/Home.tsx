import { Sandpack } from "@codesandbox/sandpack-react";
import { sandpackDark } from "@codesandbox/sandpack-themes";
import { api } from "@config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [components, setComponents] = useState<[]>([]);

  useEffect(() => {
    async function getComponents() {
      try {
        const req = await fetch(`${api}/components`);
        const data = await req.json();
        setComponents(data);
      } catch (error) {
        console.error(error);
      }
    }
    getComponents();
  }, []);

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
      <section className="mx-auto max-w-5xl py-12">
        {components?.map((component: any) => (
          <div key={component.name}>
            <Link
              to={`/@${component.username}/${component.name}`}
              className="text-forest-green inline-block mb-5"
            >
              {component.name} ↗
            </Link>
            <Sandpack
              template="react"
              theme={sandpackDark}
              files={{ "App.js": component.code }}
            />
          </div>
        ))}
      </section>
    </>
  );
}
