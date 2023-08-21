export const saveBlob = (function () {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.setAttribute("style", "display: none");

  return function (blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
})();
