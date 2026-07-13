import { moduleIcons, PlaceholderPage } from '@/components/placeholder-page';

export default function FinancePage() {
  return (
    <PlaceholderPage
      title="Finance"
      description="Gérez les structures tarifaires, facturation, paiements et rapports financiers."
      icon={moduleIcons.finance}
      actionLabel="Créer une facture"
    />
  );
}
