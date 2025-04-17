import { FC, useEffect, useRef, useState } from "react";
import { CDN_LINK, DEF_CODE } from "../constants/misc";
import { ILanguage, LANGUAGES } from "../constants/languages";
import usePanelSettings from "../hooks/usePanelSettings";

// CodeMirror types
interface CodeMirrorEditor {
  setOption: (option: string, value: any) => void;
  setValue: (value: string) => void;
  getValue: () => string;
  on: (event: string, handler: (cm: CodeMirrorEditor, change: any) => void) => void;
}

interface CodeMirrorStatic {
  modeURL: string;
  fromTextArea: (textarea: HTMLTextAreaElement, options: any) => CodeMirrorEditor;
  autoLoadMode: (editor: CodeMirrorEditor, mode: string) => void;
}

interface HighlightJS {
  highlightAuto: (code: string, languages?: string[]) => { language?: string };
}

const CodeEditor: FC = () => {
  const { lineNumber, language, setPredictions, font } = usePanelSettings();
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const editorInstance = useRef<CodeMirrorEditor | null>(null);
  const [code, setCode] = useState<string>(DEF_CODE);
  const [memoization, setMemoization] = useState<string[]>([]);

  const detectLanguage = (): ILanguage | null => {
    const hljs = window as unknown as { hljs: HighlightJS };
    if (!hljs.hljs) return null;
    
    const result = hljs.hljs.highlightAuto(code);
    if (!result.language) return null;

    return LANGUAGES.find(lang => 
      lang.highlight.includes(result.language!)
    ) || null;
  };

  const loadMode = (lang: ILanguage) => {
    if (lang.mode !== "auto") {
      if (!memoization.includes(lang.mode)) {
        const cm = window as unknown as { CodeMirror: CodeMirrorStatic };
        if (editorInstance.current) {
          cm.CodeMirror.autoLoadMode(editorInstance.current, lang.mode);
          setMemoization([...memoization, lang.mode]);
        }
      }
      if (editorInstance.current) {
        editorInstance.current.setOption("mode", lang.mode);
      }
    }
  };

  const handleChange = () => {
    const lang = detectLanguage();
    if (lang) {
      if (language.mode === "auto") {
        setPredictions(lang);
      } else {
        setPredictions(null);
      }
      loadMode(lang);
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.classList.remove("chakra-textarea");
      editorRef.current.classList.remove("css-ofmset");
      editorRef.current.classList.add("code-editor");

      const cm = window as unknown as { CodeMirror: CodeMirrorStatic };
      cm.CodeMirror.modeURL = CDN_LINK;

      editorInstance.current = cm.CodeMirror.fromTextArea(editorRef.current, {
        lineNumbers: lineNumber,
        lineWrapping: true,
        theme: "dracula",
        fontFamily: font
      });

      editorInstance.current.setValue("// Code Snippet\nfunction helloWorld() {\n  console.log('Hello, World!');\n}\n\n// Call the function\nhelloWorld();");

      editorInstance.current.on("change", () => {
        if (editorInstance.current) {
          setCode(editorInstance.current.getValue());
        }
      });
    }
  }, []);

  useEffect(() => {
    if (language.mode === "auto") {
      handleChange();
    }
  }, [code]);

  useEffect(() => {
    if (language.mode === "auto") {
      handleChange();
    } else {
      loadMode(language);
    }
  }, [language]);

  useEffect(() => {
    if (editorInstance.current) {
      editorInstance.current.setOption("lineNumbers", lineNumber);
      editorInstance.current.setOption("fontFamily", font);
    }
  }, [lineNumber, font]);

  return (
    <textarea
      placeholder={DEF_CODE}
      ref={editorRef}
      value={code}
      onChange={() => console.log()}
      style={{ fontFamily: font }}
    />
  );
};

export default CodeEditor;
