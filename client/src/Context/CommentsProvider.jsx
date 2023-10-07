import React, { useState } from "react";

export const CommentsContext = React.createContext();

const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const getClassComments = async (id_class) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_URL + `comments/class/${id_class}`,
        {
          method: "GET",
        }
      );
      const { result } = await res.json();

      setComments(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CommentsContext.Provider
      value={{ comments, getClassComments, setComments }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsProvider;
