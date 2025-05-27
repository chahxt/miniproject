# utils/ai_autofix.py
import openai
openai.api_key = "YOUR_OPENAI_API_KEY"

def generate_alt_texts(images):
    prompts = [f"Generate an alt text for this image description: {img}" for img in images]
    responses = []
    for prompt in prompts:
        res = openai.Completion.create(
            engine="gpt-4",
            prompt=prompt,
            max_tokens=50
        )
        responses.append(res.choices[0].text.strip())
    return responses
