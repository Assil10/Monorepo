import json
from collections import defaultdict

def transform_json(input_file, output_file):
    # Load the original JSON data
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Group entries by question
    question_map = defaultdict(list)
    for entry in data:
        question_map[entry['question']].append(entry)
    
    # Create new consolidated structure
    new_data = []
    for question, entries in question_map.items():
        # Start with base fields from first entry
        consolidated = {
            'section': entries[0]['section'],
            'question': question,
            'answer': ""
        }
        
        # Build formatted answer string
        answer_parts = []
        for entry in entries:
            subtopic = entry['subtopic']
            content = entry['answer']
            
            if isinstance(content, list):
                content = "\n".join(f"- {item}" for item in content)
            else:
                content = f"- {content}"
            
            answer_parts.append(f"{subtopic}:\n{content}")
        
        consolidated['answer'] = "\n\n".join(answer_parts)
        new_data.append(consolidated)
    
    # Save transformed data
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(new_data, f, ensure_ascii=False, indent=2)

# Usage example:
transform_json('data_en.json', 'consolidated_data.json')