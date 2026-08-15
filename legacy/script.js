// Legacy implementation preserved from the original main branch.
// This file intentionally remains unchanged in behavior for the legacy experience.

function autoDetectLanguage(code) {
  if (/^\s*#/.test(code) || code.includes("def ") || code.includes("import ")) return 'python';
  if (code.includes("function") || code.includes("console.log") || /\b(var|let|const)\b/.test(code)) return 'javascript';
  if (code.includes("public class") || code.includes("System.out.println")) return 'java';
  if (code.includes("#include")) return 'cpp';
  if (code.includes("<!DOCTYPE html>") || code.includes("<html")) return 'html';
  if (code.includes("body {") || code.includes("color:")) return 'css';
  return 'javascript';
}

function removeComments(code, language) {
  let processedCode = code;
  switch (language) {
    case 'javascript':
    case 'java':
    case 'cpp':
    case 'css':
      processedCode = processedCode.replace(/\/\/.*$/gm, '');
      processedCode = processedCode.replace(/\/\*[\s\S]*?\*\//gm, '');
      break;
    case 'python':
      processedCode = processedCode.replace(/#.*$/gm, '');
      break;
    case 'html':
      processedCode = processedCode.replace(/<!--[\s\S]*?-->/gm, '');
      break;
    default:
      processedCode = processedCode.replace(/\/\/.*$/gm, '');
      processedCode = processedCode.replace(/\/\*[\s\S]*?\*\//gm, '');
  }
  return processedCode;
}

function updatePreview() {
  const codeInput = document.getElementById('codeInput').value;
  let language = document.getElementById('languageSelect').value;
  if (!language) language = autoDetectLanguage(codeInput);
  const processed = removeComments(codeInput, language);
  const codeBlock = document.querySelector('#processedCode code');
  codeBlock.textContent = processed;
  codeBlock.className = `language-${language}`;
  Prism.highlightElement(codeBlock);
}

function copyToClipboard() {
  const processedCode = document.querySelector('#processedCode code').textContent;
  navigator.clipboard.writeText(processedCode).then(() => alert('Processed code copied to clipboard!'));
}

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
  URL.revokeObjectURL(url);
}

function handleFileUpload(file) {
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById('codeInput').value = e.target.result;
    updatePreview();
  };
  reader.readAsText(file);
}

function init() {
  const codeInput = document.getElementById('codeInput');
  const fileInput = document.getElementById('fileInput');
  const uploadBtn = document.getElementById('uploadBtn');
  const copyBtn = document.getElementById('copyBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const languageSelect = document.getElementById('languageSelect');
  const uploadStatus = document.getElementById('uploadStatus');
  codeInput.addEventListener('input', updatePreview);
  languageSelect.addEventListener('change', updatePreview);
  uploadBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', e => {
    if (e.target.files.length) {
      handleFileUpload(e.target.files[0]);
      uploadStatus.textContent = `Loaded: ${e.target.files[0].name}`;
    }
  });
  codeInput.addEventListener('dragover', e => { e.preventDefault(); codeInput.classList.add('dragover'); });
  codeInput.addEventListener('dragleave', () => codeInput.classList.remove('dragover'));
  codeInput.addEventListener('drop', e => {
    e.preventDefault();
    codeInput.classList.remove('dragover');
    if (e.dataTransfer.files.length) {
      handleFileUpload(e.dataTransfer.files[0]);
      uploadStatus.textContent = `Loaded: ${e.dataTransfer.files[0].name}`;
    }
  });
  copyBtn.addEventListener('click', copyToClipboard);
  downloadBtn.addEventListener('click', downloadFile);
  updatePreview();
  document.addEventListener('keydown', e => { if (e.ctrlKey && e.key === 'Enter') updatePreview(); });
}

document.addEventListener('DOMContentLoaded', init);
