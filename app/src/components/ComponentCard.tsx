import { Sandpack } from "@codesandbox/sandpack-react";
import { sandpackDark } from "@codesandbox/sandpack-themes";
import { Link } from "react-router-dom";

type ComponentCardProps = {
  name: string;
  username: string;
  code: string;
};

export default function ComponentCard({
  name,
  username,
  code,
}: ComponentCardProps) {
  return (
    <div key={name}>
      <Link
        to={`/@${username}/${name}`}
        className="text-forest-green inline-block mb-5"
      >
        {name}
      </Link>
      <Sandpack
        template="react"
        theme={sandpackDark}
        files={{ "App.js": code }}
      />
    </div>
  );
}
