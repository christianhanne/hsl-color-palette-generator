/**
 * Downloads a file with the given content & mime type.
 *
 * @param {string} name
 *   Name of the file.
 * @param {string} content
 *   Content of the file.
 * @param {string} mimeType
 *   Mime type for the data url.
 */
export function download(name, content, mimeType) {
    let contentsEncoded = encodeURIComponent(content);

    let dl = document.createElement('a');
    document.body.appendChild(dl);

    dl.setAttribute('href', `data:${mimeType},${contentsEncoded}`);
    dl.setAttribute('download', name);
    dl.click();
}
