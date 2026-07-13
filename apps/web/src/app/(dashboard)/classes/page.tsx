import { moduleIcons, PlaceholderPage } from '@/components/placeholder-page';

export default function ClassesPage() {
  return (
    <PlaceholderPage
      title="Classes"
      description="Organisez les classes, sections, emplois du temps et attributions de salles."
      icon={moduleIcons.classes}
      actionLabel="Créer une classe"
    />
  );
}
