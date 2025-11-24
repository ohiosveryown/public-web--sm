# OpenAI Integration Setup

This project now uses OpenAI to provide intelligent suggestions and answers about Square (squareup.com).

## Setup Instructions

### 1. Install Dependencies

```bash
bun install
```

### 2. Get Your OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Generate a new API key

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
# .env
OPENAI_API_KEY=your_actual_api_key_here
```

Replace `your_actual_api_key_here` with your actual OpenAI API key.

### 4. Run the Development Server

```bash
bun run dev
```

## How It Works

### AI-Powered Suggestions
- As users type in the search input (minimum 5 characters), the system calls OpenAI to generate 3 relevant suggestions
- Suggestions are based on Square's product offerings, services, and information from squareup.com
- Debounced to avoid excessive API calls (300ms delay)

### AI-Powered Answers
- When users submit a question (click the arrow or press Cmd+Enter), OpenAI generates a comprehensive answer
- Answers are sourced from knowledge about Square's products, pricing, hardware, and services
- The answer is displayed in the TestWidget component with a nice UI

## API Endpoints

### POST `/api/suggestions`
Generates autocomplete suggestions based on user input.

**Request:**
```json
{
  "query": "How much does"
}
```

**Response:**
```json
{
  "suggestions": [
    {
      "text": "How much does Square cost",
      "avatar": "data:image/svg+xml,..."
    },
    ...
  ]
}
```

### POST `/api/answer`
Generates a detailed answer to the user's question.

**Request:**
```json
{
  "question": "How much does Square cost?"
}
```

**Response:**
```json
{
  "answer": "Square's pricing varies by product...",
  "question": "How much does Square cost?"
}
```

## Cost Optimization

- **Suggestions**: Uses `gpt-4o-mini` (cheaper, faster model)
- **Answers**: Uses `gpt-4o` (more capable for detailed responses)
- Debounced API calls to reduce unnecessary requests
- Configurable minimum character thresholds

## Customization

You can modify the AI behavior by editing:
- `/server/api/suggestions.post.ts` - For suggestion generation
- `/server/api/answer.post.ts` - For answer generation

Update the system prompts to change how the AI responds or to include additional information about Square.

