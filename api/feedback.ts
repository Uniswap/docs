const HUBSPOT_PORTAL_ID = '47435488'
const HUBSPOT_FORM_ID = '80c7a6ab-9b96-412f-9469-aa2bc14faa18'
const HUBSPOT_SUBMIT_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
    const { email, feedbackType, issue, followUp, challenges, docsUsefulness, pageUrl, website } = body

    if (website) return res.status(200).json({ success: true }) // honeypot
    if (!email || !isValidEmail(email)) return res.status(400).json({ success: false, error: 'Invalid email' })
    if (!feedbackType || !issue) return res.status(400).json({ success: false, error: 'Missing required fields' })

    const fields = [
      { name: 'email', value: String(email) },
      { name: 'type_of_feedback', value: String(feedbackType) },
      { name: 'whats_the_issue_idea_or_question', value: String(issue) },
      { name: 'can_we_follow_up_with_you_about_your_feedback', value: followUp ? 'Yes' : 'No' },
      ...(challenges?.trim()
        ? [{ name: 'what_has_been_the_most_challenging_part_of_building_on_or_integrating_with_uniswap', value: challenges.trim() }]
        : []),
      ...(docsUsefulness?.trim()
        ? [{ name: 'have_you_found_uniswap_docs_to_be_useful', value: docsUsefulness.trim() }]
        : []),
    ]

    const payload = {
      fields,
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: 'By submitting, I agree to Uniswap Labs Terms of Service and Privacy Policy.',
        },
      },
      context: {
        pageUri: pageUrl || '',
        pageName: 'Feedback | Uniswap Docs',
      },
    }

    const hsRes = await fetch(HUBSPOT_SUBMIT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!hsRes.ok) {
      const hsText = await hsRes.text()
      return res.status(502).json({ success: false, error: 'HubSpot submission failed', details: hsText })
    }

    return res.status(200).json({ success: true })
  } catch {
    return res.status(500).json({ success: false, error: 'Internal server error' })
  }
}