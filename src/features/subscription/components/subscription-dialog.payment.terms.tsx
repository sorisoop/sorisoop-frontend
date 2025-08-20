export default function SubscriptionDialogPaymentTerms() {
  return (
    <div className="text-center mb-4">
      <p className="text-sm text-muted-foreground mb-4">매월/매년 자동 결제되며, 언제든지 해지할 수 있어요.</p>
      <div className="flex justify-center gap-4 text-sm">
        <button className="text-muted-foreground underline">유료 이용약관</button>
        <button className="text-muted-foreground underline">개인정보 처리방침</button>
      </div>
    </div>
  );
}
