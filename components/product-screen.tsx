type ProductScreenProps = {
  type: 'alert' | 'lead' | 'pipeline';
};

const screenLabels = {
  alert: 'TradieRelay hot lead alert showing a recovered missed plumbing call',
  lead: 'TradieRelay qualified job showing a plumbing lead, customer details and next actions',
  pipeline: 'TradieRelay job pipeline showing jobs that need action, are waiting or are booked',
};

export function ProductScreen({ type }: ProductScreenProps) {
  return (
    <div className={`product-screen product-screen-${type}`} role="img" aria-label={screenLabels[type]}>
      <div className="product-screen-status"><strong>2:18</strong><span>▮▮▮</span></div>
      {type === 'alert' && <AlertScreen />}
      {type === 'lead' && <LeadScreen />}
      {type === 'pipeline' && <PipelineScreen />}
    </div>
  );
}

function AlertScreen() {
  return (
    <div className="product-screen-body ps-alert-screen">
      <div className="ps-screen-nav"><span>‹</span><strong>GC Plumbing · TradieRelay</strong></div>
      <div className="ps-message-date">MON 9:03AM</div>
      <div className="ps-message-bubble ps-message-muted">
        <small>WEEKLY WRAP</small>
        <p><strong>11 calls answered</strong><br />8 jobs captured · 3 booked</p>
      </div>
      <div className="ps-message-bubble ps-message-hot">
        <small>URGENT LEAD</small>
        <p><strong>Missed call caught · 2:14pm</strong></p>
        <p>Sarah Mitchell · Burleigh Waters<br />Burst flexi hose under kitchen sink</p>
        <ul><li>Water isolated</li><li>Needs help today</li><li>1 photo attached</li></ul>
        <b>Open job and choose next step →</b>
      </div>
      <div className="ps-message-time">Delivered 2:16pm</div>
    </div>
  );
}

function LeadScreen() {
  return (
    <div className="product-screen-body ps-lead-screen">
      <div className="ps-screen-nav"><span>‹</span><strong>Qualified job</strong><em>•••</em></div>
      <div className="ps-lead-heading"><div><small>NEW · CAPTURED BY AI</small><h4>Sarah Mitchell</h4><p>Burleigh Waters</p></div><b>URGENT</b></div>
      <div className="ps-job-title"><strong>Burst flexi hose</strong><span>Customer needs help promptly</span></div>
      <div className="ps-ai-note">✦ AI captured · check anything uncertain</div>
      <div className="ps-info-card"><small>WHAT THEY NEED</small><p>Burst flexi hose under the kitchen sink. Water is leaking. Caller says the mains are off.</p></div>
      <div className="ps-captured-grid"><div><small>SUBURB</small><strong>Burleigh Waters</strong></div><div><small>BEST TIME</small><strong>This arvo</strong></div></div>
      <div className="ps-evidence-row"><span>▧</span><div><small>CUSTOMER EVIDENCE</small><strong>1 photo attached</strong></div><b>View</b></div>
      <div className="ps-screen-actions"><span>Call customer</span><strong>Choose next step</strong></div>
    </div>
  );
}

function PipelineScreen() {
  const needsYou = [
    ['Sarah Mitchell', 'Burst flexi hose', 'URGENT'],
    ['James Ryan', 'Draft quote ready', 'QUOTE'],
  ];
  const waiting = [['Emma Taylor', 'Quote sent · viewed today', 'SENT']];
  const booked = [['Tom Bradley', 'Tomorrow · 8–10am', 'BOOKED'], ['Kim Lee', 'Friday · morning', 'BOOKED']];

  return (
    <div className="product-screen-body ps-pipeline-screen">
      <div className="ps-screen-nav"><strong>Your jobs</strong><em>•••</em></div>
      <PipelineGroup title="NEEDS YOU · 2" rows={needsYou} />
      <PipelineGroup title="WAITING ON CUSTOMER · 1" rows={waiting} />
      <PipelineGroup title="BOOKED · 2" rows={booked} />
      <div className="ps-bottom-nav"><b>▣<small>Jobs</small></b><span>▤<small>Quotes</small></span><span>◎<small>Customers</small></span></div>
    </div>
  );
}

function PipelineGroup({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <section className="ps-pipeline-group">
      <h5>{title}</h5>
      {rows.map(([name, detail, status]) => (
        <div className="ps-pipeline-row" key={`${name}-${status}`}>
          <div><strong>{name}</strong><span>{detail}</span></div><b className={`ps-status-${status.toLowerCase()}`}>{status}</b>
        </div>
      ))}
    </section>
  );
}
