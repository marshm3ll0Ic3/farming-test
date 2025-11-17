const howItWorks = [
  { icon: '📦', title: 'Store', body: 'Book verified warehouses or co-op storage with humidity monitoring.' },
  { icon: '💹', title: 'Price & Insights', body: 'AI + human analysts push fair market prices per crop & county.' },
  { icon: '🚚', title: 'Transport', body: 'Request bids from verified transporters, track ETA and insurance.' },
  { icon: '🛒', title: 'Sell', body: 'Match with buyers, escrow via Paybill/Till, release once delivered.' }
];

const kpis = [
  { title: 'Total Revenue', value: 'KSh 1,240,000', change: '+18% vs last month', cta: 'View P&L', icon: '💰', spark: [860, 920, 970, 1010, 1150, 1240] },
  { title: 'Active Listings', value: '28', change: '3 pending approvals', cta: 'Add Produce', icon: '📦', spark: [18, 22, 21, 24, 27, 28] },
  { title: 'Buyers Connected', value: '54', change: '+7 vs last week', cta: 'View Buyers', icon: '🤝', spark: [28, 34, 37, 42, 49, 54] },
  { title: 'M-Pesa Balance', value: 'KSh 198,400', change: 'Synced 2 mins ago', cta: 'Withdraw', icon: '📱', spark: [120, 150, 140, 170, 190, 198] }
];

const heroMetrics = [
  { label: 'Tomato · Nairobi', value: 'KSh 135', trend: '+4.8%' },
  { label: 'Avocado · Murang’a', value: 'KSh 98', trend: '+2.1%' },
  { label: 'Onion · Nyeri', value: 'KSh 84', trend: '-1.2%' }
];

const priceSeries = {
  7: {
    Tomato: [120, 118, 130, 133, 134, 136, 138],
    Avocado: [90, 92, 91, 95, 98, 100, 99],
    Maize: [45, 47, 44, 46, 48, 49, 50],
  },
  30: {
    Tomato: Array.from({ length: 30 }, (_, i) => 110 + Math.sin(i / 2) * 8 + i * 0.6),
    Avocado: Array.from({ length: 30 }, (_, i) => 80 + Math.cos(i / 3) * 5 + i * 0.4),
    Maize: Array.from({ length: 30 }, (_, i) => 40 + Math.sin(i / 4) * 3 + i * 0.2),
  }
};

const inventory = [
  { crop: 'Tomato', available: 4200, committed: 1800, stored: 1200 },
  { crop: 'Avocado', available: 3600, committed: 2600, stored: 1400 },
  { crop: 'Onion', available: 2800, committed: 900, stored: 1100 },
];

const kanbanColumns = {
  Enquiry: ['Buyer: FreshCart', 'Buyer: Zucchini Grocers'],
  Negotiation: ['Tomato Grade AA · 5T'],
  Escrow: ['Sukuma wiki · 3T'],
  Transit: ['Avocado Premium · 2T'],
  Paid: ['Dry Maize · 10T']
};

const logisticsBids = [
  { route: 'Kirinyaga → Nairobi', bid: '48,000', eta: '6h', rating: 4.9, status: 'Escrow' },
  { route: 'Nakuru → Kisumu', bid: '31,200', eta: '8h', rating: 4.4, status: 'Transit' },
  { route: 'Mwea → Eldoret', bid: '65,000', eta: '14h', rating: 4.7, status: 'Pending' },
];

const marketData = [
  { crop: 'Tomato', county: 'Nairobi', grade: 'AA', price: 136, min: 120, max: 142 },
  { crop: 'Tomato', county: 'Kisumu', grade: 'A', price: 128, min: 114, max: 135 },
  { crop: 'Avocado', county: 'Murang’a', grade: 'Premium', price: 99, min: 84, max: 102 },
  { crop: 'Onion', county: 'Nyeri', grade: 'A', price: 84, min: 72, max: 89 },
  { crop: 'Maize', county: 'Trans Nzoia', grade: 'Dry', price: 52, min: 48, max: 55 },
  { crop: 'Beans', county: 'Embu', grade: 'Rosecoco', price: 120, min: 110, max: 140 },
];

const produceSeed = [
  { crop: 'Tomato', grade: 'AA', qty: 5200, price: 135, warehouse: 'Kirinyaga Cold Store', status: 'Active' },
  { crop: 'Avocado', grade: 'Premium', qty: 3000, price: 95, warehouse: 'Murang’a Co-op', status: 'Active' },
  { crop: 'Onion', grade: 'A', qty: 2200, price: 85, warehouse: 'Nyeri Hub', status: 'Sold' },
];

const transactions = [
  { ref: 'INV-9201', type: 'Sale', amount: 420000, status: 'Completed', date: '12 Nov' },
  { ref: 'MP-771', type: 'Withdraw', amount: 80000, status: 'Pending', date: '11 Nov' },
  { ref: 'INV-9188', type: 'Sale', amount: 180000, status: 'Completed', date: '10 Nov' },
];

