// import { dataURLtoFile } from 'app/storage/lib/base64ToFile';
// import { createBlob, generateBlobName, getBlobData } from '../../src/app/storage/controller/storage.controller';

// test('Should create a blobName', () => {
//     const name = 'test';
//     const ext = 'txt';
//     const blobName = generateBlobName(name, ext);

//     expect(blobName.localeCompare('test.txt') === 0).toBe(false);
//     expect(blobName.startsWith('test-') && blobName.endsWith('.txt')).toBe(true);
//     expect(blobName.length > 0).toBe(true);
// });

// test('dataURLtoFile', () => {
//     const dataURL = 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==';
//     const file = dataURLtoFile(dataURL, 'test.txt');
//     expect(file.name).toBe('test.txt');
//     expect(file.type).toBe('text/plain');
//     file.arrayBuffer().then((buffer) => {
//         const bf = new Buffer.from(buffer);
//         expect(bf).toBeInstanceOf(Buffer);
//         expect(bf.toString()).toBe('Hello, World!');
//     });
// });

// test('Testing uploading a file', async () => {
//     const dataURL = 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==';
//     const file = dataURLtoFile(dataURL, 'test.txt');

//     let fileName = '';
//     await createBlob(fileName, file)
//         .catch((err) => expect(err.message).toBe('Invalid Blob Name'));

//     fileName = 'test.txt';
//     await createBlob(fileName, '')
//         .catch((err) => expect(err.message).toBe('Invalid File'));

//     fileName = 'test.txt';
//     await createBlob(fileName, file)
//         .then((file) => {
//             // expect(file.localeCompare('test.txt') === 0).toBe(false);
//             // expect(file.startsWith('test-') && file.endsWith('.txt')).toBe(true);
//             console.log(file);
//         })
// });

// test('Should download a file', async () => {
//     const dataURL = 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==';
//     const file = dataURLtoFile(dataURL, 'test.txt');

//     let fileName = 'test.txt';
//     createBlob(fileName, file)
//         .then((fileName) => {
//             getBlobData(fileName)
//                 .then((file) => {
//                     expect(typeof file === 'string').toBe(true);
//                 })
//                 .catch((err) => {
//                     expect(err.message).toBe('Error al obtener el archivo');
//                 });
//         })

// })