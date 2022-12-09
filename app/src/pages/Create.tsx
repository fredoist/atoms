import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  useActiveCode,
} from "@codesandbox/sandpack-react";
import { app } from "@config";
import { useAuth } from "@hooks";
import React, { useState } from "react";

export default function Create() {
  const { user } = useAuth();
  const { code } = useActiveCode();
  const [name, setName] = useState("MyComponent");
  const [loading, setLoading] = useState(false);

  const saveComponent = async (code: string) => {
    try {
      setLoading(true);
      const { name: component } = await app.currentUser?.functions.callFunction(
        "create_component",
        {
          name,
          code,
        }
      );
      setLoading(false);
      history.pushState({}, "", `/@${user?.customData.username}/${component}`);
    } catch (error) {
      console.error(error);
    }
  };

  const updateComponentName = (e: React.FormEvent<HTMLHeadingElement>) => {
    const name = e.currentTarget.textContent;
    if (name) {
      setName(name);
    }
  };

  return (
    <>
      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl text-slate-blue font-sans">
          <div className="flex items-center justify-between my-4">
            <h3
              className="text-lg focus:outline-none"
              onInput={updateComponentName}
              contentEditable
              suppressContentEditableWarning
            >
              MyComponent
            </h3>
            <button
              type="button"
              onClick={() => saveComponent(code)}
              disabled={loading}
              className="inline-block uppercase leading-none py-2 px-3 rounded-lg bg-forest-green disabled:bg-forest-green/80 disabled:cursor-wait text-white hover:ring-4 hover:ring-forest-green/20"
            >
              Publish
            </button>
          </div>
          <div className="[--sp-layout-height:28rem] [--sp-border-radius:0.75rem]">
            <SandpackLayout>
              <SandpackCodeEditor
                showRunButton={false}
                showLineNumbers={false}
                showTabs={false}
              />
              <SandpackPreview />
            </SandpackLayout>
          </div>
        </div>
      </section>
    </>
  );
}
