import OpenAI from 'openai'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { query } = await readBody(event)

  if (!config.openaiApiKey) {
    throw createError({
      statusCode: 500,
      message: 'OpenAI API key is not configured',
    })
  }

  if (!query || query.length < 3) {
    return { suggestions: [] }
  }

  try {
    const openai = new OpenAI({
      apiKey: config.openaiApiKey,
    })

    // Use OpenAI to generate suggestions based on Square's offerings
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant for Square (squareup.com), a payment processing and business management platform. Based on the information from squareup.com, generate 3 relevant search suggestions that complete or expand on the user's query. 

Square offers:
- Payment processing (in-person, online, invoices)
- Hardware (Terminal, Register, Stand, Readers, Kiosk, Handheld)
- Point of Sale systems for restaurants, retail, beauty salons, and services
- Business tools (Appointments, Inventory, Marketing, Loyalty programs)
- Banking services (Checking, Savings, Loans, Credit card)
- Team management (Shifts, Payroll)
- Integration with various apps and services

Return ONLY a JSON array of 3 suggestion objects with "text" field. Keep suggestions concise (under 40 characters). Format: [{"text": "suggestion 1"}, {"text": "suggestion 2"}, {"text": "suggestion 3"}]`,
        },
        {
          role: 'user',
          content: `User is typing: "${query}". Generate 3 relevant suggestions that complete or expand this query.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      return { suggestions: [] }
    }

    // Parse the JSON response
    const suggestions = JSON.parse(content)
    
    // Add default avatars based on index
    const avatars = [
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%234A90E2"/%3E%3Cpath d="M30 50 L45 65 L70 35" stroke="white" stroke-width="8" fill="none" stroke-linecap="round"/%3E%3C/svg%3E',
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23D4A574"/%3E%3Ccircle cx="50" cy="50" r="30" fill="%23C8965A"/%3E%3C/svg%3E',
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%2394C973"/%3E%3Cpath d="M50 30 L50 70 M30 50 L70 50" stroke="white" stroke-width="6" stroke-linecap="round"/%3E%3C/svg%3E',
    ]

    const enrichedSuggestions = suggestions.map((s: any, index: number) => ({
      text: s.text,
      avatar: avatars[index % avatars.length],
    }))

    return { suggestions: enrichedSuggestions }
  } catch (error: any) {
    console.error('OpenAI API error:', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to generate suggestions',
    })
  }
})

