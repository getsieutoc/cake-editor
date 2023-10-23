export interface EditorProps {
   title?: string;
}

export function Editor(props: EditorProps) {
   return <div>{props.title ?? "Cake Editor"}</div>;
}

Editor.displayName = "Editor";
