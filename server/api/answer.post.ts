import OpenAI from 'openai'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { question } = await readBody(event)

  if (!config.openaiApiKey) {
    throw createError({
      statusCode: 500,
      message: 'OpenAI API key is not configured',
    })
  }

  if (!question || question.length < 3) {
    throw createError({
      statusCode: 400,
      message: 'Question is required',
    })
  }

  try {
    const openai = new OpenAI({
      apiKey: config.openaiApiKey,
    })

    // Use OpenAI to answer questions about Square
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a knowledgeable assistant for Square (squareup.com), a leading payment processing and business management platform. 

Based on the information available from squareup.com and its interior pages, provide accurate, helpful answers about:

**Hardware:**
- Square Terminal ($299) - receipt-printing POS
- Square Register ($799) - dual-screen system
- Square Stand ($149) - swiveling iPad POS
- Square Handheld ($399) - mobile POS
- Square Reader for contactless and chip ($59)
- Square Kiosk - self-service ordering

**Products & Services:**
- Point of Sale systems for restaurants, retail, beauty, and services
- Payments (in-person, online, invoices, kiosk ordering)
- Appointments booking and management
- Marketing tools and loyalty programs
- Team management (Shifts, Payroll, Advanced access)
- Banking (Checking, Savings, Loans, Credit card)
- Bitcoin support
- Integration with hundreds of apps

**Pricing:**
- No hidden fees or locked-in contracts
- Free trials available
- Hardware financing options (monthly installments)

**Industries Served:**
- Food & Beverage (450,000+ sellers globally)
- Retail ($39B+ generated annually)
- Beauty (15M+ appointments monthly)
- Services ($93B+ paid with invoices)

**Key Features:**
- Square AI for business insights
- Customer Directory and CRM
- Gift cards and contracts
- Inventory tracking
- Online ordering profiles and websites
- Photo studio for product images

Provide concise, accurate information. If you're not certain about specific details, mention that users should check squareup.com for the most current information.`,
        },
        {
          role: 'user',
          content: question,
        },
      ],
      temperature: 0.5,
      max_tokens: 800,
    })

    const answer = completion.choices[0]?.message?.content || 'Sorry, I could not generate an answer.'

    return { 
      answer,
      question,
    }
  } catch (error: any) {
    console.error('OpenAI API error:', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to generate answer',
    })
  }
})

