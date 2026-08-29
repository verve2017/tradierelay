import type { Metadata } from 'next';
import { CustomerPhotos } from '../../photos/photo-uploader';

export const metadata: Metadata = { title: 'Customer photo demo | TradieRelay', robots: { index: false, follow: false } };

export default function DemoPhotosPage() { return <CustomerPhotos demo />; }
