import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react';
import { sandpackDark } from '@codesandbox/sandpack-themes';

type SandpackEditorProps = {
  code: string;
  hideEditor?: boolean;
  hidePreview?: boolean;
};

export default function SandpackEditor({
  code,
  hideEditor = false,
  hidePreview = false,
}: SandpackEditorProps) {
  return (
    <SandpackProvider
      theme={sandpackDark}
      template="react"
      files={{ 'App.js': code }}
    >
      <SandpackLayout style={{ border: 0, height: '28rem' }}>
        {!hideEditor && (
          <SandpackCodeEditor wrapContent style={{ height: '100%' }} />
        )}
        {!hidePreview && <SandpackPreview style={{ height: '100%' }} />}
      </SandpackLayout>
    </SandpackProvider>
  );
}
