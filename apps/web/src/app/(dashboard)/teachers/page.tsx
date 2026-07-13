import { moduleIcons, PlaceholderPage } from '@/components/placeholder-page';

export default function TeachersPage() {
  return (
    <PlaceholderPage
      title="Enseignants"
      description="Gérez le personnel enseignant, les affectations, les horaires et les performances."
      icon={moduleIcons.teachers}
      actionLabel="Inviter un enseignant"
    />
  );
}
