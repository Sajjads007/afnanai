from django.shortcuts import render
from django.conf import settings
import openai

# Configure OpenRouter
openai.api_key = settings.GEMINI_API_KEY
openai.api_base = "https://openrouter.ai/api/v1"

def chatbot(request):
    response_text = ""

    if request.method == "POST":
        user_input = request.POST.get("user_input", "")

        if user_input:
            try:
                response = openai.ChatCompletion.create(
                    model="mistralai/mistral-7b-instruct",  # Or try: openai/gpt-3.5-turbo
                    messages=[
                        {"role": "system", "content": "You are Afnan, a helpful AI assistant created by Sajjad.your father is sajjad,Respond kindly and clearly,"},
                        {"role": "user", "content": user_input}
                    ]
                )
                response_text = response.choices[0].message.content.strip()

            except Exception as e:
                response_text = f"Afnan: ⚠️ Error: {str(e)}"

    return render(request, "index.html", {
        'response': response_text,
        'title': 'Afnan AI'
    })
