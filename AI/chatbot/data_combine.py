import json
def concat_json_files(file1, file2, file3, output_file):
    data = []
    
    for file in [file1, file2, file3]:
        with open(file, 'r', encoding='utf-8') as f:
            data.extend(json.load(f))  # Assuming JSON files contain lists
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

# Example usage
concat_json_files('real_state.json', 'registration.json', 'laws.json', 'data.json')
