// ── Workflow nodes for the hero live canvas
export const WF_NODES = [
  // Main horizontal chain: n0–n4 evenly spaced at y=328
  { id: 'n0',  x: 145,  y: 328,  emoji: '⚡', title: 'Chat Trigger',          sub: 'Webhook',         bg: 'rgb(18,54,31)',  border: 'rgb(36,143,75)',  color: 'rgb(51,204,107)' },
  { id: 'n1',  x: 345,  y: 328,  emoji: '🤖', title: 'Information Extractor', sub: 'OpenAI GPT-4.1',  bg: 'rgb(41,24,57)',  border: 'rgb(115,57,172)', color: 'rgb(166,112,219)' },
  { id: 'n2',  x: 545,  y: 328,  emoji: '🔧', title: 'Parsing Output',        sub: 'AI Response',     bg: 'rgb(54,37,18)',  border: 'rgb(163,106,41)', color: 'rgb(221,146,60)' },
  { id: 'n3',  x: 745,  y: 328,  emoji: '🤖', title: 'Generate Outreach',     sub: 'AI Agent + MCP',  bg: 'rgb(41,24,57)',  border: 'rgb(115,57,172)', color: 'rgb(166,112,219)' },
  { id: 'n4',  x: 945,  y: 328,  emoji: '🌐', title: 'Check Existing',        sub: 'Outreach API',    bg: 'rgb(21,40,50)',  border: 'rgb(51,119,153)', color: 'rgb(71,163,209)' },

  // Vertical drop to config + router
  { id: 'n5',  x: 945,  y: 488,  emoji: '📝', title: 'Set Mailbox & Seq',     sub: 'Config',          bg: 'rgb(36,36,36)',  border: 'rgb(77,77,77)',   color: 'rgb(140,140,140)' },
  { id: 'n6',  x: 945,  y: 648,  emoji: '🔀', title: 'Contact Exists?',       sub: 'If / Router',     bg: 'rgb(54,45,18)',  border: 'rgb(163,133,41)', color: 'rgb(221,180,60)' },

  // Symmetrical branches: center=945, offset=±200
  { id: 'n7',  x: 745,  y: 808,  emoji: '🌐', title: 'Update Prospect',       sub: 'Outreach PATCH',  bg: 'rgb(21,40,50)',  border: 'rgb(51,119,153)', color: 'rgb(71,163,209)' },
  { id: 'n8',  x: 1145, y: 808,  emoji: '🌐', title: 'Create Prospect',       sub: 'Outreach POST',   bg: 'rgb(21,40,50)',  border: 'rgb(51,119,153)', color: 'rgb(71,163,209)' },

  { id: 'n9',  x: 745,  y: 968,  emoji: '📝', title: 'Set Contact ID',        sub: 'Extract',         bg: 'rgb(36,36,36)',  border: 'rgb(77,77,77)',   color: 'rgb(140,140,140)' },
  { id: 'n10', x: 1145, y: 968,  emoji: '📝', title: 'Set Contact ID',        sub: 'Extract',         bg: 'rgb(36,36,36)',  border: 'rgb(77,77,77)',   color: 'rgb(140,140,140)' },

  // Merge back to center
  { id: 'n11', x: 945,  y: 1128, emoji: '🔗', title: 'Merge IDs',             sub: 'Combine Paths',   bg: 'rgb(25,46,46)',  border: 'rgb(54,125,125)', color: 'rgb(64,191,191)' },

  // Continue vertical chain evenly spaced at 160px gaps
  { id: 'n12', x: 945,  y: 1288, emoji: '🌐', title: 'Add to Sequence',       sub: 'Outreach Batch',  bg: 'rgb(21,40,50)',  border: 'rgb(51,119,153)', color: 'rgb(71,163,209)' },
  { id: 'n13', x: 945,  y: 1448, emoji: '⏳', title: 'Wait 30s',              sub: 'Polling',         bg: 'rgb(50,25,21)',  border: 'rgb(153,65,51)',  color: 'rgb(209,90,71)' },
  { id: 'n14', x: 945,  y: 1608, emoji: '🌐', title: 'Get Confirmation',      sub: 'Outreach API',    bg: 'rgb(21,40,50)',  border: 'rgb(51,119,153)', color: 'rgb(71,163,209)' },
  { id: 'n15', x: 945,  y: 1768, emoji: '🌐', title: 'Verify Status',         sub: 'Outreach API',    bg: 'rgb(21,40,50)',  border: 'rgb(51,119,153)', color: 'rgb(71,163,209)' },
  { id: 'n16', x: 945,  y: 1928, emoji: '🔀', title: 'Finished?',             sub: 'Status Check',    bg: 'rgb(54,45,18)',  border: 'rgb(163,133,41)', color: 'rgb(221,180,60)' },
  { id: 'n17', x: 945,  y: 2088, emoji: '✅', title: 'Done ✓',                sub: 'Complete',        bg: 'rgb(18,54,31)',  border: 'rgb(41,163,86)',  color: 'rgb(60,221,119)' },
];

