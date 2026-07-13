import { moduleIcons, PlaceholderPage } from '@/components/placeholder-page';

export default function GradesPage() {
  return (
    <PlaceholderPage
      title="Notes"
      description="Suivez les évaluations, carnets de notes, bulletins et performances académiques."
      icon={moduleIcons.grades}
      actionLabel="Créer une évaluation"
    />
  );
}
