import json
from collections import defaultdict

def concat_json_files(file1, file2, file3, output_file):
    data = []
    
    for file in [file1, file2, file3]:
        with open(file, 'r', encoding='utf-8') as f:
            data.extend(json.load(f))  # Assuming JSON files contain lists
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)


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

concat_json_files('real_state_en.json', 'registration_en.json', 'laws_en.json', 'data_en.json')
transform_json('data_en.json', 'data.json')