export const WF_EDGES = [
  ['n0','n1'], ['n1','n2'], ['n2','n3'], ['n3','n4'],
  ['n4','n5'], ['n5','n6'],
  ['n6','n7'], ['n6','n8'],
  ['n7','n9'], ['n8','n10'],
  ['n9','n11'], ['n10','n11'],
  ['n11','n12'], ['n12','n13'], ['n13','n14'], ['n14','n15'], ['n15','n16'],
  ['n16','n17'], ['n16','n13'],
];

// ── Platforms ticker
export const PLATFORMS = [
  'Microsoft Teams','Outlook','QuickBooks','Xero','Zoho','ClickUp','n8n',
  'OpenAI','Slack','Google Sheets','WhatsApp','HubSpot','Salesforce',
  'Shopify','Stripe','Airtable','Notion','Supabase','Twilio','Telegram',
  'Make','Zapier','Pinecone','Jira','Gmail','Pipedrive','Typeform','Webflow',
];

// ── Workflow cards
export const WORKFLOW_CARDS = [
  {
    category: 'AI & Productivity', catColor: '#a78bfa', nodes: 11,
    title: 'AI Meeting Minutes Processor',
    desc: 'Automatically processes meeting recordings and transcripts from Google Drive, extracts action items...',
    flow: ['Google Drive','AI Extract','Validate','HTML Email'],
    tags: ['Google Drive','OpenAI GPT-4','Gmail'], extraTags: 1,
    result: '80% faster meeting recap',
  },
  {
    category: 'HR & Operations', catColor: '#4ade80', nodes: 30,
    title: 'Automated Employee Onboarding',
    desc: 'End-to-end onboarding automation triggered by Google Sheets or Slack. Creates Jira epics with...',
    flow: ['Sheets/Slack','Extract','Jira Epic','Subtasks +3'],
    tags: ['Google Sheets','Jira','Google Drive'], extraTags: 3,
    result: 'Zero-touch onboarding',
  },
  {
    category: 'Logistics & Operations', catColor: '#60a5fa', nodes: 25,
    title: 'Voice-Powered Warehouse Inventory Counter',
    desc: 'Hands-free inventory cycle counting via Telegram voice messages. Warehouse operators speak locatio...',
    flow: ['Telegram Voice','Transcribe','AI Parse','Validate +2'],
    tags: ['Telegram','OpenAI GPT-4','Google Sheets'], extraTags: 1,
    result: '50% faster cycle counts',
  },
  {
    category: 'Sales & AI', catColor: '#fb923c', nodes: 20,
    title: 'AI-Powered Sales Outreach Generator',
    desc: 'Chat-triggered sales automation that researches prospects using MadKudu intelligence, generates...',
    flow: ['Chat Input','AI Extract','MadKudu Research','Generate Emails +2'],
    tags: ['OpenAI GPT-4','MadKudu','Outreach.io'], extraTags: 1,
    result: '5x faster personalized outreach',
  },
  {
    category: 'Finance & Accounting', catColor: '#34d399', nodes: 28,
    title: 'Smart Invoice Automation with AI Reminders',
    desc: 'End-to-end invoice lifecycle management: form submissions auto-create QuickBooks customers and...',
    flow: ['Form','QuickBooks Invoice','Send','Track +2'],
    tags: ['QuickBooks','Gmail','OpenAI GPT-4'], extraTags: 2,
    result: 'Get paid 40% faster',
  },
  {
    category: 'Customer Support', catColor: '#f472b6', nodes: 18,
    title: 'Omnichannel AI Customer Support',
    desc: 'Unified AI support across Gmail and Telegram with shared knowledge base, conversation memory, and...',
    flow: ['Gmail/Telegram','AI Agent (KB + Memory)','Reply','Log +1'],
    tags: ['Gmail','Telegram','OpenAI GPT-4'], extraTags: 2,
    result: '24/7 instant support',
  },
  {
    category: 'Marketing & Content', catColor: '#e879f9', nodes: 32,
    title: 'AI Social Media Content Factory',
    desc: 'End-to-end social media automation: submit a topic via form, AI researches and generates platform-...',
    flow: ['Form','AI Factory','Approval','Image Gen +3'],
    tags: ['OpenAI GPT-4','SerpAPI','Gmail'], extraTags: 6,
    result: 'One click, 7 platforms',
  },
  {
    category: 'Healthcare & Scheduling', catColor: '#2dd4bf', nodes: 12,
    title: 'AI Dental Office Receptionist',
    desc: 'Autonomous AI agent for dental practices that handles appointment scheduling via webhook. Checks Googl...',
    flow: ['Webhook','AI Agent','Calendar/Sheets/SMS/Gmail','Response'],
    tags: ['Google Gemini 2.5 Flash','Google Calendar','Google Sheets'], extraTags: 3,
    result: '24/7 appointment booking',
  },
  {
    category: 'E-commerce & AI', catColor: '#fbbf24', nodes: 26,
    title: 'AI-Powered Shopify Product Generator',
    desc: 'Automated digital product creation pipeline: scans Google Drive for poster images, uses GPT-4 Vision t...',
    flow: ['Drive Images','Vision AI','Structured Data','LLM +2'],
    tags: ['Google Drive','OpenAI GPT-4 Vision','Google Gemini'], extraTags: 3,
    result: 'Zero-touch product listings',
  },
];

