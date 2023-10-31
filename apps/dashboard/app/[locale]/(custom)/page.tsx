'use client';

import { Locale } from '@/types';
import { Editor } from '@sieutoc/cake-editor';
import { models } from './data';
// import { getDictionary } from '@/utils/dictionary';
export default async function HomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  // const { page } = await getDictionary(locale);

  return (
    <section>
      <div>
        <Editor
          background="/img/christmas_photo_studio_07_1k.hdr"
          models={models}
        />
      </div>
    </section>
  );
}
