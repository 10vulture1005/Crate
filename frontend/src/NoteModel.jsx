import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from "@heroui/react";

export default function NoteModel({ isOpen, onClose, onSave, initialNote, isEditMode, isDarkMode }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  // Reset form when modal opens/closes or initialNote changes
  useEffect(() => {
    if (isOpen) {
      if (isEditMode && initialNote) {
        // Pre-fill form with existing note data
        setTitle(initialNote.title || "");
        setContent(initialNote.content || "");
      } else {
        // Clear form for new note
        setTitle("");
        setContent("");
      }
      setErrors({});
    }
  }, [isOpen, initialNote, isEditMode]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim().length < 1) {
      newErrors.title = "Title must be at least 3 characters long";
    }
    
    if (!content.trim()) {
      newErrors.content = "Content is required";
    } else if (content.trim().length < 1) {
      newErrors.content = "Content must be at least 10 characters long";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const noteData = {
        title: title.trim(),
        content: content.trim(),
        // Include any existing note properties when editing
        ...(isEditMode && initialNote ? { id: initialNote.id } : {})
      };
      
      onSave(noteData);
      handleClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    setContent("");
    setErrors({});
    onClose();
  };

  const handleKeyDown = (e) => {
    // Allow saving with Ctrl+Enter
    if (e.ctrlKey && e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      size="2xl"
      scrollBehavior="inside"
      backdrop="blur"
      classNames={{
        backdrop: "bg-black/50 backdrop-blur-md backdrop-saturate-150",
        wrapper: "backdrop-blur-sm",
        base: isDarkMode ? "dark" : "",
      }}
    >
      <ModalContent className={`transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className={`text-2xl font-bold transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {isEditMode ? "Edit Note" : "Create New Note"}
          </h2>
          <p className={`text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {isEditMode ? "Update your existing note" : "Add a new note to your collection"}
          </p>
        </ModalHeader>
        
        <ModalBody className="gap-4">
          <div className="flex flex-col gap-2">
            <Input
              label="Note Title"
              placeholder="Enter note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              variant="bordered"
              size="lg"
              isInvalid={!!errors.title}
              errorMessage={errors.title}
              classNames={{
                input: `text-lg transition-colors duration-300 ${
                  isDarkMode ? 'text-white placeholder:text-gray-400' : 'text-gray-900 placeholder:text-gray-500'
                }`,
                label: `font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`,
                inputWrapper: `transition-colors duration-300 ${
                  isDarkMode 
                    ? 'border-gray-600 hover:border-gray-500 focus-within:border-blue-400' 
                    : 'border-gray-300 hover:border-gray-400 focus-within:border-blue-500'
                }`,
                innerWrapper: isDarkMode ? 'bg-gray-700' : 'bg-white',
                base: isDarkMode ? 'data-[hover=true]:bg-gray-700' : ''
              }}
              autoFocus
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <Textarea
              label="Note Content"
              placeholder="Write your note content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              variant="bordered"
              size="lg"
              minRows={8}
              maxRows={15}
              isInvalid={!!errors.content}
              errorMessage={errors.content}
              classNames={{
                input: `text-base leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? 'text-white placeholder:text-gray-400' : 'text-gray-900 placeholder:text-gray-500'
                }`,
                label: `font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`,
                inputWrapper: `transition-colors duration-300 ${
                  isDarkMode 
                    ? 'border-gray-600 hover:border-gray-500 focus-within:border-blue-400' 
                    : 'border-gray-300 hover:border-gray-400 focus-within:border-blue-500'
                }`,
                innerWrapper: isDarkMode ? 'bg-gray-700' : 'bg-white',
                base: isDarkMode ? 'data-[hover=true]:bg-gray-700' : ''
              }}
            />
          </div>
          
          <div className="flex justify-between items-center text-sm mt-2">
            <span className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Press Ctrl+Enter to save quickly
            </span>
          </div>
        </ModalBody>
        
        <ModalFooter className="gap-3">
          <Button 
            color="danger" 
            variant="light" 
            onPress={handleClose}
            size="lg"
            className={`transition-colors duration-300 ${
              isDarkMode ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20' : ''
            }`}
          >
            Cancel
          </Button>
          <Button 
            color="primary" 
            onPress={handleSave}
            size="lg"
            className={`font-semibold transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isEditMode ? "Update Note" : "Save Note"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}