export const WORKFLOW_FILTERS = [
  'All','AI & Productivity','HR & Operations','Logistics & Operations',
  'Sales & AI','Finance & Accounting','Customer Support','Marketing & Content',
  'Healthcare & Scheduling','E-commerce & AI','Sales & CRM',
];

// ── What I Automate panels
export const AUTOMATE_PANELS = [
  {
    id: 'agents', icon: '🤖', label: 'AI Agents & Chatbots',
    title: 'AI Agents & Chatbots',
    desc: 'Custom AI assistants deployed on web, WhatsApp, Telegram, Slack, and voice channels. From RAG-powered knowledge bots to lead qualification agents.',
    useCases: ['Customer support chatbot','WhatsApp lead qualifier','Voice appointment booker','Internal knowledge assistant'],
    tools: ['OpenAI','Pinecone','WhatsApp API','Twilio','n8n'],
  },
  {
    id: 'sales', icon: '🎧', label: 'Sales & CRM',
    title: 'Sales & CRM',
    desc: 'Automate your entire sales pipeline — from lead capture and qualification to follow-ups, deal tracking, and handoff sequences.',
    useCases: ['Lead scoring automation','Follow-up sequences','Pipeline management','Outreach campaigns'],
    tools: ['HubSpot','Salesforce','Lemlist','Gmail','n8n'],
  },
  {
    id: 'ecommerce', icon: '🛒', label: 'E-commerce & Orders',
    title: 'E-commerce & Orders',
    desc: 'Automate order management, inventory sync, supplier notifications, and customer communications across your entire e-commerce stack.',
    useCases: ['Order processing automation','Inventory sync','Supplier notifications','Return management'],
    tools: ['Shopify','Airtable','WhatsApp','Slack','n8n'],
  },
  {
    id: 'content', icon: '✉️', label: 'Content & Marketing',
    title: 'Content & Marketing',
    desc: 'End-to-end content automation: research, write, design, approve, and publish across all your marketing channels without lifting a finger.',
    useCases: ['Social media scheduling','AI content generation','Newsletter automation','SEO content pipelines'],
    tools: ['OpenAI','SerpAPI','Buffer','Gmail','n8n'],
  },
  {
    id: 'finance', icon: '💵', label: 'Finance & Accounting',
    title: 'Finance & Accounting',
    desc: 'Automate invoicing, expense tracking, payment reminders, and financial reporting with zero manual data entry.',
    useCases: ['Invoice generation','Payment reminders','Expense categorization','Financial reports'],
    tools: ['QuickBooks','Xero','Stripe','Gmail','n8n'],
  },
  {
    id: 'hr', icon: '👥', label: 'HR & Recruiting',
    title: 'HR & Recruiting',
    desc: 'Streamline hiring, onboarding, and HR operations with automated workflows that save hours of manual work every week.',
    useCases: ['Candidate screening','Onboarding automation','Interview scheduling','Offboarding workflows'],
    tools: ['Google Sheets','Jira','Slack','Gmail','n8n'],
  },
  {
    id: 'operations', icon: '🔗', label: 'Operations & Workflow',
    title: 'Operations & Workflow',
    desc: 'Connect your tools, eliminate bottlenecks, and automate repetitive operational tasks across your entire organization.',
    useCases: ['Approval workflows','Task routing','Status notifications','Cross-tool data sync'],
    tools: ['ClickUp','Notion','Slack','Airtable','n8n'],
  },
  {
    id: 'data', icon: '📊', label: 'Data & Reporting',
    title: 'Data & Reporting',
    desc: 'Automate data collection, transformation, and reporting to get real-time insights without any manual spreadsheet work.',
    useCases: ['Automated dashboards','Data ETL pipelines','Weekly reports','KPI tracking'],
    tools: ['Google Sheets','Airtable','Supabase','OpenAI','n8n'],
  },
  {
    id: 'document', icon: '📄', label: 'Document & Admin',
    title: 'Document & Admin',
    desc: 'Automate document creation, processing, and routing — from contracts to compliance forms — without any manual handling.',
    useCases: ['Contract generation','Document classification','E-signature workflows','Admin task routing'],
    tools: ['Google Drive','DocuSign','OpenAI','Gmail','n8n'],
  },
];

