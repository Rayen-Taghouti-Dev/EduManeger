import { moduleIcons, PlaceholderPage } from '@/components/placeholder-page';

export default function SettingsPage() {
  return (
    <PlaceholderPage
      title="Paramètres"
      description="Configurez l'image de marque, les années scolaires, les rôles et les préférences système."
      icon={moduleIcons.settings}
      actionLabel="Configurer l'établissement"
    />
  );
}
