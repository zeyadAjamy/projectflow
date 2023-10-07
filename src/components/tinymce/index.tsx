import { useRef, useImperativeHandle, forwardRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { TinyMceControlMethods } from "../../types";

type TinyMceProps = {
  initialContent: string;
};

export const TinyMce = forwardRef<TinyMceControlMethods, TinyMceProps>(
  ({ initialContent }, ref) => {
    const editorRef = useRef<{ getContent: () => string }>();

    const log = () => {
      if (editorRef.current) {
        return editorRef.current.getContent();
      }
    };

    useImperativeHandle(ref, () => ({
      log,
    }));

    return (
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialContent}
        init={{
          height: 200,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    );
  }
);
