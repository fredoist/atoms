import { Link } from 'react-router-dom';
import SandpackEditor from './SandpackEditor';

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
    <div key={name} className="border border-black rounded-xl overflow-hidden">
      <SandpackEditor code={code} hideEditor={true} />
      <div className="p-2 border-t border-black">
        <Link
          to={`/@${username}/${name}`}
          className="text-forest-green inline-block hover:underline"
        >
          {name}
        </Link>
      </div>
    </div>
  );
}
