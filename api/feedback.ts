const HUBSPOT_PORTAL_ID = '47435488'
const HUBSPOT_FORM_ID = '80c7a6ab-9b96-412f-9469-aa2bc14faa18'
const HUBSPOT_SUBMIT_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`

const FEEDBACK_TYPES = new Set(['Bug', 'Feature request', 'Question', 'Other'])
const MAX_EMAIL_LENGTH = 254
const MAX_ISSUE_LENGTH = 2000
const MAX_CHALLENGES_LENGTH = 1000
const MAX_DOCS_USEFULNESS_LENGTH = 1000
const MAX_PAGE_URL_LENGTH = 2048

const DISALLOWED_CHARS_REGEX = /[<>&"']/g

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return ''
  return value.replace(DISALLOWED_CHARS_REGEX, '').trim().slice(0, maxLength)
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}

    const website = sanitizeText(body.website, 200)
    if (website) return res.status(200).json({ success: true }) // honeypot

    const email = sanitizeText(body.email, MAX_EMAIL_LENGTH)
    const feedbackType = sanitizeText(body.feedbackType, 50)
    const issue = sanitizeText(body.issue, MAX_ISSUE_LENGTH)
    const challenges = sanitizeText(body.challenges, MAX_CHALLENGES_LENGTH)
    const docsUsefulness = sanitizeText(body.docsUsefulness, MAX_DOCS_USEFULNESS_LENGTH)
    const pageUrl = sanitizeText(body.pageUrl, MAX_PAGE_URL_LENGTH)
    const followUp = body.followUp


    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email' })
    }

    if (!FEEDBACK_TYPES.has(feedbackType)) {
      return res.status(400).json({ success: false, error: 'Invalid feedback type' })
    }

    if (!issue) {
      return res.status(400).json({ success: false, error: 'Missing required fields' })
    }

    if (typeof followUp !== 'boolean') {
      return res.status(400).json({ success: false, error: 'Invalid follow-up value' })
    }

    const fields = [
      { name: 'email', value: email },
      { name: 'type_of_feedback', value: feedbackType },
      { name: 'whats_the_issue_idea_or_question', value: issue },
      { name: 'can_we_follow_up_with_you_about_your_feedback', value: followUp ? 'Yes' : 'No' },
      ...(challenges ? [{ name: 'what_has_been_the_most_challenging_part_of_building_on_or_integrating_with_uniswap', value: challenges }] : []),
      ...(docsUsefulness ? [{ name: 'have_you_found_uniswap_docs_to_be_useful', value: docsUsefulness }] : []),
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