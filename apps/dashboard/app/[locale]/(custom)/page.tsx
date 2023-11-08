'use client';
import dynamic from 'next/dynamic';
import { Spinner, Box } from '@/components/chakra';
import { Locale } from '@/types';
import { Editor } from '@sieutoc/cake-editor';
import { models } from './data';
const CakeEditorSSR = dynamic(() => Promise.resolve(Editor), {
  ssr: false,
  loading: () => (
    <Box>
      loading...
      <Spinner size="xs" />
    </Box>
  ),
});

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  return (
    <section>
      <div>
        <CakeEditorSSR
          background="/img/christmas_photo_studio_07_1k.hdr"
          models={models}
        />
      </div>
    </section>
  );
}
