import React, { useState } from "react";
import TemplateSelection from "./TemplateSelection";
import ProfileCreation from "./ProfileCreation";

export default function Create() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  return selectedTemplate ? (
    <ProfileCreation template={selectedTemplate} />
  ) : (
    <TemplateSelection onTemplateSelect={handleTemplateSelect} />
  );
}
