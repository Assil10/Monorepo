from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
from elevenlabs import play

load_dotenv()

client = ElevenLabs(
    api_key="sk_a61da3363be082c5bbd7ca9945168c6f1e1e863a2980d804"
)

# English text
english_text = "Hello my name is Peter Parker."

# French text
french_text = "Bonjour, je m'appelle Peter Parker."

# Arabic text
arabic_text = "الشمس ساطعة و الجو مشمس , انها فرصة مناسبة للخروج و اصطياد السمك"

# Choose which language to use
text_to_convert = arabic_text  # Change this to test different languages

audio = client.text_to_speech.convert(
    text=text_to_convert,
    voice_id="JBFqnCBsd6RMkjVDRZzb",
    model_id="eleven_multilingual_v2",
    output_format="mp3_44100_128",
)

play(audio)