import React, { useState } from "react";


const TextAreaForm = ({handleFormSubmit, id}) => {
    const [content, setContent] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        // Test
        if (!content) {
          return null;
        }
        // console.log(content);
    
        // Call AddComment(content)
        handleFormSubmit(content);
    
        // Clean the textarea
        setContent("");
      };
    return (
        <form onSubmit={handleSubmit}>
            <textarea 
                name="text-area" 
                id={id}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type here... *Hold Shift+Enter to add new line*"
                onKeyPress={(e) => {
                    if (e.key === "Enter" && e.shiftKey) {
                      return;
                    }
                    if (e.key === "Enter" && !e.shiftKey) {
                      handleSubmit(e);
                    }
                  }}
                ></textarea>
        </form>
    )
}

export default TextAreaForm
