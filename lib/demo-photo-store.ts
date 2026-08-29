export type DemoPhotoView = { id: string; jobId: string; name: string; contentType: string; sizeBytes: number; createdAt: string; url: string };
type DemoPhotoRecord = Omit<DemoPhotoView, 'url'> & { blob: Blob };

const databaseName = 'tradierelay-demo';
const storeName = 'job-photos';

function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    if (typeof indexedDB === 'undefined') { reject(new Error('Demo photo storage is unavailable.')); return; }
    const request = indexedDB.open(databaseName, 1);
    request.onerror = () => reject(request.error ?? new Error('Demo photo storage is unavailable.'));
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(storeName)) {
        const store = database.createObjectStore(storeName, { keyPath: 'id' });
        store.createIndex('jobId', 'jobId');
      }
    };
    request.onsuccess = () => resolve(request.result);
  });
}

export async function saveDemoPhoto(jobId: string, file: File) {
  const database = await openDatabase();
  const record: DemoPhotoRecord = { id: crypto.randomUUID(), jobId, name: file.name, contentType: file.type || 'image/jpeg', sizeBytes: file.size, createdAt: new Date().toISOString(), blob: file };
  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(storeName, 'readwrite');
    transaction.objectStore(storeName).put(record);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error ?? new Error('The demo photo could not be saved.'));
  });
  database.close();
  return { ...record, url: URL.createObjectURL(record.blob) };
}

export async function listDemoPhotos(jobId: string): Promise<DemoPhotoView[]> {
  const database = await openDatabase();
  const records = await new Promise<DemoPhotoRecord[]>((resolve, reject) => {
    const request = database.transaction(storeName, 'readonly').objectStore(storeName).index('jobId').getAll(jobId);
    request.onsuccess = () => resolve(request.result as DemoPhotoRecord[]);
    request.onerror = () => reject(request.error ?? new Error('The demo photos could not be loaded.'));
  });
  database.close();
  return records.sort((left, right) => right.createdAt.localeCompare(left.createdAt)).map((record) => ({ ...record, url: URL.createObjectURL(record.blob) }));
}

export function announceDemoPhoto(jobId: string) {
  if (typeof BroadcastChannel === 'undefined') return;
  const channel = new BroadcastChannel('tradierelay-demo');
  channel.postMessage({ type: 'photo_uploaded', jobId });
  channel.close();
}
