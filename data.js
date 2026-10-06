/* =====================================================================
   data.js — everything you edit lives here: settings, CV text, companies.
   ===================================================================== */

const CONFIG = {
  // Push notifications: install the "ntfy" app and subscribe to this topic.
  ntfyTopic: "bar-cv-3bycxcb6u8e9",
  email: "achdut37@gmail.com",
  phoneDisplay: "053-337-0366",
  phoneIntl: "+972533370366",
  whatsapp: "972533370366",
  linkedin: "", // paste your profile URL, e.g. "https://www.linkedin.com/in/your-handle"
  fileBase: "Bar_Achdut_CV"
};

const CV = {
  name: "Bar Achdut",
  headline: "Senior Software Engineer · AI Systems & Product",
  contacts: ["achdut37@gmail.com", "053-337-0366", "Tel Aviv, Israel"],
  profile: "Senior backend and full-stack engineer with 8+ years building production systems at scale, including 5 years in Unit 8200 (Head of Software Team, 10 engineers). Now operating at the intersection of software engineering and applied AI: designing, shipping and monetizing LLM-powered products end to end — from data model and RBAC to agent orchestration and go-to-market. Fluent in AI-native development workflows; equally comfortable owning a technical roadmap, a product spec, or a delivery team.",
  competencies: [
    ["LLM Application Development", "Anthropic Claude API and OpenAI API — Tool Use / function calling, structured JSON outputs, streaming, system-prompt design, context-window and token-cost optimization."],
    ["Agent Architecture", "Model Context Protocol (MCP) servers, multi-agent task decomposition, tool routing, guardrails and human-in-the-loop approval gates for high-risk actions."],
    ["AI-Assisted Engineering", "Claude Code, Cursor and agentic CLI workflows as primary development environment; spec-driven delegation, automated code review, and AI-generated code quality standards for teams."],
    ["RAG & Retrieval", "Embedding pipelines, vector search on Postgres/pgvector, chunking and retrieval strategy, grounding and hallucination mitigation, retrieval evaluation."],
    ["Workflow Automation", "n8n, Make.com, webhook and event-driven pipelines; production messaging automation over WhatsApp Business API (Whapi.Cloud) and email."],
    ["AI Product & Delivery", "Writing PRDs for AI features, defining eval harnesses and success metrics, latency/cost/quality trade-off analysis, prompt versioning, and scoping what an LLM should and should not own."],
    ["Technical Leadership", "Driving AI adoption across engineering teams — tooling selection, data-residency and security review of AI vendors, and measurable developer-velocity improvement."]
  ],
  experience: [
    { role: "Founder & Technical Lead", org: "LiveBetter", context: "B2B SaaS for Residential Property Management", dates: "03/2026 – Present", bullets: [
      "Built and shipped a multi-tenant SaaS platform end to end: Next.js, TypeScript, Tailwind, Supabase/PostgreSQL with row-level-security-enforced RBAC across six role types.",
      "Designed and deployed a production WhatsApp AI agent (Claude Tool Use + Whapi.Cloud + Supabase) that triages resident maintenance requests in Hebrew, routes them to the correct handler, and writes structured tickets — removing manual intake entirely.",
      "Negotiated and signed a payment-processing partnership with Cardcom, embedding automated collections and dunning into the product as a primary revenue layer.",
      "Owned the full commercial stack alongside the technical one: competitive analysis, pricing and packaging, PRD, sales pipeline and enterprise-prospect security reviews (data residency, retention, reconciliation)."
    ] },
    { role: "Founder", org: "AI Automation Consulting", context: "", dates: "01/2025 – Present", bullets: [
      "Deliver AI and automation systems to non-technical Israeli companies — scoping, building and handing off production workflows on n8n and Make.com with fixed build fee plus retainer.",
      "Architected an air-gapped incident-investigation agent system for a defense-adjacent environment, delivered as an executive-level architecture proposal.",
      "Packaged repeatable internal tooling as reusable agent skills (document generation, media conversion, pipeline analysis), cutting recurring delivery time to near zero."
    ] },
    { role: "Senior Backend Engineer", org: "Just Eat Takeaway.com", context: "", dates: "02/2023 – Present", stack: "C#, SQL Server, Python, OpenShift, Elasticsearch, Kibana, MQ", bullets: [
      "Designed and developed scalable backend systems handling large data flows and complex business logic.",
      "Led integration of a new microservices architecture, improving system reliability and reducing downtime.",
      "Mentored junior developers and introduced code review best practices."
    ] },
    { role: "Full-Stack Developer", org: "IDF — Unit 8200", context: "", dates: "06/2021 – 12/2022", stack: "C#, React, SQL Server, OpenShift, Python, Elasticsearch, Kibana", bullets: [
      "Developed large-scale web applications across frontend and backend in a team of 5, optimizing load times and internal processes.",
      "Worked in Agile/Scrum delivery cycles."
    ] },
    { role: "Head of Software Team", org: "IDF — Unit 8200", context: "", dates: "10/2019 – 06/2021", bullets: [
      "Led a team of 10 developers; owned sprint planning, task characterization against customer needs, and delivery.",
      "Translated ambiguous operational requirements into scoped technical work.",
      "Focus: team leadership, roadmap ownership, stakeholder management, decision-making under pressure."
    ] },
    { role: "Software Developer", org: "IDF — Unit 8200", context: "", dates: "12/2017 – 05/2019", stack: "Python, C#, SQL, OpenShift, Flask, Elasticsearch, Kibana", bullets: [
      "Implemented advanced data collection and processing pipelines, producing wide-picture insights for decision-making.",
      "Built monitoring solutions on the ELK stack and internal tooling that materially increased team productivity."
    ] }
  ],
  skills: [
    ["AI & Agents", "Claude API, OpenAI API, MCP, Tool Use / function calling, RAG, pgvector, prompt engineering, evals, Claude Code, Cursor, n8n, Make.com"],
    ["Languages", "C#, Python, TypeScript, JavaScript, SQL"],
    ["Frameworks", ".NET, React, Next.js, Node.js, Flask, Tailwind CSS"],
    ["Data", "PostgreSQL / Supabase (RLS), SQL Server, Oracle, Elasticsearch"],
    ["Platform", "OpenShift, Docker, Kibana, MQ, CI/CD, REST APIs, webhooks, microservices"],
    ["Leadership & Product", "Team leadership, sprint and roadmap ownership, product specification, stakeholder communication, commercial negotiation"]
  ],
  education: [
    "MBA — Tel Aviv University (in progress)",
    "B.Sc. Computer Science — The College of Management Academic Studies",
    "IDF Officers School (BAHAD 1), 2019"
  ],
  recognition: [
    "Unit 8200 Outstanding Soldier of the Year (2020).",
    "Hebrew — native. English — fluent (professional working proficiency)."
  ]
};

