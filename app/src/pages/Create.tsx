import { Sandpack, useSandpackTheme } from '@codesandbox/sandpack-react';

export default function Create() {
  const { theme } = useSandpackTheme();

  const code = `export default function MyComponent() {\n  return <h1>Hello World</h1>\n}`;

  return (
    <>
      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl">
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
              className="inline-block py-1 px-3 rounded-lg bg-forest-green text-white hover:ring-4 hover:ring-forest-green/20"
            >
              Publish
            </button>
          </div>
          <Sandpack
            template="react"
            files={{ '/App.js': code }}
            options={{ editorHeight: 450 }}
            theme={{
              ...theme,
              colors: {
                ...theme.colors,
                surface1: '#001e2b',
                surface2: '#001e2b',
                surface3: '#02343080',
                hover: '#00ed64',
                accent: '#00ed64',
              },
              syntax: {
                ...theme.syntax,
                keyword: '#00ed64',
                plain: '#ffffff',
                property: '#00684a',
                tag: '#00ed64',
                punctuation: '#ffffff',
                string: '#00684a',
                static: '#00684a',
                comment: '#00684a',
                definition: '#00684a',
              },
            }}
          />
        </div>
      </section>
    </>
  );
}
