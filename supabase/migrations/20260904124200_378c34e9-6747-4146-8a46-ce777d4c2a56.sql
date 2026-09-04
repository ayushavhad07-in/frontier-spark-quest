CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

CREATE TABLE public.bounties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  territory text NOT NULL,
  difficulty text NOT NULL DEFAULT 'Ranger',
  status text NOT NULL DEFAULT 'Open',
  organization text NOT NULL,
  deadline date,
  reward text NOT NULL,
  image text,
  requirements text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.bounties TO anon;
GRANT SELECT ON public.bounties TO authenticated;
GRANT ALL ON public.bounties TO service_role;
ALTER TABLE public.bounties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Bounties are publicly readable" ON public.bounties FOR SELECT TO anon, authenticated USING (true);
CREATE TRIGGER update_bounties_updated_at BEFORE UPDATE ON public.bounties
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  preferred_date date,
  guests integer NOT NULL DEFAULT 1,
  experience text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.registrations TO service_role;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_registrations_updated_at BEFORE UPDATE ON public.registrations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

INSERT INTO public.bounties (title, description, category, territory, difficulty, status, organization, deadline, reward, requirements) VALUES
('Wanted: Solution Required', 'Fraud slips through the wire before the ledger ever settles.', 'Risk', 'Fintech', 'Outlaw', 'Open', 'Redstone Payments', '2026-03-14', '₹40,000', ARRAY['Real-time scoring under 200ms','Explainable risk flags','Demo on synthetic transaction data']),
('Wanted: Solution Required', 'Rural clinics lose patient history between every visit.', 'Data', 'Healthcare', 'Ranger', 'Open', 'Prairie Health Trust', '2026-03-14', '₹35,000', ARRAY['Offline-first record capture','Works on low-end Android','Consent-aware data sharing']),
('Wanted: Solution Required', 'Last-mile routes buckle the moment the weather turns.', 'Optimisation', 'Logistics', 'Ranger', 'Open', 'Ironrail Freight', '2026-03-14', '₹30,000', ARRAY['Dynamic re-routing','Weather feed integration','Driver-facing mobile view']),
('Wanted: Solution Required', 'Micro-grids waste stored power with no demand forecast.', 'Forecasting', 'Energy', 'Outlaw', 'Claimed', 'Dust Bowl Energy', '2026-03-14', '₹45,000', ARRAY['24-hour demand forecast','Battery dispatch schedule','Operator dashboard']),
('Wanted: Solution Required', 'Crop disease is spotted a fortnight too late.', 'Vision', 'Agritech', 'Greenhorn', 'Open', 'Homestead Agro', '2026-03-14', '₹25,000', ARRAY['Leaf image classification','Field-level heatmap','Simple farmer alerting']),
('Wanted: Solution Required', 'Shelf stock counts drift from the system within hours.', 'Operations', 'Retail', 'Greenhorn', 'Open', 'Silver Spur Retail', '2026-03-14', '₹25,000', ARRAY['Shelf audit workflow','Discrepancy reporting','Store manager summary']),
('Wanted: Solution Required', 'Fleet drivers get no warning before a breakdown.', 'Predictive', 'Mobility', 'Ranger', 'Open', 'Colter Fleetworks', '2026-03-14', '₹32,000', ARRAY['Telemetry ingestion','Failure risk scoring','Maintenance scheduling view']),
('Wanted: Solution Required', 'Learners drop off and nobody notices for weeks.', 'Engagement', 'Edtech', 'Greenhorn', 'Claimed', 'Schoolhouse Frontier', '2026-03-14', '₹22,000', ARRAY['Dropout risk signals','Mentor nudge workflow','Cohort analytics']),
('Wanted: Solution Required', 'Claim documents take five humans to read.', 'Automation', 'Insurance', 'Ranger', 'Open', 'Stagecoach Assurance', '2026-03-14', '₹34,000', ARRAY['Document extraction','Confidence scoring','Human review queue']),
('Wanted: Solution Required', 'Emission reporting relies on spreadsheets and guesswork.', 'Analytics', 'Climate', 'Outlaw', 'Open', 'Big Sky Climate', '2026-03-14', '₹42,000', ARRAY['Automated emission factors','Audit trail','Exportable report']);