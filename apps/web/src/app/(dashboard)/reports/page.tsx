import { moduleIcons, PlaceholderPage } from '@/components/placeholder-page';

export default function ReportsPage() {
  return (
    <PlaceholderPage
      title="Rapports"
      description="Générez des analyses, exportez des données et consultez les rapports de performance."
      icon={moduleIcons.reports}
      actionLabel="Générer un rapport"
    />
  );
}