// ── Timeline steps
export const TIMELINE_STEPS = [
  { num: 1, icon: '📞', title: 'Discovery Call',       sub: 'Understand your business & goals', side: 'left' },
  { num: 2, icon: '🗺', title: 'Planning & Strategy',  sub: 'Map the automation architecture',  side: 'right' },
  { num: 3, icon: '📋', title: 'Scope Overview',       sub: 'Define deliverables & timeline',   side: 'left' },
  { num: 4, icon: '🔑', title: 'Access & Credentials', sub: 'Gather API keys & tool access',    side: 'right' },
  { num: 5, icon: '💻', title: 'Development & Build',  sub: 'Build & wire up all workflows',    side: 'left' },
  { num: 6, icon: '🧪', title: 'Testing & QA',         sub: 'Stress-test every scenario',       side: 'right' },
  { num: 7, icon: '🗄️', title: 'Live Demo',            sub: 'Walk through the finished system', side: 'left' },
  { num: 8, icon: '🛡️', title: 'Handover & Support',   sub: 'Docs, training & ongoing support', side: 'right' },
];

// ── Testimonials
export const TESTIMONIALS_ROW1 = [
  { name: 'Angela Shoreditch', role: 'Owner, The Shoreditch Spa (London)',                text: '"We used to lose so many bookings just because we couldn\'t get back to people in time. Now every enquiry gets a response straight away and we\'ve filled our treatment slots without taking on extra reception staff."' },
  { name: 'Ria Petines',       role: 'Owner, Mecca Beauty Lounge (Las Piñas)',            text: '"Dati, pag busy kami sa loob ng salon, yung mga nagtatanong sa Messenger nawawala na lang. Ngayon lahat ng inquiries nasasagot agad at doble na ang aming bookings compared dati."' },
  { name: 'Dr. Miguel Reyes',  role: 'Owner, Reyes Dental Care (Quezon City)',            text: '"No-shows used to be a real problem for us. Since we started sending automated reminders and instant confirmations, our chairs are fuller and the front desk isn\'t buried in follow-up calls anymore."' },
  { name: 'Sofia Lim',         role: 'Founder, SkinRevive Aesthetic Lounge (Singapore)', text: '"During peak hours our therapists couldn\'t stop to answer every inquiry. Now client messages are handled automatically so the team stays focused on treatments and delivering a better experience overall."' },
  { name: 'Jen Brooks',        role: 'Founder, Transform Fitness Studio (California)',    text: '"Following up on trial class leads was taking up so much of my time. Now every prospect gets a message instantly and our conversion to paid memberships has gone up noticeably without me chasing anyone."' },
];

export const TESTIMONIALS_ROW2 = [
  { name: 'Nicole Garcia',    role: 'Owner, The Daily Brew Café (Cebu)',                 text: '"We started taking pre-orders and event inquiries online and it was getting hard to track everything during the morning rush. Now it\'s all organized automatically and customers get replies fast while the team stays focused on the floor."' },
  { name: 'Kelvin Chan',      role: 'Founder, ConnectifyAsia (Singapore)',               text: '"Our clients expect fast responses and we just couldn\'t keep up manually across different time zones. Automating the first touch made a huge difference. People book without waiting and we look a lot more professional doing it."' },
  { name: 'Marcus De Verges', role: 'Founder, Premium AutoCare (Melbourne)',             text: '"Car owners don\'t want to wait. If you don\'t reply quickly they\'ll book somewhere else. Since every message now gets an instant response we\'ve held onto more customers and our service bays are booked further in advance."' },
  { name: 'Paul Mirabel',     role: 'Founder, Hapihap Spa (Naga)',                       text: '"Dati maraming guests ang nag-iinquire tapos hindi na namin nahahabol. Ngayon kahit gabi mag-message sila natatanggap nila agad ang sagot at mas marami nang nag-book ng appointment kaysa dati."' },
  { name: 'Rachel Milallos',  role: 'Director, Milallos Dental Clinic (Legazpi)',        text: '"Managing appointment confirmations and reminders used to eat up a big part of our staff\'s day. Now that it\'s automated they spend more time with patients instead of on the phone and our patients have really noticed the difference."' },
];