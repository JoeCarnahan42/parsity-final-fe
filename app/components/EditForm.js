// TODO - Finish component (component is for updating comments and blockers. changing severity, description, etc)
import axios from "axios";
import { useState } from "react";
import { useWindowContext } from "../context/WindowContext";

// Components
import { BlockerEdit } from "./BlockerEdit";
import { CommentEdit } from "./CommentEdit";
import { ProjectEdit } from "./ProjectEdit";

export const EditForm = () => {
  // import which form is being changed from context
  const [whatToEdit] = useWindowContext();

  const handleSubmit = () => {
    // Submission logic. PUT requests
  };

  switch (whatToEdit) {
    case "comment":
      return <CommentEdit />;
    case "blocker":
      return <BlockerEdit />;
    case "project":
      return <ProjectEdit />;
  }
};
