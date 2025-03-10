from flask import Flask, request, jsonify
import pandas as pd
from utils import get_coordinates, load_model  # ✅ Import shared utilities

# Initialize Flask app
app = Flask(__name__)

# Load pre-trained model
model_pipeline = load_model('model_location')

@app.route('/predict', methods=['POST'])  # ✅ Change GET to POST
def predict():
    required_params = [
        "address", "Habitable", "Pièces", "Salles_de_bains",
        "Chambres", "Garage", "Jardin", "Balcon", "Meublé", "Piscine",
        "Etages", "Type_Other", "Type_Residential"
    ]

    # ✅ Ensure request is JSON
    if request.content_type != 'application/json':
        return jsonify({'error': 'Content-Type must be application/json'}), 415

    # ✅ Extract JSON data instead of using request.args
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No JSON data received'}), 400

    missing = [param for param in required_params if param not in data]
    if missing:
        return jsonify({'error': f'Missing parameters: {", ".join(missing)}'}), 400

    # ✅ Extract address for geocoding
    address = data["address"]
    latitude, longitude = get_coordinates(address, 5)  # Second argument is max attempts
    if latitude is None or longitude is None:
        return jsonify({'error': 'Failed to geocode address'}), 400

    try:
        # ✅ Convert all parameters from JSON
        processed_data = {
            "Habitable": float(data["Habitable"]),
            "Pièces": float(data["Pièces"]),
            "Salles de bains": float(data["Salles_de_bains"]),
            "Chambres": float(data["Chambres"]),
            "Garage": int(data["Garage"]),
            "Jardin": int(data["Jardin"]),
            "Balcon": int(data["Balcon"]),
            "Meublé": int(data["Meublé"]),
            "Piscine": int(data["Piscine"]),
            "Etages": float(data["Etages"]),
            "Latitude": latitude,
            "Longitude": longitude,
            "Type_Other": int(data["Type_Other"]),
            "Type_Residential": int(data["Type_Residential"])
        }
    except ValueError as e:
        return jsonify({'error': f'Invalid parameter type: {str(e)}'}), 400

    columns_order = [
        "Habitable", "Pièces", "Salles de bains", "Chambres",
        "Garage", "Jardin", "Balcon", "Meublé", "Piscine", "Etages",
        "Latitude", "Longitude", "Type_Other", "Type_Residential"
    ]

    input_df = pd.DataFrame([processed_data], columns=columns_order)
    prediction = model_pipeline.predict(input_df)

    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run()
