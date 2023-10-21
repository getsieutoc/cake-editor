export interface EditorProps {
   title?: string;
}

export function Editor(props: EditorProps) {
   return <div>{props.title ?? "Cake Editor 12312"}</div>;
}

Editor.displayName = "Editor";
