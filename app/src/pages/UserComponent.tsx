import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  useActiveCode,
} from '@codesandbox/sandpack-react';
import { app } from '@config';
import { useAuth } from '@hooks';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function UserComponent() {
  const { user } = useAuth();
  const { code, updateCode } = useActiveCode();
  const { username, component } = useParams<{
    username: string;
    component: string;
  }>();
  const [name, setName] = useState('MyComponent');
  const [loading, setLoading] = useState(false);
  const isOwner = user?.customData.username === username;

  useEffect(() => {
    
  }, [component])

  const saveComponent = async (code: string) => {
    if(!isOwner) return;

    try {
      setLoading(true);
      console.log(component)
      await app.currentUser?.functions.callFunction(
        'save_component',
        {
          name: component,
          code,
        }
      );
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
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
        <div className="mx-auto max-w-5xl text-slate-blue">
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
              {isOwner ? 'Save' : 'Fork'}
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
