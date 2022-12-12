import { api } from "@config";
import { useEffect, useState } from "react";
import { entity } from "simpler-state";

type Result = {
  name: string;
  username: string;
  code: string;
};

const components = entity<Result[]>([]);

export default function useSearch() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComponents = async () => {
      setLoading(true);
      const results = await fetch(`${api}/search`).then((r) => r.json());
      components.set(results);
      setLoading(false);
    };

    fetchComponents();
  }, []);

  const search = async (query: string) => {
    setLoading(true);
    const results = await fetch(`${api}/search?q=${query}`).then((r) =>
      r.json()
    );
    components.set(results);
    setLoading(false);
  };

  return {
    components: components.use(),
    loading,
    search,
  };
}
