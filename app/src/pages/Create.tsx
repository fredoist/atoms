import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  useActiveCode,
} from '@codesandbox/sandpack-react';
import { useState } from 'react';

export default function Create() {
  const { code } = useActiveCode();
  const [currentCode, setCurrentCode] = useState(code);

  return (
    <>
      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl text-slate-blue">
          <div className="flex items-center justify-between my-4">
            <h3
              className="text-lg focus:outline-none"
              contentEditable
              suppressContentEditableWarning
            >
              MyComponent
            </h3>
            <button
              type="button"
              onClick={() => setCurrentCode(code)}
              className="inline-block uppercase leading-none py-2 px-3 rounded-lg bg-forest-green text-white hover:ring-4 hover:ring-forest-green/20"
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
