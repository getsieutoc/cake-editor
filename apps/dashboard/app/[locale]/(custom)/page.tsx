import { getDictionary } from '@/utils/dictionary';
import { Locale } from '@/types';
import { Editor } from '@sieutoc/cake-editor';

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const { page } = await getDictionary(locale);

  return (
    <section>
      <div>
        <h1>{page.home.title}</h1>
        <p>{page.home.description}</p>
        <Editor />
      </div>
    </section>
  );
}
