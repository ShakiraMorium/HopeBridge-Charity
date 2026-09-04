import { useLocation } from 'react-router-dom';

export function ReceiptPage() {
  const location = useLocation();
  const donation = location.state?.donation;

  const content = donation || {
    donorName: 'Guest Donor',
    amount: '0.00',
    date: new Date().toISOString().slice(0, 10),
    id: 'HB-0000',
    paymentMethod: 'Visa',
  };

  const printReceipt = () => window.print();

  return (
    <div className="container section-block receipt-page">
      <div className="receipt-card">
        <div className="receipt-header-row">
          <div>
            <span className="eyebrow accent">Donation receipt</span>
            <h1>Thank you for your generosity</h1>
          </div>
          <button type="button" className="primary-btn" onClick={printReceipt}>Print receipt</button>
        </div>

        <div className="receipt-body">
          <div className="receipt-meta">
            <span>Receipt ID</span>
            <strong>{content.id}</strong>
          </div>
          <div className="receipt-meta">
            <span>Donor</span>
            <strong>{content.donorName}</strong>
          </div>
          <div className="receipt-meta">
            <span>Amount</span>
            <strong>${Number(content.amount || 0).toFixed(2)}</strong>
          </div>
          <div className="receipt-meta">
            <span>Date</span>
            <strong>{content.date}</strong>
          </div>
          <div className="receipt-meta">
            <span>Payment method</span>
            <strong>{content.paymentMethod || 'Visa'}</strong>
          </div>
        </div>

        <p className="receipt-note">
          This receipt confirms that your donation supports HopeBridge programmes and helps bring clean water,
          education, and essential support to communities in need.
        </p>
      </div>
    </div>
  );
}