/* Companies: [display name, primary color, accent color or null, font, aliases]
   Fonts available: Inter, Poppins, Montserrat, Roboto, Open Sans, Rubik, Manrope, DM Sans,
   Plus Jakarta Sans, Work Sans, Figtree, Space Grotesk, IBM Plex Sans, Wix Madefor Display,
   Lato, Nunito Sans, Barlow, Source Serif 4, Outfit.
   Colors were checked against brand guidelines / brand databases in Oct 2026. */
const COMPANIES = [
  // Israeli tech
  ["Wix", "#0C6EFC", null, "Wix Madefor Display", ["wix", "wix.com", "וויקס", "ויקס"]],
  ["monday.com", "#6161FF", null, "Poppins", ["monday", "monday.com", "mondaycom", "מאנדיי", "מנדיי", "מונדיי"]],
  ["Check Point", "#EE0C5D", null, "Barlow", ["check point", "checkpoint", "check point software", "צ'ק פוינט", "צ׳ק פוינט", "צק פוינט", "צ'קפוינט"]],
  ["CyberArk", "#016A95", null, "Inter", ["cyberark", "cyber ark", "סייברארק", "סייבר ארק"]],
  ["Fiverr", "#1DBF73", null, "Figtree", ["fiverr", "פייבר"]],
  ["Payoneer", "#702FFF", null, "Nunito Sans", ["payoneer", "פיוניר", "פאיוניר"]],
  ["NiCE", "#3694FC", null, "Inter", ["nice", "nice systems", "nice ltd", "נייס"]],
  ["Amdocs", "#EC018C", null, "Inter", ["amdocs", "אמדוקס"]],
  ["Mobileye", "#1F2EB8", null, "Inter", ["mobileye", "מובילאיי", "מובילאי"]],
  ["Taboola", "#0056F0", null, "Poppins", ["taboola", "טאבולה", "טבולה"]],
  ["Teads", "#050A15", "#00C8FF", "Inter", ["teads", "outbrain", "אאוטבריין", "טידס"]],
  ["Playtika", "#FF3344", null, "Poppins", ["playtika", "פלייטיקה"]],
  ["Similarweb", "#195AFE", null, "Inter", ["similarweb", "similar web", "סימילרווב", "סימילר ווב"]],
  ["JFrog", "#40BE46", null, "Inter", ["jfrog", "j frog", "ג'יפרוג", "ג׳יפרוג", "גייפרוג"]],
  ["SentinelOne", "#6B0AEA", null, "Poppins", ["sentinelone", "sentinel one", "סנטינל וואן", "סנטינלוואן"]],
  ["Wiz", "#0254EC", null, "Inter", ["wiz", "wiz.io", "וויז", "ויז"]],
  ["Gong", "#8039DF", null, "Rubik", ["gong", "gong.io", "גונג"]],
  ["Riskified", "#4C3EFF", null, "Inter", ["riskified", "ריסקיפייד"]],
  ["Lemonade", "#FF0083", null, "Lato", ["lemonade", "למונייד", "לימונייד"]],
  ["HiBob", "#EE164F", null, "Montserrat", ["hibob", "hi bob", "bob", "הייבוב", "היי בוב"]],
  ["Papaya Global", "#FF3924", null, "Inter", ["papaya", "papaya global", "פפאיה", "פפאיה גלובל"]],
  ["Rapyd", "#FCFF00", "#FF007A", "Barlow", ["rapyd", "ראפיד", "רפיד"]],
  ["Melio", "#7949FF", null, "Inter", ["melio", "מליו"]],
  ["Tipalti", "#FFB600", "#051C2C", "Inter", ["tipalti", "טיפלטי"]],
  ["Cato Networks", "#158864", null, "Inter", ["cato", "cato networks", "קאטו", "קאטו נטוורקס"]],
  ["Armis", "#8017F0", null, "Inter", ["armis", "ארמיס"]],
  ["Lightricks", "#000000", "#4CC7E1", "Inter", ["lightricks", "לייטריקס"]],
  ["Via", "#00A8E2", null, "Inter", ["via", "ridewithvia", "וויה", "ויה"]],
  ["Moovit", "#1A65E5", null, "Inter", ["moovit", "מוביט"]],
  ["Waze", "#33CCFF", null, "Rubik", ["waze", "וייז", "ווייז"]],
  ["Yotpo", "#0042E4", null, "Inter", ["yotpo", "יוטפו"]],
  ["AppsFlyer", "#00C2FF", null, "Inter", ["appsflyer", "apps flyer", "אפספלייר", "אפס פלייר"]],
  ["Kaltura", "#B2D238", null, "Inter", ["kaltura", "קלטורה"]],
  ["Varonis", "#0077FF", null, "Inter", ["varonis", "ורוניס"]],
  ["Radware", "#0D7B97", null, "Inter", ["radware", "ראדוור", "רדוור"]],
  ["Sapiens", "#0D256F", null, "DM Sans", ["sapiens", "סאפיינס", "ספיינס"]],
  ["Elementor", "#ED01EE", null, "Poppins", ["elementor", "אלמנטור"]],
  ["Tabnine", "#6F3EEE", null, "Inter", ["tabnine", "טאבניין"]],
  ["AI21 Labs", "#E91E63", null, "Inter", ["ai21", "ai21 labs", "ai 21"]],
  ["Forter", "#005DE8", null, "Poppins", ["forter", "פורטר"]],
  ["NEXT Insurance", "#0075FF", null, "Inter", ["next insurance", "next", "נקסט", "נקסט ביטוח"]],
  ["eToro", "#6DFF8B", "#10110E", "Inter", ["etoro", "e toro", "איטורו", "אי טורו"]],
  ["Plus500", "#0C2780", null, "Inter", ["plus500", "plus 500", "פלוס500", "פלוס 500"]],
  ["OpenWeb", "#000000", "#1032CF", "Source Serif 4", ["openweb", "open web", "אופןווב", "אופן ווב"]],
  ["Tufin", "#EC7700", null, "Inter", ["tufin", "טופין"]],
  ["Imperva", "#000000", "#F9C737", "Inter", ["imperva", "אימפרבה"]],
  ["Perion", "#FF0083", null, "Poppins", ["perion", "פריון"]],
  ["Nayax", "#FFC900", "#000000", "Inter", ["nayax", "נאיקס", "נייאקס"]],
  ["Global-e", "#F15A2B", null, "Inter", ["global-e", "global e", "globale", "גלובל אי", "גלובלי"]],
  ["Fireblocks", "#184FDB", null, "Figtree", ["fireblocks", "פיירבלוקס"]],
  ["Island", "#0A332C", "#50E8A8", "Inter", ["island", "island.io", "איילנד"]],
  ["Cyera", "#8A39C0", null, "Inter", ["cyera", "סיירה"]],
  ["Snyk", "#6330A4", null, "Inter", ["snyk", "סניק"]],
  ["Hailo", "#2874FC", null, "Inter", ["hailo", "היילו", "הילו"]],
  ["Innoviz", "#000018", "#00BACA", "Inter", ["innoviz", "אינוביז"]],
  ["Gett", "#FC6214", null, "Nunito Sans", ["gett", "גט"]],
  ["Lusha", "#7935FF", null, "Inter", ["lusha", "לושה"]],
  ["WalkMe", "#3C40FD", null, "Inter", ["walkme", "walk me", "ווקמי", "וואקמי"]],
  ["Salt Security", "#8732FF", null, "Inter", ["salt", "salt security", "סולט"]],
  ["Orca Security", "#0080FF", null, "Montserrat", ["orca", "orca security", "אורקה"]],
  ["Claroty", "#E20AB7", null, "Montserrat", ["claroty", "קלארוטי"]],
  ["Axonius", "#FF671E", null, "Inter", ["axonius", "אקסוניוס"]],
  ["HoneyBook", "#FFD952", "#5E30E3", "DM Sans", ["honeybook", "honey book", "האניבוק"]],
  ["Optibus", "#2E3192", null, "Inter", ["optibus", "אופטיבוס"]],
  ["Transmit Security", "#FC335F", null, "Inter", ["transmit", "transmit security", "טרנסמיט"]],
  ["Pagaya", "#010A34", "#0573E0", "Inter", ["pagaya", "פגאיה", "פגיה"]],
  ["Unity", "#000000", null, "Inter", ["unity", "ironsource", "iron source", "יוניטי", "איירונסורס"]],
  ["Just Eat Takeaway.com", "#FF8000", null, "Figtree", ["just eat", "just eat takeaway", "jet", "takeaway", "10bis", "תן ביס"]],
  // Multinationals with Israeli R&D
  ["Google", "#4285F4", null, "DM Sans", ["google", "alphabet", "גוגל"]],
  ["Microsoft", "#0078D4", null, "Open Sans", ["microsoft", "msft", "מיקרוסופט"]],
  ["Meta", "#0064E0", null, "Figtree", ["meta", "facebook", "instagram", "מטא", "פייסבוק"]],
  ["Amazon", "#232F3E", "#FF9900", "Open Sans", ["amazon", "aws", "amazon web services", "אמזון"]],
  ["Apple", "#000000", "#0071E3", "Inter", ["apple", "אפל"]],
  ["NVIDIA", "#1A1A1A", "#76B900", "Barlow", ["nvidia", "אנבידיה", "נבידיה", "אנווידיה"]],
  ["Intel", "#0068B5", null, "Inter", ["intel", "אינטל"]],
  ["Salesforce", "#00A1E0", null, "Figtree", ["salesforce", "סיילספורס"]],
  ["PayPal", "#002991", null, "Inter", ["paypal", "pay pal", "פייפאל"]],
  ["eBay", "#0968F6", null, "Open Sans", ["ebay", "איביי"]],
  ["Cisco", "#049FD9", null, "Inter", ["cisco", "סיסקו"]],
  ["IBM", "#0F62FE", null, "IBM Plex Sans", ["ibm", "יבמ", "איי בי אם"]],
  ["Oracle", "#C74634", null, "Inter", ["oracle", "אורקל"]],
  ["SAP", "#0070F2", null, "Open Sans", ["sap", "sap labs", "סאפ"]],
  ["Dell Technologies", "#0076CE", null, "Roboto", ["dell", "dell technologies", "דל"]],
  ["HP", "#024AD8", null, "Inter", ["hp", "hewlett packard"]],
  ["Qualcomm", "#3253DC", null, "Inter", ["qualcomm", "קוואלקום"]],
  ["Broadcom", "#CC092F", null, "Inter", ["broadcom", "ברודקום"]],
  ["Marvell", "#0072CE", null, "Inter", ["marvell", "מארוול"]],
  ["Applied Materials", "#569CBE", null, "Inter", ["applied materials", "applied", "amat", "אפלייד", "אפלייד מטריאלס"]],
  ["KLA", "#41007F", null, "Inter", ["kla", "kla tencor", "קלא"]],
  ["Palo Alto Networks", "#FA582D", null, "Inter", ["palo alto", "palo alto networks", "פאלו אלטו"]],
  ["Zscaler", "#236BF5", null, "Inter", ["zscaler", "זיסקיילר", "זי סקיילר"]],
  ["CrowdStrike", "#FC0000", null, "Inter", ["crowdstrike", "קראודסטרייק"]],
  ["Akamai", "#00A4EB", null, "Inter", ["akamai", "אקמאי"]],
  ["Atlassian", "#0052CC", null, "Inter", ["atlassian", "jira", "אטלסיאן"]],
  ["Booking.com", "#003B95", null, "Inter", ["booking", "booking.com", "בוקינג"]],
  ["Citi", "#056DAE", null, "Barlow", ["citi", "citibank", "citigroup", "סיטי", "סיטיבנק"]],
  ["Siemens", "#009999", null, "Inter", ["siemens", "siemens eda", "mentor graphics", "סימנס"]],
  ["Teva", "#AA198D", null, "Inter", ["teva", "teva pharmaceuticals", "טבע"]],
  // Israeli enterprise, defense, finance, telecom
  ["Elbit Systems", "#003670", null, "Inter", ["elbit", "elbit systems", "אלביט", "אלביט מערכות"]],
  ["Rafael", "#1162A5", null, "Inter", ["rafael", "rafael advanced defense systems", "רפאל"]],
  ["Israel Aerospace Industries", "#398FD1", null, "Inter", ["iai", "israel aerospace industries", "התעשייה האווירית", "תעשייה אווירית", "תע\"א", "תעא"]],
  ["Bank Leumi", "#00ADEF", null, "Rubik", ["leumi", "bank leumi", "לאומי", "בנק לאומי"]],
  ["Bank Hapoalim", "#ED1D24", null, "Rubik", ["hapoalim", "bank hapoalim", "poalim", "הפועלים", "בנק הפועלים"]],
  ["Discount Bank", "#00A651", null, "Rubik", ["discount", "discount bank", "israel discount bank", "דיסקונט", "בנק דיסקונט"]],
  ["Mizrahi Tefahot", "#FF780C", null, "Rubik", ["mizrahi", "mizrahi tefahot", "מזרחי", "מזרחי טפחות", "בנק מזרחי"]],
  ["First International Bank", "#00529B", null, "Rubik", ["fibi", "first international", "first international bank", "הבינלאומי", "הבנק הבינלאומי"]],
  ["Isracard", "#FF4F00", null, "Rubik", ["isracard", "ישראכרט"]],
  ["Max", "#32F3D8", "#000000", "Rubik", ["max", "max it", "leumi card", "מקס", "לאומי קארד"]],
  ["Bezeq", "#20294D", null, "Rubik", ["bezeq", "בזק"]],
  ["Partner", "#2DD5C4", null, "Rubik", ["partner", "partner communications", "פרטנר"]],
  ["Cellcom", "#9631FF", null, "Rubik", ["cellcom", "סלקום"]],
  ["HOT", "#FE0001", null, "Rubik", ["hot", "הוט"]],
  ["Harel", "#2E9E3A", null, "Rubik", ["harel", "harel insurance", "הראל", "הראל ביטוח"]],
  ["Migdal", "#58AE39", null, "Rubik", ["migdal", "migdal insurance", "מגדל", "מגדל ביטוח"]],
  ["Clal", "#162858", "#0138B9", "Rubik", ["clal", "clal insurance", "כלל", "כלל ביטוח"]],
  ["The Phoenix", "#D6964A", null, "Rubik", ["phoenix", "the phoenix", "fnx", "הפניקס", "פניקס"]],
  ["Hilan", "#00568E", null, "Rubik", ["hilan", "חילן"]],
  // IT services and tech recruiting
  ["Matrix", "#763192", null, "Inter", ["matrix", "matrix it", "מטריקס"]],
  ["Malam Team", "#2F4399", null, "Inter", ["malam", "malam team", "מלם", "מלם תים"]],
  ["Ness", "#0C3483", null, "Inter", ["ness", "ness technologies", "נס טכנולוגיות"]],
  ["One Technologies", "#1AF4A5", "#0F0F0F", "Inter", ["one", "one1", "one technologies", "וואן", "וואן טכנולוגיות"]],
  ["Bynet", "#C02D19", null, "Inter", ["bynet", "בינת", "ביינט"]],
  ["Elad Systems", "#009A96", null, "Inter", ["elad", "elad systems", "אלעד", "אלעד מערכות"]],
  ["Sela", "#000000", "#00DBE9", "Inter", ["sela", "sela group", "סלע"]],
  ["Ethosia", "#00B2A9", null, "Inter", ["ethosia", "אתוסיה"]],
  ["Nisha", "#0F40B5", null, "Inter", ["nisha", "nisha group", "נישה"]],
  ["Adam Milo", "#EA6037", null, "Inter", ["adam milo", "אדם מילוא"]],
  ["GotFriends", "#3AE8A1", "#2F333E", "Inter", ["gotfriends", "got friends", "גוט פרנדס"]],
  ["SQLink", "#BD2426", null, "Inter", ["sqlink", "sq link"]],
  ["Experis", "#0050A0", null, "Inter", ["experis", "manpower", "manpowergroup", "אקספריס", "מנפאואר"]]
];
