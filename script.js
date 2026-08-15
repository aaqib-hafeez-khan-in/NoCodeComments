// script.js

/**
 * Auto-detect language based on code patterns.
 * This is a basic implementation; enhanced AI-powered detection could be integrated.
 */
function autoDetectLanguage(code) {
  if (/^\s*#/.test(code) || code.includes("def ") || code.includes("import ")) {
    return 'python';
  } else if (code.includes("function") || code.includes("console.log") || /\b(var|let|const)\b/.test(code)) {
    return 'javascript';
  } else if (code.includes("public class") || code.includes("System.out.println")) {
    return 'java';
  } else if (code.includes("#include")) {
    return 'cpp';
  } else if (code.includes("<!DOCTYPE html>") || code.includes("<html")) {
    return 'html';
  } else if (code.includes("body {") || code.includes("color:")) {
    return 'css';
  }
  return 'javascript'; // Fallback language
}

/**
 * Remove comments from code based on the specified language.
 * Uses regex-based removal; AST parsing and AI-powered heuristics can be integrated for edge cases.
 */
function removeComments(code, language) {
  let processedCode = code;

  switch (language) {
    case 'javascript':
    case 'java':
    case 'cpp':
    case 'css':
      // Remove single-line comments (//)
      processedCode = processedCode.replace(/\/\/.*$/gm, '');
      // Remove multi-line comments (/* ... */)
      processedCode = processedCode.replace(/\/\*[\s\S]*?\*\//gm, '');
      break;
    case 'python':
      // Remove inline comments (#)
      processedCode = processedCode.replace(/#.*$/gm, '');
      // Optionally, remove docstrings (triple quotes) – careful: may remove legitimate strings!
      // processedCode = processedCode.replace(/("{3}|'{3})[\s\S]*?\1/gm, '');
      break;
    case 'html':
      // Remove HTML comments (<!-- -->)
      processedCode = processedCode.replace(/<!--[\s\S]*?-->/gm, '');
      break;
    default:
      // Fallback: attempt JavaScript style removal
      processedCode = processedCode.replace(/\/\/.*$/gm, '');
      processedCode = processedCode.replace(/\/\*[\s\S]*?\*\//gm, '');
      break;
  }

  return processedCode;
}

/**
 * Update the live preview by processing the input code.
 */
function updatePreview() {
  const codeInput = document.getElementById('codeInput').value;
  let language = document.getElementById('languageSelect').value;
  if (!language) {
    language = autoDetectLanguage(codeInput);
  }
  const processed = removeComments(codeInput, language);
  const codeBlock = document.querySelector('#processedCode code');
  codeBlock.textContent = processed;

  // Dynamically update the Prism.js language class for syntax highlighting
  codeBlock.className = `language-${language}`;
  Prism.highlightElement(codeBlock);
}

/**
 * Copy the processed code to the clipboard.
 */
function copyToClipboard() {
  const processedCode = document.querySelector('#processedCode code').textContent;
  navigator.clipboard.writeText(processedCode).then(() => {
    alert('Processed code copied to clipboard!');
  }).catch(err => {
    console.error('Error copying text: ', err);
  });
}

/**
 * Download the processed code as a text file.
 */
function downloadFile() {
  const processedCode = document.querySelector('#processedCode code').textContent;
  const blob = new Blob([processedCode], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'processed_code.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Handle file uploads and populate the textarea.
 */
function handleFileUpload(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('codeInput').value = e.target.result;
    updatePreview();
  };
  reader.readAsText(file);
}

/**
 * Initialize event listeners for live processing, drag-and-drop, and additional features.
 */
function init() {
  const codeInput = document.getElementById('codeInput');
  const fileInput = document.getElementById('fileInput');
  const uploadBtn = document.getElementById('uploadBtn');
  const copyBtn = document.getElementById('copyBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const languageSelect = document.getElementById('languageSelect');
  const uploadStatus = document.getElementById('uploadStatus');

  // Live preview as the user types
  codeInput.addEventListener('input', updatePreview);
  languageSelect.addEventListener('change', updatePreview);

  // File upload button click
  uploadBtn.addEventListener('click', () => fileInput.click());

  // File upload change event
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
      uploadStatus.textContent = `Loaded: ${e.target.files[0].name}`;
    }
  });

  // Drag and drop functionality for codeInput
  codeInput.addEventListener('dragover', (e) => {
    e.preventDefault();
    codeInput.classList.add('dragover');
  });
  codeInput.addEventListener('dragleave', () => {
    codeInput.classList.remove('dragover');
  });
  codeInput.addEventListener('drop', (e) => {
    e.preventDefault();
    codeInput.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
      uploadStatus.textContent = `Loaded: ${e.dataTransfer.files[0].name}`;
    }
  });

  // Copy processed code to clipboard
  copyBtn.addEventListener('click', copyToClipboard);

  // Download processed code
  downloadBtn.addEventListener('click', downloadFile);

  // Initial preview update
  updatePreview();

  // Example keyboard shortcut: Ctrl+Enter to update preview manually
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      updatePreview();
    }
  });
}

// Initialize the tool once the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', init);