const accountingCards = [
  { title: 'Expense Tracker', value: 'KSh 312,400', detail: 'Seeds, labor, logistics, fertilizer' },
  { title: 'Profit & Loss', value: 'KSh 928,600', detail: 'Net after fees' },
  { title: 'Cashflow', value: 'Positive 24%', detail: '3-month rolling window' },
  { title: 'Loans', value: 'KSh 450,000', detail: 'Due in 6 months' },
];

const buyers = [
  { name: 'FreshCart Africa', badge: '✅ Verified', detail: 'Tomato Grade AA · 8T', price: 'KSh 142/kg' },
  { name: 'City Greens', badge: '✅ Verified', detail: 'Spinach · 3T', price: 'KSh 68/kg' },
  { name: 'Hotel Hub', badge: '✅ Verified', detail: 'Avocado Premium · 4T', price: 'KSh 102/kg' },
  { name: 'Mama Mboga Collective', badge: 'Group', detail: 'Onion Red · 6T', price: 'KSh 92/kg' },
];

const threads = [
  { id: 't1', title: 'FreshCart Escrow', participants: ['You', 'FreshCart'], last: 'Need revised invoice?', messages: [
    { body: 'Can we deliver tomorrow morning?', from: 'FreshCart' },
    { body: 'Yes, loading 5am 🚚', from: 'You' }
  ] },
  { id: 't2', title: 'Co-op Group', participants: ['You', 'Mary', 'Ali'], last: '25% of target filled', messages: [
    { body: 'Remember to update weight contributions', from: 'Mary' },
    { body: 'I just added 600kg', from: 'You' }
  ] },
];

const coopTargets = [
  { title: 'Tomato Pool Nairobi', target: 8000, current: 5200, minPrice: 130, deadline: '18 Nov' },
  { title: 'Avocado Export Lot', target: 6000, current: 4100, minPrice: 105, deadline: '25 Nov' },
];

const coopFeed = [
  { body: 'Storage slot confirmed at Tinga Warehouse', time: '2m ago' },
  { body: 'Insurance certificate uploaded by Grace', time: '1h ago' },
];

const receipts = [
  { crop: 'Maize', grade: 'Dry', qty: 10000, expiry: '30 Jan', warehouse: 'NCPB Eldoret', lien: 'Chora Microfinance' },
  { crop: 'Beans', grade: 'Rosecoco', qty: 4000, expiry: '18 Dec', warehouse: 'Equity AgriHub', lien: 'None' },
];

const alerts = [
  { crop: 'Tomato', direction: 'Above KSh 140', channel: 'App + SMS' },
  { crop: 'Rainfall', direction: 'Kirinyaga Flood Watch', channel: 'WhatsApp' },
  { crop: 'M-Pesa Sync', direction: 'Mismatch detected', channel: 'Email + USSD' },
];

const faq = [
  { q: 'How do I onboard my cooperative?', a: 'Invite members via SMS or share a join link. Roles and permissions are enforced via Supabase RLS.' },
  { q: 'Do you support offline mode?', a: 'Yes. Listings, expenses, and messages cache locally. Once online, we sync via service workers.' },
  { q: 'Is escrow mandatory?', a: 'For first 3 deals per buyer, escrow is required. After trust score > 80, you can choose flexible payments.' },
];

const testimonials = [
  { name: 'Grace · Kirinyaga', quote: 'HarvestLink helped me pool onions with my co-op and negotiate 12% better prices.' },
  { name: 'Ali · Makueni', quote: 'The wallet + M-Pesa sync means I never lose track of payouts.' },
  { name: 'Mary · Nakuru', quote: 'Our co-op uses the Kanban to track export deals all the way to payment.' },
];

const schema = `profiles(id, role enum, name, phone, county, coop_id)
produce_listings(id, owner_id, crop, grade, qty_kg, price_per_kg, photos[], status)
wallet_ledger(id, user_id, type enum, amount, currency, mpesa_ref, status, created_at)
transactions(id, buyer_id, seller_id, listing_id, price, qty_kg, escrow_id, status)
expenses(id, user_id, category, amount, description, date)
messages(id, thread_id, sender_id, body, attachments[], created_at)
threads(id, participants[], deal_id, room_type enum)
warehouses(id, name, county, capacity_kg, contact)
warehouse_receipts(id, user_id, warehouse_id, crop, grade, qty_kg, expires_at, lien_json)
loans(id, user_id, principal, balance, apr, schedule_json, status)
logistics_routes(id, origin_county, dest_county, date_needed, payload_kg)
logistics_bids(id, route_id, transporter_id, price, eta_hours, rating, selected)
price_feed(id, crop, county, price_per_kg, source, observed_at)
alerts(id, user_id, crop, county, threshold_price, direction, channel, active)
cooperatives(id, name, county)
coop_members(coop_id, user_id, role)
audit_log(id, actor_id, action, entity, entity_id, data_json, created_at)`;

const mpesaTimelineSeed = [
  'C2B payment queued at Paybill 411222',
  'Notification received via webhook',
  'Ledger updated and escrow marked funded'
];
